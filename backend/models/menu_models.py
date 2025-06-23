from db import db

class MenuCategory(db.Model):
    __tablename__ = 'menu_categories'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)

    # Lets us access the items in this category
    items = db.relationship('MenuItem', back_populates='category', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            # Will return a list of items in this category
            "items": [item.to_dict() for item in self.items]
        }

class MenuItem(db.Model):
    __tablename__ = 'menu_items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    cost = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    available = db.Column(db.Boolean, nullable=False, default=True)

    category_id = db.Column(db.Integer, db.ForeignKey('menu_categories.id'), nullable=False)
    # Lets us access the category this item belongs to
    category = db.relationship('MenuCategory', back_populates='items')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "cost": self.cost,
            "price": self.price,
            "available": self.available
        }
