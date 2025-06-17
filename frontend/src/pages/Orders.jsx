import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrderCard from '@/components/ui/OrderCard';

const orders = [
  {
    id: 1,
    orderNumber: 1,
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 12.00 },
      { name: "Bruschetta", quantity: 1, price: 6.00 }
    ],
    total: 30.00,
    completed: true,
    date: "2025-06-12T19:15:00",
    isTakeout: false,
    server: "Alice Johnson"
  },
  {
    id: 2,
    orderNumber: 2,
    items: [
      { name: "Spaghetti Carbonara", quantity: 1, price: 13.00 },
      { name: "Garlic Bread", quantity: 2, price: 6.00 }
    ],
    total: 25.00,
    completed: true,
    date: "2025-06-12T20:45:00",
    isTakeout: true,
    server: "Alice Johnson"
  },
  {
    id: 3,
    orderNumber: 3,
    items: [
      { name: "Caesar Salad", quantity: 1, price: 7.50 }
    ],
    total: 7.50,
    completed: false,
    date: "2025-06-11T18:05:00",
    isTakeout: false,
    server: "Emily Brown"
  },
  {
    id: 4,
    orderNumber: 4,
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.00 },
      { name: "Lemonade", quantity: 2, price: 3.00 }
    ],
    total: 18.00,
    completed: true,
    date: "2025-06-10T13:22:00",
    isTakeout: true,
    server: "Alice Johnson"
  },
  {
    id: 5,
    orderNumber: 5,
    items: [
      { name: "Spaghetti Carbonara", quantity: 1, price: 13.00 }
    ],
    total: 13.00,
    completed: true,
    date: "2025-06-09T21:05:00",
    isTakeout: false,
    server: "Emily Brown"
  }
];

const Orders = () => {
  return (
    <div>
      <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 px-4 gap-3">

          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground">Track and review all restaurant orders</p>
          </div>
          <Link to ={'/add-order'}>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Order
            </Button>
          </Link>
        </div>
        <div className="px-4 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {orders.map((order) => (
              orders.length > 0 && (<OrderCard key={order.id} order={order} />)
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
