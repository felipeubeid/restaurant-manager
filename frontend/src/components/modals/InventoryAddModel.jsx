import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Plus } from 'lucide-react'

const InventoryAddModel = () => {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [minQuantity, setMinQuantity] = useState("")
  const [unit, setUnit] = useState("")
  const [totalCost, setTotalCost] = useState("")

  return (
    <Dialog onOpenChange={(isOpen) => {
      if (!isOpen) {
        setName("")
        setQuantity("")
        setMinQuantity("")
        setUnit("")
        setTotalCost("")
      }}}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <div className="relative col-span-3">
              <Input
                id="name"
                className="shadow-none"
                placeholder ="Item name"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">Quantity</Label>
            <div className="col-span-3 flex gap-2">
              <Input
                id="quantity"
                className="shadow-none"
                placeholder="Item quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Input
                id="unit"
                className="shadow-none"
                placeholder="Units"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
              </div>
          </div>

          {/* Minimum Quantity */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minQuantity" className="text-right">Minimum Quantity</Label>
            <div className="relative col-span-3">
              <Input
                id="minQuantity"
                className="shadow-none"
                placeholder ="Min. quantity before alert"
                value={minQuantity}
                onChange={(e) => setMinQuantity(e.target.value)}/>
            </div>
          </div>

          {/* Cost */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalCost" className="text-right">Total Cost</Label>
              <div className="relative col-span-3">
                <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500 pointer-events-none">
                  $ </span>
                <Input
                  id="totalCost"
                  className="pl-7 shadow-none"
                  type="number"
                  inputMode="decimal"
                  placeholder ="0.00"
                  value={totalCost}
                  onChange={(e) => setTotalCost(e.target.value)}/>
              </div>
          </div>

        </div>

        <DialogFooter>
          <Button type="submit">
            <Plus className="h-4 w-4" />Add
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default InventoryAddModel
