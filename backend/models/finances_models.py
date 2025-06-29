from db import db

class TransactionCategory(db.Model):
    __tablename__ = "transaction_categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    is_income = db.Column(db.Boolean, nullable=False)

    transactions = db.relationship('Transaction', back_populates='category', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "isIncome": self.is_income
        }

class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    is_income = db.Column(db.Boolean, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    date = db.Column(db.String(10), nullable=False)  # ISO date
    manual_entry = db.Column(db.Boolean, default=False)
    
    category_id = db.Column(db.Integer, db.ForeignKey('transaction_categories.id'), nullable=False)
    category = db.relationship('TransactionCategory', back_populates='transactions')

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category.to_dict(),
            "isIncome": self.category.is_income,
            "amount": self.amount,
            "description": self.description,
            "date": self.date,
            "manualEntry": self.manual_entry
        }

class ExpenseByCategory(db.Model):
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
