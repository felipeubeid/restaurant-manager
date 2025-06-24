from models.menu_models import MenuCategory
from db import db

def seed_categories():
    categories = ["Appetizers", "Entrées", "Sides", "Desserts", "Beverages"]

    for category_name in categories:
        exists = MenuCategory.query.filter_by(category=category_name).first()
        if not exists:
            new_cat = MenuCategory(category=category_name)
            db.session.add(new_cat)

    db.session.commit()
