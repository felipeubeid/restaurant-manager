import React from 'react'
import InventoryList from '@/components/InventoryList'
import InventoryAddModel from '@/components/modals/InventoryAddModel'

const inventory = [
  {
    id: 1,
    name: "Flour",
    quantity: 25, 
    unit: "lbs",
    costPerUnit: 0.75,
    totalCost: 18.75,
    minQuantity: 10,
    inStock: true,
  },
  {
    id: 2,
    name: "Mozzarella Cheese",
    quantity: 8, 
    unit: "lbs",
    costPerUnit: 3.5,
    totalCost: 28,
    minQuantity: 5,
    inStock: true,
  },
  {
    id: 3,
    name: "Tomato Sauce",
    quantity: 0,
    unit: "gal",
    costPerUnit: 4.2,
    totalCost: 8.4,
    minQuantity: 3,
    inStock: false,
  },
  {
    id: 4,
    name: "Olive Oil",
    quantity: 0, 
    unit: "gal",
    costPerUnit: 7.5,
    totalCost: 11.25,
    minQuantity: 2,
    inStock: false,
  },
  {
    id: 5,
    name: "Ground Beef",
    quantity: 12, 
    unit: "lbs",
    costPerUnit: 4.75,
    totalCost: 57,
    minQuantity: 8,
    inStock: true,
  },
  {
    id: 6,
    name: "Lettuce",
    quantity: 5,
    unit: "units",
    costPerUnit: 1.25,
    totalCost: 6.25,
    minQuantity: 4,
    inStock: true,
  }
];

const Inventory = () => {
  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
            <p className="text-muted-foreground">Track and manage restaurant inventory</p>
          </div>
          <InventoryAddModel />
        </div>
        <div className="space-y-6">
          <InventoryList inventory={inventory}></InventoryList>
        </div>
    </div>
  )
}

export default Inventory
