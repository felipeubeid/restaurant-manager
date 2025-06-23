from flask import Blueprint, jsonify
from backend import InventoryItem

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
