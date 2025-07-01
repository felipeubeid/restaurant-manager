from models.orders_models import Order, OrderItem
from flask import Blueprint, jsonify, request
from db import db
from datetime import datetime, timezone
from models.finances_models import Transaction
from models.menu_models import MenuItem

orders_bp = Blueprint('orders', __name__)  # Blueprint for order management routes

def is_valid_order_number(order_number):
    return isinstance(order_number, int) and order_number > 0

def is_valid_completed(completed):
    return isinstance(completed, bool)

def is_valid_date(date):
    try:
        datetime.strptime(date, "%Y-%m-%d")  # Check if date is in YYYY-MM-DD format
        return True
    except ValueError:
        return False

def is_valid_is_takeout(is_takeout):
    return isinstance(is_takeout, bool)

def is_valid_server(server):
    return isinstance(server, str) and len(server.strip()) > 0

def is_valid_name(name):
    return isinstance(name, str) and len(name.strip()) > 0

def is_valid_quantity(quantity):
    return isinstance(quantity, int) and quantity > 0

def is_valid_price(price):
    return isinstance(price, (int, float)) and price >= 0

def is_valid_items(items):
    if not isinstance(items, list) or len(items) == 0:
        return False
    for item in items:
        if not isinstance(item, dict):
            return False
        if not all(k in item for k in ("id", "name", "quantity", "price")):
            return False
        if not is_valid_name(item["name"]):
            return False
        if not is_valid_quantity(item["quantity"]):
            return False
        if not is_valid_price(item["price"]):
            return False

        menu_item = MenuItem.query.get(item["id"])
        if menu_item:
            if menu_item.name.strip() != item["name"].strip():
                return False
    return True

def get_next_order_number():
    # Get used numbers to avoid duplicates and find the next available order number
    used_numbers = {order.order_number for order in Order.query.with_entities(Order.order_number).all()}

    # Find the next available order number
    next_order_number = 1
    while next_order_number in used_numbers:
        next_order_number += 1
    return next_order_number

def update_order_items(order, new_items_data):
    # Existing items in the order
    existing_items = {item.name.strip(): item for item in order.items}

    for item_data in new_items_data:
        name = item_data["name"].strip()
        quantity = item_data["quantity"]
        price = item_data["price"]

        # If the item already exists in the order, update 
        if name in existing_items:
            existing_item = existing_items[name]
            existing_item.quantity += quantity 
            existing_item.price = price 
            # Remove from order if quantity is zero or negative
            if existing_item.quantity <= 0:
                db.session.delete(existing_item)
        # Add to order if it doesn't exist on it already
        else:
            if quantity > 0:
                new_item = OrderItem(name=name, quantity=quantity, price=price)
                order.items.append(new_item)

    # Recalculate total
    order.total = round(sum(item.quantity * item.price for item in order.items), 2)

def calculate_costs(items):
    total_cost = 0.0
    for item in items:
        menu_item = MenuItem.query.get(item["id"])
        if menu_item:
            total_cost += menu_item.cost * item["quantity"]
    return round(total_cost, 2)


@orders_bp.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify({
        "orders": [order.to_dict() for order in orders],
        "totalOrders": len(orders),
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    })
    
@orders_bp.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    required_fields = ["isTakeout", "date", "server", "items"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
    
    if not is_valid_is_takeout(data["isTakeout"]):
        return jsonify({"error": "Invalid isTakeout"}), 400
    if not is_valid_date(data["date"]):
        return jsonify({"error": "Invalid date"}), 400
    if not is_valid_server(data["server"]):
        return jsonify({"error": "Invalid server"}), 400
    if not is_valid_items(data["items"]):
        return jsonify({"error": "Invalid items"}), 400
    
    order_number = get_next_order_number()
    
    order_items = [
        OrderItem(name=item["name"].strip(), quantity=item["quantity"], price=item["price"])
        for item in data["items"]
    ]
    
    total = round(sum(item["quantity"] * item["price"] for item in data["items"]), 2)
    
    new_order = Order(
        order_number=order_number,
        total=total,
        completed=True,
        date=data["date"],
        is_takeout=data["isTakeout"],
        server=data["server"].strip(),
        items=order_items
    )
    
    try:
        db.session.add(new_order)
        db.session.commit()
        # Record in finances
        transaction_income = Transaction(
            date=datetime.now(timezone.utc).date(),
            amount=total,
            description=f"Order #{new_order.order_number} Sale",
            category_id=6,  # Sale
            is_income=True,
            manual_entry=False
        )
        db.session.add(transaction_income)
        
        total_cost = calculate_costs(data["items"])
        transaction_expense = Transaction(
            date=datetime.now(timezone.utc).date(),
            amount=total_cost,
            description=f"Order #{new_order.order_number} Production Cost",
            category_id=4, # Production
            is_income=False,
            manual_entry=False
        )
        db.session.add(transaction_expense)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    return jsonify(new_order.to_dict()), 201

@orders_bp.route('/orders/<int:order_id>', methods=['PATCH'])
def update_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    
    data = request.get_json()
    total_changed = False
    cost_changed = False
    
    if "isTakeout" in data:
        if not is_valid_is_takeout(data["isTakeout"]):
            return jsonify({"error": "Invalid isTakeout"}), 400
        order.is_takeout = data["isTakeout"]

    if "date" in data:
        if not is_valid_date(data["date"]):
            return jsonify({"error": "Invalid date"}), 400
        order.date = data["date"]

    if "server" in data:
        if not is_valid_server(data["server"]):
            return jsonify({"error": "Invalid server"}), 400
        order.server = data["server"].strip()

    if "completed" in data:
        if not is_valid_completed(data["completed"]):
            return jsonify({"error": "Invalid completed flag"}), 400
        order.completed = data["completed"]

    if "items" in data:
        if not is_valid_items(data["items"]):
            return jsonify({"error": "Invalid items"}), 400
        update_order_items(order, data["items"])
        total_changed = True
        cost_changed = True
    
    if "orderNumber" in data:
        if not is_valid_order_number(data["orderNumber"]):
            return jsonify({"error": "Invalid order number"}), 400
        # Check if another order already has this number
        existing = Order.query.filter_by(order_number=data["orderNumber"]).first()
        if existing and existing.id != order.id:
            return jsonify({"error": "Order number already in use"}), 400
        order.order_number = data["orderNumber"]

    try:
        db.session.commit()
        transaction_income = Transaction.query.filter_by(
            description=f"Order #{order.order_number} Sale", 
            manual_entry=False, category_id=6, is_income=True).first()
        transaction_expense = Transaction.query.filter_by(
            description=f"Order #{order.order_number} Production Cost", 
            manual_entry=False, category_id=4, is_income=False).first()
        
        if not order.completed:
            # Delete transaction if exists and order not completed
            if transaction_income:
                db.session.delete(transaction_income)
            if transaction_expense:
                db.session.delete(transaction_expense)
            db.session.commit()
        else:
            if total_changed:
                if transaction_income:
                    transaction_income.amount = order.total
                    transaction_income.date = datetime.now(timezone.utc).date()
                else:
                    transaction_income = Transaction(
                        date=datetime.now(timezone.utc).date(),
                        amount=order.total,
                        description=f"Order #{order.order_number} Sale",
                        category_id=6,
                        is_income=True,
                        manual_entry=False
                    )
                    db.session.add(transaction_income)
            if cost_changed:
                total_cost = calculate_costs(data["items"])
                
                if transaction_expense:
                    transaction_expense.amount = total_cost
                    transaction_expense.date = datetime.now(timezone.utc).date()
                else:
                    transaction_expense = Transaction(
                        date=datetime.now(timezone.utc).date(),
                        amount=total_cost,
                        description=f"Order #{order.order_number} Production Cost",
                        category_id=4,
                        is_income=False,
                        manual_entry=False
                    )
                    db.session.add(transaction_expense)
                db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify(order.to_dict()), 200

@orders_bp.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    
    try:
        transaction = Transaction.query.filter_by(
            description=f"Order #{order.order_number}", 
            manual_entry=False, category_id=6).first()
        if transaction:
            db.session.delete(transaction)
        db.session.delete(order)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"message": "Order deleted successfully"}), 200