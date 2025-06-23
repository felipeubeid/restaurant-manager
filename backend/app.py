from config import create_app
from routes.inventory_routes import inventory_bp
from routes.staff_routes import staff_bp
from db import db

app = create_app()
app.register_blueprint(inventory_bp) # Collects all inventory management routes
app.register_blueprint(staff_bp) # Collects all staff management routes

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
