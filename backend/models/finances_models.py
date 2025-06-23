from db import db
        
class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    income = db.Column(db.Boolean, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    date = db.Column(db.String(10), nullable=False)  # ISO date
    manual_entry = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "income": self.income,
            "amount": self.amount,
            "description": self.description,
            "date": self.date,
            "manualEntry": self.manual_entry
        }

class ExpenseCategoryTotal(db.Model):
    __tablename__ = "expense_totals"

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "category": self.category,
            "amount": self.amount
        }

class RevenueByCategory(db.Model):
    __tablename__ = "revenue_totals"

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "category": self.category,
            "amount": self.amount
        }
