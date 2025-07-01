from models.menu_models import MenuCategory
from models.finances_models import TransactionCategory
from db import db

def seed_menu_categories():
    categories = ["Appetizers", "Entrées", "Sides", "Desserts", "Beverages"]

    for category_name in categories:
        exists = MenuCategory.query.filter_by(category=category_name).first()
        if not exists:
            new_cat = MenuCategory(category=category_name)
            db.session.add(new_cat)
    db.session.commit()
    
def seed_income_categories():
    categories = ["Sale", "Other"]

    for category_name in categories:
        exists = TransactionCategory.query.filter_by(name=category_name, is_income=True).first()
        if not exists:
            new_cat = TransactionCategory(name=category_name, is_income=True)
            db.session.add(new_cat)
    db.session.commit()
            
def seed_expense_categories():
    categories = ["Inventory", "Payroll", "Utilities", "Production", "Others"]

    for category_name in categories:
        exists = TransactionCategory.query.filter_by(name=category_name,is_income=False).first()
        if not exists:
            new_cat = TransactionCategory(name=category_name, is_income=False)
            db.session.add(new_cat)
    db.session.commit()
    
