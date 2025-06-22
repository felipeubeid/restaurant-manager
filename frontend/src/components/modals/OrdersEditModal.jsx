import React, { useState, useEffect } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Minus, Edit } from 'lucide-react'

  const staff = [
  { id: 1, name: "Alice Johnson", role: "Server", status: "Active" },
  { id: 2, name: "Carlos Ramirez", role: "Cook", status: "Active" },
  { id: 3, name: "Jenna Lee", role: "Host", status: "Off" },
  { id: 4, name: "Marcus Smith", role: "Dishwasher", status: "Active" },
  { id: 5, name: "Emily Brown", role: "Manager", status: "Active" },
  ];

  const menuData = [
    { id: 1, name: "Caesar Salad", cost: 2.10, price: 7.50, available: true },
    { id: 2, name: "Margherita Pizza", cost: 4.25, price: 12.00, available: true },
    { id: 3, name: "Spaghetti Carbonara", cost: 3.90, price: 13.00, available: true },
    { id: 4, name: "Bruschetta", cost: 1.20, price: 6.00, available: true },
    { id: 5, name: "Garlic Bread", cost: 0.90, price: 3.00, available: true },
  ]

const OrdersEditModal = ({order}) => {
  const [type, setType] = useState(order?.isTakeout ? "takeout" : "dineIn")
  const [server, setServer] = useState(order?.server || "")
  const [date, setDate] = useState(order?.date || new Date().toISOString().slice(0, 10))
  const [orderItems, setOrderItems] = useState(order?.items || [])
  const [total, setTotal] = useState(order?.total || 0)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [orderNumber, setOrderNumber] = useState(order?.orderNumber || "")
  const [completed, setCompleted] = useState(order?.completed || false)

  // Update total whenever orderItems change
  useEffect(() => {
    const sum = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setTotal(sum)
  }, [orderItems])

  // Handle item selection from the dropdown
  function onSelectItem(val) {
    const id = Number(val) // Convert value to number
    const item = menuData.find(i => i.id === id) // Find the item by id
    
    if (!item || !item.available) return // If item is not found or not available, do nothing

    setOrderItems(prev => { // Check if item already exists in orderItems
      const existing = prev.find(i => i.id === id)
      if (existing) { // If item already exists, increment quantity
        return prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }] // Add new item with quantity 1
    })
    setSelectedItemId(null)
    }

    function increaseQty(id) { // Increase quantity of an existing item
      setOrderItems(prev => prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)))
    }

    function decreaseQty(id) { // Decrease quantity of an existing item
      setOrderItems(prev =>
        prev
          .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
          .filter(i => i.quantity > 0)) // Remove item if quantity is 0
    }

    const servers = staff.filter(person => person.status === "Active")

    const filteredMenu = menuData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
    <Dialog onOpenChange={(isOpen) => {
      if (!isOpen) {
        setType(order?.isTakeout ? "takeout" : "dineIn")
        setServer(order?.server || "")
        setDate(order?.date || new Date().toISOString().slice(0, 10))
        setOrderItems(order?.items || [])
        setTotal(order?.total || 0)
        setSearchTerm("")
        setSelectedItemId(null)
        setOrderNumber(order?.orderNumber || "")
        setCompleted(order?.completed || false)
      }
    }}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 shadow-none">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
        </DialogHeader>

        {/* Dine In or Takeout */ }
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <RadioGroup
              className="col-span-3 flex gap-6"
              value={type}
              onValueChange={(value) => {
              setType(value)
              }}>
              <div className="flex items-center space-x-2 ">
                <RadioGroupItem value="dineIn" id="income" className="shadow-none border-lg"/>
                <Label htmlFor="dineIn">Dine In</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="takeout" id="expense" className="shadow-none border-lg"/>
                <Label htmlFor="takeout">Takeout</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        {/* Date */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date" className="text-right">Date</Label>
          <Input 
            id="date" 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="col-span-3 shadow-none"/>
        </div>

        {/* Order Number */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="orderNumber" className="text-right">Order Number</Label>
            <div className="relative col-span-3">
              <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500 pointer-events-none">
                # </span>
              <Input
                id="orderNumber"
                className="pl-7 shadow-none"
                type="number"
                inputMode="decimal"
                placeholder ="Order Number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}/>
            </div>
        </div>

        {/* Server */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="server" className="text-right">Server</Label>
          <Select value={server} onValueChange={setServer}>
            <SelectTrigger className="col-span-3 shadow-none">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {servers.map((s) => (
                <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Items */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="menuSelect" className="text-right">Select Item</Label>
          <Select value={selectedItemId ? selectedItemId.toString() : ""}
          onValueChange={onSelectItem}>
          <SelectTrigger id="menuSelect" className="col-span-3 shadow-none" />
            <SelectContent className="max-h-48 overflow-y-auto">
              {menuData.map(item => (
                <SelectItem
                  key={item.id}
                  value={item.id.toString()}
                  disabled={!item.available}
                  className={`w-full block !p-2 ${!item.available ? "text-gray-400" : ""}`}>
                  <div className="flex justify-between items-center w-full text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500">${item.price.toFixed(2)}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {orderItems.length == 0 ? "" : (
        // Order Items
        <div className="mb-3">
          <Label className="block text-center mb-4">Order Items</Label>
          <div className="max-h-32 overflow-y-auto border rounded-xl p-2 px-4">
            {orderItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm py-1">
                <div className="flex-1 truncate">{item.name}</div>
                <div className="flex items-center gap-1 w-28 justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decreaseQty(item.id)}
                    className="shadow-none">
                    <Minus size={14} />
                  </Button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increaseQty(item.id)}
                    className="shadow-none">
                    <Plus size={14} />
                  </Button>
                </div>
                <div className="w-20 text-right">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        )}
        
        <div className="flex items-center justify-between mb-2 px-1">
          {/* // Completed Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="completed"
              checked={completed}
              onCheckedChange={setCompleted}
              className="shadow-none"
            />
            <Label htmlFor="completed">Completed</Label>
          </div>
          <div>
            {/* Order Total */}
            {orderItems.length == 0 ? "" : (
            <div className="flex justify-end mb-2">
              <span className="font-bold">Total:</span>
              <span className="ml-2">${total.toFixed(2)}</span>
            </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default OrdersEditModal
