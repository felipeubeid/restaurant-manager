from flask import Blueprint, request, jsonify
from models.inventory_models import InventoryItem
from db import db
from datetime import datetime, timezone
from models.finances_models import Transaction

inventory_bp = Blueprint('inventory', __name__) # Blueprint for inventory management routes

def is_valid_name(name):
    return isinstance(name, str) and len(name.strip()) > 0

def is_valid_quantity(q):
    return isinstance(q, (int, float)) and q >= 0

def is_valid_unit(unit):
    return isinstance(unit, str) and len(unit.strip()) > 0

def is_valid_cost(cost):
    return isinstance(cost, (int, float)) and cost >= 0

@inventory_bp.route('/inventory', methods=['GET'])
def get_inventory():
    items = InventoryItem.query.all()
    return jsonify({
        "inventory": [item.to_dict() for item in items],
        "totalItems": len(items),
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    })

@inventory_bp.route('/inventory', methods=['POST'])
def add_inventory_item():
    data = request.get_json()

    required_fields = ["name", "quantity", "unit", "costPerUnit", "minQuantity"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
    
    if not is_valid_name(data["name"]):
        return jsonify({"error": "Invalid name"}), 400
    if not is_valid_quantity(data["quantity"]):
        return jsonify({"error": "Quantity must be a non-negative number"}), 400
    if not is_valid_unit(data["unit"]):
        return jsonify({"error": "Invalid unit"}), 400
    if not is_valid_cost(data["costPerUnit"]):
        return jsonify({"error": "costPerUnit must be a non-negative number"}), 400
    if not is_valid_quantity(data["minQuantity"]):
        return jsonify({"error": "minQuantity must be a non-negative number"}), 400

    quantity = data["quantity"]
    cost_per_unit = data["costPerUnit"]
    min_quantity = data["minQuantity"]

    total_cost = round(quantity * cost_per_unit, 2)
    in_stock = quantity >= min_quantity

    new_item = InventoryItem(
        name=data["name"].strip(),
        quantity=quantity,
        unit=data["unit"].strip(),
        cost_per_unit=cost_per_unit,
        total_cost=total_cost,
        min_quantity=min_quantity,
        in_stock=in_stock
    )
    
    try:
        db.session.add(new_item)
        db.session.commit()
        # Record in finances
        transaction = Transaction(
            date=datetime.now(timezone.utc).date(),
            amount=total_cost,
            description=f"{new_item.name}",
            category_id=1,  # Inventory
            is_income=False,
            manual_entry=False
        )
        db.session.add(transaction)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify(new_item.to_dict()), 201

# Update existing inventory item
@inventory_bp.route('/inventory/<int:item_id>', methods=['PATCH'])
def update_inventory_item(item_id):
    item = InventoryItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    data = request.get_json()
    cost_changed = False
    
    if "name" in data:
        if not is_valid_name(data["name"]):
            return jsonify({"error": "Invalid name"}), 400
        item.name = data["name"].strip()

    if "quantity" in data:
        if not is_valid_quantity(data["quantity"]):
            return jsonify({"error": "Quantity must be a non-negative number"}), 400
        item.quantity = data["quantity"]
        cost_changed = True

    if "unit" in data:
        if not is_valid_unit(data["unit"]):
            return jsonify({"error": "Invalid unit"}), 400
        item.unit = data["unit"].strip()

    if "costPerUnit" in data:
        if not is_valid_cost(data["costPerUnit"]):
            return jsonify({"error": "costPerUnit must be a non-negative number"}), 400
        item.cost_per_unit = data["costPerUnit"]
        cost_changed = True

    if "minQuantity" in data:
        if not is_valid_quantity(data["minQuantity"]):
            return jsonify({"error": "minQuantity must be a non-negative number"}), 400
        item.min_quantity = data["minQuantity"]

    # Recalculate
    item.total_cost = round(item.quantity * item.cost_per_unit, 2)
    item.in_stock = item.quantity >= item.min_quantity

    try:
        db.session.commit()
        if cost_changed:
            transaction = Transaction.query.filter_by(
                description=f"{item.name}", 
                manual_entry=False, category_id=1).first()
            if transaction:
                # Update existing transaction
                transaction.amount = item.total_cost
                transaction.date = datetime.now(timezone.utc).date()
            else:
                transaction = Transaction(
                    date=datetime.now(timezone.utc).date(),
                    amount=item.total_cost,
                    description=f"{item.name}",
                    category_id=1,  # Inventory
                    is_income=False,
                    manual_entry=False
                )
                db.session.add(transaction)
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
        transaction = Transaction.query.filter_by(
                description=f"{item.name}", 
                manual_entry=False, category_id=1).first()
        if transaction:
            db.session.delete(transaction)
        db.session.delete(item)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Inventory item deleted successfully"}), 200
