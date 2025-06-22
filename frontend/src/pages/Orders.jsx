import React from 'react'
import OrderCard from '@/components/OrderCard'
import OrdersAddModal from '@/components/modals/OrdersAddModal'

const orders = [
  {
    id: 1,
    orderNumber: 1,
    items: [
      { id: 2, name: "Margherita Pizza", quantity: 2, price: 12.00 },
      { id: 4, name: "Bruschetta", quantity: 1, price: 6.00 }
    ],
    total: 30.00,
    completed: true,
    date: "2025-06-12",
    isTakeout: false,
    server: "Alice Johnson"
  },
  {
    id: 2,
    orderNumber: 2,
    items: [
      { id: 3, name: "Spaghetti Carbonara", quantity: 1, price: 13.00 },
      { id: 5, name: "Garlic Bread", quantity: 2, price: 6.00 }
    ],
    total: 25.00,
    completed: true,
    date: "2025-06-12",
    isTakeout: true,
    server: "Alice Johnson"
  },
  {
    id: 3,
    orderNumber: 3,
    items: [
      { id: 1, name: "Caesar Salad", quantity: 1, price: 7.50 }
    ],
    total: 7.50,
    completed: false,
    date: "2025-06-11",
    isTakeout: false,
    server: "Emily Brown"
  },
  {
    id: 4,
    orderNumber: 4,
    items: [
      { id: 2, name: "Margherita Pizza", quantity: 1, price: 12.00 },
    ],
    total: 18.00,
    completed: true,
    date: "2025-06-10",
    isTakeout: true,
    server: "Alice Johnson"
  },
  {
    id: 5,
    orderNumber: 5,
    items: [
      { id: 3, name: "Spaghetti Carbonara", quantity: 1, price: 13.00 }
    ],
    total: 13.00,
    completed: true,
    date: "2025-06-09",
    isTakeout: false,
    server: "Emily Brown"
  }
]


const Orders = () => {
  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">

          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground">Track and review all restaurant orders</p>
          </div>
          <OrdersAddModal />
        </div>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {orders.map((order) => (
              orders.length > 0 && (<OrderCard key={order.id} order={order} />)
            ))}
          </div>
        </div>
    </div>
  )
}

export default Orders
