import React, { useState, useEffect } from 'react'
import InventoryList from '@/components/InventoryList'
import InventoryAddModal from '@/components/modals/InventoryAddModal'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

const Inventory = () => {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchInventory = async () => {
    setLoading(true)
    try {
      const inventoryRes = await axios.get("http://127.0.0.1:5000/inventory");
      setInventory(inventoryRes.data.inventory || [])
    } catch (error) {
      toast.error("Failed to load inventory.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])
  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
            <p className="text-muted-foreground">Track and manage restaurant inventory</p>
          </div>
          <InventoryAddModal onAdded={fetchInventory}/>
        </div>
        { loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <div className="space-y-6">
            <InventoryList inventory={inventory} fetchInventory={fetchInventory}></InventoryList>
          </div>
        )}
    </div>
  )
}

export default Inventory
