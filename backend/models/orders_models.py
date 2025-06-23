from db import db

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.Integer, nullable=False, unique=True)
    total = db.Column(db.Float, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    date = db.Column(db.String(10), nullable=False)  # ISO format
    is_takeout = db.Column(db.Boolean, default=False)
    server = db.Column(db.String(100), nullable=False)

    # cascade="all, delete-orphan" ensures that when an order is deleted, its items are also deleted
    items = db.relationship('OrderItem', back_populates='order', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "orderNumber": self.order_number,
            "items": [item.to_dict() for item in self.items],
            "total": self.total,
            "completed": self.completed,
            "date": self.date,
            "isTakeout": self.is_takeout,
            "server": self.server
        }


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    # back_populates allows us to access the order this item belongs to
    order = db.relationship('Order', back_populates='items')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "quantity": self.quantity,
            "price": self.price
        }