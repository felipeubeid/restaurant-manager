import React from 'react'
import InventoryItem from '@/components/InventoryItem'
import InventoryList from '@/components/InventoryList'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const inventory = [
  {
    id: 1,
    name: "Flour",
    category: "Baking",
    quantity: 25, // in pounds
    unit: "lbs",
    costPerUnit: 0.75,
    totalCost: 18.75,
    minQuantity: 10,
    inStock: true,
  },
  {
    id: 2,
    name: "Mozzarella Cheese",
    category: "Dairy",
    quantity: 8, // in pounds
    unit: "lbs",
    costPerUnit: 3.5,
    totalCost: 28,
    minQuantity: 5,
    inStock: true,
  },
  {
    id: 3,
    name: "Tomato Sauce",
    category: "Canned Goods",
    quantity: 0, // in gallons
    unit: "gal",
    costPerUnit: 4.2,
    totalCost: 8.4,
    minQuantity: 3,
    inStock: false,
  },
  {
    id: 4,
    name: "Olive Oil",
    category: "Condiments",
    quantity: 0, // in gallons
    unit: "gal",
    costPerUnit: 7.5,
    totalCost: 11.25,
    minQuantity: 2,
    inStock: false,
  },
  {
    id: 5,
    name: "Ground Beef",
    category: "Meat",
    quantity: 12, // in pounds
    unit: "lbs",
    costPerUnit: 4.75,
    totalCost: 57,
    minQuantity: 8,
    inStock: true,
  },
  {
    id: 6,
    name: "Lettuce",
    category: "Produce",
    quantity: 5, // in heads
    unit: "units",
    costPerUnit: 1.25,
    totalCost: 6.25,
    minQuantity: 4,
    inStock: true,
  }
];

const Inventory = () => {
  return (
    <div>
      <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 px-4 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
            <p className="text-muted-foreground">Track and manage restaurant inventory</p>
          </div>
          <Link to ={'/add-menu-item'}>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Item
            </Button>
          </Link>
        </div>
        <div className="space-y-6 px-4">
          <InventoryList inventory={inventory}></InventoryList>
        </div>
      </div>
    </div>
  )
}

export default Inventory
