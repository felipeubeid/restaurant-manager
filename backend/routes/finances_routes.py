from flask import Blueprint, request, jsonify
from models.finances_models import TransactionCategory, Transaction, ExpenseByCategory, RevenueByCategory
from db import db
from datetime import datetime, timezone

finances_bp = Blueprint('finances', __name__)

def is_valid_is_income(is_income):
    return isinstance(is_income, bool)

def is_valid_amount(amount):
    return isinstance(amount, (int, float)) and amount >= 0

def is_valid_description(description):
    return isinstance(description, str) and len(description.strip()) >= 0

def is_valid_date(date):
    try:
        datetime.strptime(date, "%Y-%m-%d")  # Check if date is in YYYY-MM-DD format
        return True
    except ValueError:
        return False

def recalculate_summaries():
    # Get expenses by category
    expenses = (
        # Select category name and sum all expenses in that category
        # Join with transaction table, transaction category_id matches category id
        # Only include transactions where is_income is false
        # Group the results by category name
        db.session.query(TransactionCategory.name, db.func.sum(Transaction.amount))
        .join(Transaction, Transaction.category_id == TransactionCategory.id)
        .filter(TransactionCategory.is_income == False)
        .group_by(TransactionCategory.name)
        .all()
    )
    # Clear old expense totals and insert new
    ExpenseByCategory.query.delete()
    for cat_name, total_amount in expenses:
        db.session.add(ExpenseByCategory(category=cat_name, amount=total_amount))
    
    # Get revenue by category
    revenue = (
        # Select category name and sum all revenue in that category
        # Join with transaction table, transaction category_id matches category id
        # Only include transactions where is_income is true
        # Group the results by category name
        db.session.query(TransactionCategory.name, db.func.sum(Transaction.amount))
        .join(Transaction, Transaction.category_id == TransactionCategory.id)
        .filter(TransactionCategory.is_income == True)
        .group_by(TransactionCategory.name)
        .all()
    )
    
    # Clear old revenue totals and insert new
    RevenueByCategory.query.delete()
    for cat_name, total_amount in revenue:
        db.session.add(RevenueByCategory(category=cat_name, amount=total_amount))
    
    db.session.commit()

def reorder_categories(items):
    # Sort so that "Other" comes last
    return sorted(items, key=lambda x: (x.category in ("Other", "Others"), x.category))
    
@finances_bp.route('/finances/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.order_by(Transaction.id.desc()).all()
    return jsonify({
        "transactions": [transaction.to_dict() for transaction in transactions],
        "totalTransactions": len(transactions),
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    })
  
@finances_bp.route('/finances/expense-by-category', methods=['GET'])
def get_expenses_by_category():
    expenses = ExpenseByCategory.query.all()
    expenses_sorted = reorder_categories(expenses)
    return jsonify({
        "expenses": [expense.to_dict() for expense in expenses_sorted],
        "totalCategories": len(expenses),
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    })

@finances_bp.route('/finances/revenue-by-category', methods=['GET'])
def get_revenue_by_category():
    revenues = RevenueByCategory.query.all()
    revenues_sorted = reorder_categories(revenues)
    return jsonify({
        "revenue": [revenue.to_dict() for revenue in revenues_sorted],
        "totalCategories": len(revenues),
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    })

from datetime import datetime, timedelta

@finances_bp.route('/finances/summary', methods=['GET'])
def get_finances_summary():
    today = datetime.now(timezone.utc).date()
    start_of_week = today - timedelta(days=today.weekday()) # Start of the week (Monday)
    end_of_week = start_of_week + timedelta(days=6) # End of week (Sunday)

    # Convert to string
    start_str = start_of_week.isoformat()
    end_str = end_of_week.isoformat()

    # Filter transactions by date between start and end of week
    total_revenue = db.session.query(db.func.sum(Transaction.amount)).filter(
        Transaction.is_income == True).filter(
        Transaction.date >= start_str).filter(
        Transaction.date <= end_str).scalar() or 0.0

    total_expenses = db.session.query(db.func.sum(Transaction.amount)).filter(
        Transaction.is_income == False).filter(
        Transaction.date >= start_str).filter(
        Transaction.date <= end_str).scalar() or 0.0

    net_profit = total_revenue - total_expenses
    profit_margin = net_profit / total_revenue if total_revenue > 0 else 0.0

    return jsonify({
        "totalRevenue": total_revenue,
        "totalExpenses": total_expenses,
        "netProfit": net_profit,
        "profitMargin": profit_margin,
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    })


@finances_bp.route('/finances/categories', methods=['GET'])
def get_transaction_categories():
    income_categories = TransactionCategory.query.filter_by(is_income=True).all()
    expense_categories = TransactionCategory.query.filter_by(is_income=False).all()
    return jsonify({
        "incomeCategories": [{"id": c.id, "name": c.name} for c in income_categories],
        "expenseCategories": [{"id": c.id, "name": c.name} for c in expense_categories],
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    })
    
@finances_bp.route('/finances/transactions', methods=['POST'])
def add_transaction():
    data = request.get_json()
        
    required_fields = ["date", "amount", "category_id"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    if not is_valid_date(data["date"]):
        return jsonify({"error": "Invalid date"}), 400
    if not is_valid_amount(data["amount"]):
        return jsonify({"error": "Invalid amount"}), 400

    category = TransactionCategory.query.get(data["category_id"])
    if not category:
        return jsonify({"error": "Category not found"}), 404
    
    is_income = category.is_income
    
    # Check if description is valid
    description = data.get("description", "")
    if not isinstance(description, str):
        return jsonify({"error": "Invalid description"}), 400
    
    new_transaction = Transaction(
        category_id=data['category_id'],
        is_income=is_income,
        amount=data['amount'],
        description=description.strip() if description else "",
        date=data['date'],
        manual_entry=data.get('manualEntry', True)
    )
    
    try:
        db.session.add(new_transaction)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    recalculate_summaries()
    
    return jsonify(new_transaction.to_dict()), 201

@finances_bp.route('/finances/transactions/<int:transaction_id>', methods=['PATCH'])
def update_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404
    
    data = request.get_json()
    
    if "category_id" in data:
        category = TransactionCategory.query.get(data["category_id"])
        if not category:
            return jsonify({"error": "Category not found"}), 404
        transaction.category_id = category.id
        transaction.is_income = category.is_income
    
    if "amount" in data:
        if not is_valid_amount(data["amount"]):
            return jsonify({"error": "Invalid amount"}), 400
        transaction.amount = data["amount"]
        
    if "description" in data:
        if not is_valid_description(data["description"]):
            return jsonify({"error": "Invalid description"}), 400
        transaction.description = data["description"].strip()
    
    if "date" in data:
        if not is_valid_date(data["date"]):
            return jsonify({"error": "Invalid date"}), 400
        transaction.date = data["date"]
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    recalculate_summaries()
    
    return jsonify(transaction.to_dict()), 200
    
@finances_bp.route('/finances/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404
    
    try:
        db.session.delete(transaction)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    recalculate_summaries()
    
    return jsonify({"message": "Transaction deleted successfully"}), 200