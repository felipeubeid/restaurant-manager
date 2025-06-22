from config import create_app
from routes.inventory import inventory_bp
from db import db

app = create_app()
app.register_blueprint(inventory_bp) # Collects all inventory management routes

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
