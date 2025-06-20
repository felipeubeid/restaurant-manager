import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@radix-ui/react-label'
import { Edit } from "lucide-react"

const InventoryEditModel = ({item}) => {
  const [name, setName] = useState(item?.name || "")
  const [quantity, setQuantity] = useState(item?.quantity?.toString() || "")
  const [minQuantity, setMinQuantity] = useState(item?.minQuantity?.toString() || "")
  const [unit, setUnit] = useState(item?.unit || "")
  const [totalCost, setTotalCost] = useState(item?.totalCost?.toString() || "")

  return (
    <Dialog onOpenChange={(isOpen) => {
      if (!isOpen) {
        setName(item?.name || "")
        setQuantity(item?.quantity?.toString() || "")
        setMinQuantity(item?.minQuantity?.toString() || "")
        setUnit(item?.unit || "")
        setTotalCost(item?.totalCost?.toString() || "")
      }}}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 shadow-none">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Inventory Item</DialogTitle>
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
            <Label htmlFor="totalCost" className="text-right">Cost</Label>
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
          <Button type="submit">Save</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default InventoryEditModel
