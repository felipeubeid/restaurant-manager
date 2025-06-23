from flask import Blueprint, jsonify
from models.inventory_models import InventoryItem
from models.staff_models import StaffMember

home_bp = Blueprint('home', __name__)

@home_bp.route('/stats/inventory', methods=['GET'])
def get_inventory_stats():
    total_items = InventoryItem.query.count()
    low_stock_items = InventoryItem.query.filter(InventoryItem.in_stock == False).count()
    
    return jsonify({
        "totalInventoryItems": total_items,
        "lowStockItems": low_stock_items,
        # add other stats
    })

@home_bp.route('/stats/staff', methods=['GET'])
def get_staff_stats():
    active_staff = StaffMember.query.filter(StaffMember.is_active == True).count()
    
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