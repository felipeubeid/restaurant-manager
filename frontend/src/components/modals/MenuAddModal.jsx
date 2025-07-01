import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const MenuAddModal = ({categories, onAdded}) => {
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [cost, setCost] = useState("")
  const [available, setAvailable] = useState(false)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAddMenuItem = async () => {
    const costVal = parseFloat(cost) || 0
    const priceVal = parseFloat(price) || 0
    setLoading(true)
    if (!name || !cost || isNaN(costVal) || costVal < 0 
    || !price || isNaN(priceVal) || priceVal < 0) {
      toast.error("Please fill in name, and a valid price and/or cost.")
      setLoading(false)
      return 
    }

    const selectedCategory = categories.find(
      (cat) => String(cat.id) === String(category))
  
    if (!selectedCategory) {
      toast.error("Please select a valid category.")
      setLoading(false)
      return
    }

    const payload = {
      category_id: selectedCategory.id,
      name,
      description: description || "",
      price: priceVal,
      cost: costVal,
      available
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/menu", payload)
      if (onAdded) onAdded()

      setCategory("")
      setName("")
      setDescription("")
      setPrice("")
      setCost("")
      setAvailable(false)
      
      setOpen(false)
      toast.success("Menu item added!")
    } catch (err) {
      toast.error("Error adding menu item")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) {
      setCategory("")
      setName("")
      setDescription("")
      setPrice("")
      setCost("")
      setAvailable(false)
      }}}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Menu Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Menu Item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
          { /* Category Selection */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3 shadow-none">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {(categories || []).map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
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

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea 
            id="description" 
            placeholder="Item description..." 
            className="col-span-3 shadow-none" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
          </div>

          {/* Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
              <div className="relative col-span-3">
                <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500 pointer-events-none">
                  $ </span>
                <Input
                  id="price"
                  className="pl-7 shadow-none"
                  type="number"
                  inputMode="decimal"
                  placeholder ="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}/>
              </div>
          </div>

          {/* Cost */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">Cost</Label>
              <div className="relative col-span-3">
                <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500 pointer-events-none">
                  $ </span>
                <Input
                  id="cost"
                  className="pl-7 shadow-none"
                  type="number"
                  inputMode="decimal"
                  placeholder ="0.00"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}/>
              </div>
          </div>
          
          {/* Available */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="available" className="text-right">Available</Label>
              <div className="relative col-span-3">
                <div className="flex items-center gap-2">
                  <Checkbox 
                  id="available" 
                  className="shadow-none border-lg"
                  checked={available}
                  onCheckedChange={(checked) => setAvailable(checked === true)}
                  />
                </div>
              </div>
          </div>
        </div>

        <DialogFooter>
        <Button onClick={handleAddMenuItem} disabled={loading}>
            <Plus className="h-4 w-4" />
            {loading ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Add'}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default MenuAddModal
