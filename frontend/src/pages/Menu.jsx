import React from 'react'
import MenuCategory from '@/components/MenuCategory'
import MenuAddModal from '@/components/modals/MenuAddModal'

const menuData = [
  {
    id: 1,
    category: "Appetizers",
    items: [
      {
        id: 2,
        name: "Caesar Salad",
        description: "Romaine lettuce, croutons, parmesan, and Caesar dressing.",
        cost: 2.10,
        price: 7.50,
        available: true
      }
    ]
  },
  {
    id: 2,
    category: "Entrées",
    items: [
      {
        id: 1,
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
        cost: 4.25,
        price: 12.00,
        available: false
      },
      {
        id: 3,
        name: "Spaghetti Carbonara",
        description: "Pasta with creamy sauce, pancetta, and parmesan.",
        cost: 3.90,
        price: 13.00,
        available: true
      }
    ]
  },
  {
    id: 3,
    category: "Sides",
    items: [
      {
        id: 4,
        name: "Bruschetta",
        description: "Toasted baguette slices with tomatoes and cheese.",
        cost: 1.20,
        price: 6.00,
        available: true
      },
      {
        id: 5,
        name: "Garlic Bread",
        description: "Toasted baguette slices with garlic butter.",
        cost: 0.90,
        price: 3.00,
        available: false
      }
    ]
  }
]

const Menu = () => {

  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Menu Management</h1>
            <p className="text-muted-foreground">Manage menu items, prices, and availability</p>
          </div>
          <MenuAddModal />
        </div>
        <div className="space-y-6">
          {menuData.map(({ id, category, items }) => (
            items.length > 0 && (<MenuCategory key={id} category={category} items={items} />)
          ))}
        </div>
    </div>
  )
}

export default Menu
