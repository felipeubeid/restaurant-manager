from db import db

class InventoryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    cost_per_unit = db.Column(db.Float, nullable=False)
    total_cost = db.Column(db.Float, nullable=False)
    min_quantity = db.Column(db.Float, nullable=False)
    in_stock = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "quantity": self.quantity,
            "unit": self.unit,
            "costPerUnit": self.cost_per_unit,
            "totalCost": self.total_cost,
            "minQuantity": self.min_quantity,
            "inStock": self.in_stock
        }
