# Restaurant Manager

A full-stack Restaurant Manager application that allows CRUD operations on finances, orders, menu, 
staff, and inventory. Designed to help track and manage restaurant operations in a modern web interface.

## Features

- Manage Finances: transactions, revenue, expenses
- Manage Orders: add, update, delete orders and order items
- Manage Menu: full CRUD for menu items:
- Manage Staff: schedule shifts, assign roles, update staff data
- Manage Inventory: track items, quantities, low-stock warnings

## Built with:

- React + Vite
- Shadcn/UI for components and styling
- Axios for API requests
- Flask (Python)
- Flask-SQLAlchemy for database models and ORM

## Installation Instructions

1. Clone the repository:
```git clone https://github.com/felipeubeid/restaurant-manager.git```
2. Set up backend (Flask):
```
cd backend
python3 -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run
```
Runs on http://127.0.0.1:5000 by default

3. Set up frontend (React)
```
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173 by default

## License

MIT License
