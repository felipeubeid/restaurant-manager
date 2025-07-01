import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Edit, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const InventoryEditModel = ({item, onEdited}) => {
  const [name, setName] = useState(item?.name || "")
  const [quantity, setQuantity] = useState(item?.quantity?.toString() || "")
  const [minQuantity, setMinQuantity] = useState(item?.minQuantity?.toString() || "")
  const [unit, setUnit] = useState(item?.unit || "")
  const [totalCost, setTotalCost] = useState(item?.totalCost?.toString() || "")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEditItem = async () => {
    setLoading(true)
    const quantityVal = parseFloat(quantity) || 0
    const minQuantityVal = parseFloat(minQuantity) || 0
    const totalCostVal = parseFloat(totalCost) || 0
    // Validate
    if (!name || !unit || isNaN(quantityVal) || quantityVal <= 0 
    || isNaN(minQuantityVal) || minQuantityVal < 0 
    || isNaN(totalCostVal) || totalCostVal < 0) {
      toast.error("Please fill in name, units, and valid quantities and cost.")
      setLoading(false)
      return 
    }
  
    const payload = {
      name,
      quantity: quantityVal,
      minQuantity: minQuantityVal,
      unit,
      totalCost: totalCostVal
    }
  
    try {
      const res = await axios.patch(`http://127.0.0.1:5000/inventory/${item.id}`, payload)
      toast.success("Inventory Item edited!")
      setOpen(false)
      if (onEdited) onEdited()
    } catch (err) {
      toast.error("Error editing Inventory Item")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) {
        setName(item?.name || "")
        setQuantity(item?.quantity?.toString() || "")
        setMinQuantity(item?.minQuantity?.toString() || "")
        setUnit(item?.unit || "")
        setTotalCost(item?.totalCost?.toString() || "")
      }}}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} size="sm" variant="outline" className="h-8 w-8 p-0 shadow-none">
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
                placeholder="Unit"
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
          <Button onClick={handleEditItem} disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Save'}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default InventoryEditModel
