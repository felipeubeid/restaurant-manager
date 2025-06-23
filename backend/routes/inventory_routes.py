from flask import Blueprint, request, jsonify
from models.inventory_models import InventoryItem
from db import db

inventory_bp = Blueprint('inventory', __name__) # Blueprint for inventory management routes

@inventory_bp.route('/inventory', methods=['GET'])
def get_inventory():
    items = InventoryItem.query.all()
    return jsonify({
        "inventory": [item.to_dict() for item in items],
        "totalItems": len(items),
        "lastUpdated": "2025-06-22T12:00:00Z"
    })

@inventory_bp.route('/inventory', methods=['POST'])
def add_inventory_item():
    data = request.get_json()

    required_fields = ["name", "quantity", "unit", "costPerUnit", "minQuantity"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    quantity = data["quantity"]
    cost_per_unit = data["costPerUnit"]
    min_quantity = data["minQuantity"]

    total_cost = round(quantity * cost_per_unit, 2)
    in_stock = quantity >= min_quantity

    new_item = InventoryItem(
        name=data["name"],
        quantity=quantity,
        unit=data["unit"],
        cost_per_unit=cost_per_unit,
        total_cost=total_cost,
        min_quantity=min_quantity,
        in_stock=in_stock
    )
    try:
        db.session.add(new_item)
        db.session.commit()
    except Exception as e:
        db.session.rollback() # Rollback in case of error
        return jsonify({"error": str(e)}), 500

    return jsonify(new_item.to_dict()), 201

# Update an existing inventory item
@inventory_bp.route('/inventory/<int:item_id>', methods=['PATCH'])
def update_inventory_item(item_id):
    item = InventoryItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    data = request.get_json()

    item.name = data.get("name", item.name)
    item.quantity = data.get("quantity", item.quantity)
    item.unit = data.get("unit", item.unit)
    item.cost_per_unit = data.get("costPerUnit", item.cost_per_unit)
    item.min_quantity = data.get("minQuantity", item.min_quantity)

    # Recalculate
    item.total_cost = round(item.quantity * item.cost_per_unit, 2)
    item.in_stock = item.quantity >= item.min_quantity

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify(item.to_dict()), 200

@inventory_bp.route('/inventory/<int:item_id>', methods=['DELETE'])
def delete_inventory_item(item_id):
    item = InventoryItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    try:
        db.session.delete(item)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Item deleted"}), 200
