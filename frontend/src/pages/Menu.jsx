import React, { useState, useEffect } from 'react'
import MenuCategory from '@/components/MenuCategory'
import MenuAddModal from '@/components/modals/MenuAddModal'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

const Menu = () => {

  const [menu, setMenu] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchMenu = async () => {
    setLoading(true)
    try {
      const [ menuRes, categoriesRes] 
      = await Promise.all([
        axios.get('http://127.0.0.1:5000/menu'),
        axios.get('http://127.0.0.1:5000/menu/categories')
      ])
      setMenu(menuRes.data.categories || [])
      setCategories(categoriesRes.data.categories || [])
    } catch (error) {
      toast.error("Failed to load menu.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Menu Management</h1>
            <p className="text-muted-foreground">Manage menu items, prices, and availability</p>
          </div>
          <MenuAddModal categories={categories} onAdded={fetchMenu}/>
        </div>
        { loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <div className="space-y-6">
            {menu.map(({ id, category, items }) => (
              items.length > 0 && (<MenuCategory key={id} category={category} 
                items={items} fetchMenu={fetchMenu} categories={categories}/>)
            ))}
          </div>
        )}
    </div>
  )
}

export default Menu
