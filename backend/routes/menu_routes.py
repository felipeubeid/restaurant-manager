from flask import Blueprint, request, jsonify
from models.menu_models import MenuCategory, MenuItem
from db import db
from datetime import datetime, timezone

menu_bp = Blueprint('menu', __name__)  # Blueprint for menu management routes

def is_valid_name(name):
    return isinstance(name, str) and len(name.strip()) > 0

def is_valid_description(description):
    return isinstance(description, str) and len(description.strip()) >= 0

def is_valid_cost(cost):
    return isinstance(cost, (int, float)) and cost >= 0 

def is_valid_price(price):
    return isinstance(price, (int, float)) and price >= 0

def is_valid_available(available):
    return isinstance(available, bool)

@menu_bp.route('/menu', methods=['GET'])
def get_menu_categories():
    categories = MenuCategory.query.all()
    return jsonify({
        "categories": [category.to_dict() for category in categories],
        "totalCategories": len(categories),
        "totalItems": sum(len(category.items) for category in categories),
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    })

@menu_bp.route('/menu/categories', methods=['GET'])
def get_menu_categories_names():
    menu_categories = MenuCategory.query.all()
    return jsonify({
        "categories": [c.category for c in menu_categories],
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    })
    
    
@menu_bp.route('/menu', methods=['POST'])
def add_menu_item():
    data = request.get_json()
    
    required_fields = ["name", "cost", "price", "available", "category_id"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    if not is_valid_name(data["name"]):
        return jsonify({"error": "Invalid name"}), 400
    if not is_valid_cost(data["cost"]):
        return jsonify({"error": "Invalid cost"}), 400
    if not is_valid_price(data["price"]):
        return jsonify({"error": "Invalid price"}), 400
    if not is_valid_available(data["available"]):
        return jsonify({"error": "Invalid availability"}), 400
    
    # Get the category by ID
    category = MenuCategory.query.get(data["category_id"])
    if not category:
        return jsonify({"error": "Category not found"}), 404
    
    new_item = MenuItem(
        name=data["name"].strip(),
        description=data.get("description", "").strip(),
        cost=data["cost"],
        price=data["price"],
        available=data["available"],
        category_id=category.id # Link to the category by ID
    )
    
    try:
        db.session.add(new_item)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    return jsonify(new_item.to_dict()), 201

@menu_bp.route('/menu/<int:item_id>', methods=['PATCH'])
def update_menu_item(item_id):    
    item = MenuItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404
    
    data = request.get_json()
    
    # Check for valid fields in the request
    if "name" in data:
        if not is_valid_name(data["strip"]):
            return jsonify({"error": "Invalid name"}), 400
        item.name = data["name"].strip()

    if "description" in data:
        if not is_valid_description(data["description"]):
            return jsonify({"error": "Invalid description"}), 400
        item.description = data["description"].strip()

    if "cost" in data:
        if not is_valid_cost(data["cost"]):
            return jsonify({"error": "Invalid cost"}), 400
        item.cost = data["cost"]

    if "price" in data:
        if not is_valid_price(data["price"]):
            return jsonify({"error": "Invalid price"}), 400
        item.price = data["price"]

    if "available" in data:
        if not is_valid_available(data["available"]):
            return jsonify({"error": "Invalid availability flag"}), 400
        item.available = data["available"]

    if "category_id" in data:
        category = MenuCategory.query.get(data["category_id"])
        if not category:
            return jsonify({"error": "Category not found"}), 404
        item.category_id = category.id
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    return jsonify(item.to_dict()), 200

@menu_bp.route('/menu/<int:item_id>', methods=['DELETE'])
def delete_menu_item(item_id):
    item = MenuItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404
    
    try:
        db.session.delete(item)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"message": "Item deleted successfully"}), 200

# Route to get all available menu items for orders
@menu_bp.route('/menu/items', methods=['GET'])
def get_available_menu_items():
    items = MenuItem.query.all()
    return jsonify([
        {
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "available": item.available,
            "cost": item.cost
        }
        for item in items
    ])