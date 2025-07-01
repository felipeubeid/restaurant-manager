import React, { useState, useEffect } from 'react'
import OrderCard from '@/components/OrderCard'
import OrdersAddModal from '@/components/modals/OrdersAddModal'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const [ordersRes, menuItemsRes, staffRes]
      = await Promise.all([
        axios.get('http://127.0.0.1:5000/orders'),
        axios.get('http://127.0.0.1:5000/menu/items'),
        axios.get('http://127.0.0.1:5000/staff')

      ])
      setOrders(ordersRes.data.orders || [])
      setMenuItems(menuItemsRes.data || [])
      setStaff(staffRes.data.staff || [])
    } catch (error) {
      toast.error("Failed to load orders.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">

          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground">Track and review all restaurant orders</p>
          </div>
          <OrdersAddModal menuItems={menuItems} staff={staff} onAdded={fetchOrders}/>
        </div>
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
         ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} menuItems={menuItems} 
                staff={staff} fetchOrders={fetchOrders} />
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default Orders
