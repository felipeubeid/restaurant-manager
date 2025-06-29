from flask import Blueprint, jsonify
from models.inventory_models import InventoryItem
from models.staff_models import StaffMember
from models.finances_models import Transaction
from models.orders_models import Order
from datetime import datetime, date, timedelta
from db import db

home_bp = Blueprint('home', __name__)

def get_amount_on_date(target_date, is_income):
    # Sum all amounts matching the filters (same date, has is_income)
    # scalar returns the single value result instead of a tuple or list
    total = db.session.query(
        db.func.sum(Transaction.amount)
    ).filter(
        Transaction.date == target_date.isoformat(),
        Transaction.category.has(is_income=is_income)
    ).scalar()
    
    # If total is none, return 0
    return total or 0


def get_orders_on_date(target_date):
    total = Order.query.filter(Order.date == target_date.isoformat()).count()
    return total or 0

def get_percent_change(today_val, yesterday_val):
    if yesterday_val == 0:
        return 0.0
    return round(((today_val - yesterday_val) / yesterday_val) * 100, 2)

@home_bp.route('/stats/inventory', methods=['GET'])
def get_inventory_stats():
    total_items = InventoryItem.query.count()
    low_stock_items = InventoryItem.query.filter(InventoryItem.in_stock == False).count()
    
    return jsonify({
        "totalInventoryItems": total_items,
        "lowStockItems": low_stock_items,
    })

@home_bp.route('/stats/staff', methods=['GET'])
def get_staff_stats():
    all_staff = StaffMember.query.all()

    weekday_map = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    today = weekday_map[datetime.now().weekday()]
    
    active_staff = [
        staff for staff in all_staff 
        if today in [day.day for day in staff.days]
    ]
    
    staff_list = []
    for staff in active_staff:
        hours = f"{staff.shift_start}-{staff.shift_end}"  # e.g. "10:00-18:00"
        staff_list.append({
            "name": staff.name,
            "role": staff.role,
            "hours": hours
        })

    return jsonify({
        "todaysStaff": staff_list
    })
    
@home_bp.route('/stats/finances', methods=['GET'])
def get_finances_stats():
    today = date.today()
    yesterday = today - timedelta(days=1) # Subtract one day to get yesterday
    
    revenue_today = get_amount_on_date(today, True)
    revenue_yesterday = get_amount_on_date(yesterday, True)
    
    expenses_today = get_amount_on_date(today, False)
    expenses_yesterday = get_amount_on_date(yesterday, False)
    
    return jsonify({
        "revenueToday": revenue_today,
        "revenuePercentChange": get_percent_change(revenue_today, revenue_yesterday),
        "expensesToday": expenses_today,
        "expensesPercentChange": get_percent_change(expenses_today, expenses_yesterday),
    })

@home_bp.route('/stats/orders', methods=['GET'])
def get_orders_stats():
    today = date.today()
    yesterday = today - timedelta(days=1)

    orders_today = get_orders_on_date(today)
    orders_yesterday = get_orders_on_date(yesterday)
    
    return jsonify({
        "ordersToday": orders_today,
        "ordersPercentChange": get_percent_change(orders_today, orders_yesterday),
    }) 