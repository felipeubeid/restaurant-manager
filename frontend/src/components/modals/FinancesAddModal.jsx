import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@radix-ui/react-label'
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

const FinancesAddModal = () => {
  const [type, setType] = useState("expense")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(() => {
    // default to today's date
    const today = new Date()
    return today.toISOString().slice(0, 10)
  })
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  
  const categories = {
    income: ["Sale", "Other"],
    expense: ["Inventory", "Payroll", "Utilities", "Maintenance", "Other"],
  }
  
  return (
    <Dialog onOpenChange={(isOpen) => {
      if (!isOpen) {
        setType("expense")
        setCategory("")
        setAmount("")
        setDate(new Date().toISOString().slice(0, 10))
        setDescription("")
      }}}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Transaction Type */}
          <div className="flex justify-center">
            <ToggleGroup 
            type="single" 
            value={type}
            onValueChange={(val) => {
              if (val) {
                setType(val)
                setCategory("") // reset category when type changes
              }
            }}
            className="gap-2">
              <ToggleGroupItem value="income" aria-label="Income">Income</ToggleGroupItem>
              <ToggleGroupItem value="expense" aria-label="Expense">Expense</ToggleGroupItem>
            </ToggleGroup>
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
          
          {/* Amount */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">Amount</Label>
              <div className="relative col-span-3">
                <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500 pointer-events-none">
                  $ </span>
                <Input
                  id="amount"
                  className="pl-7 shadow-none"
                  type="number"
                  inputMode="decimal"
                  placeholder ="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}/>
              </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3 shadow-none">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {(categories[type] || []).map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea 
            id="description" 
            placeholder="Optional notes..." 
            className="col-span-3 shadow-none" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
          </div>
        </div>

        <DialogFooter>
            <Button type="submit">Add</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default FinancesAddModal
