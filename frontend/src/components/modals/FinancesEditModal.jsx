import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Edit } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

const FinancesEditModal = ({transaction}) => {
  const [type, setType] = useState(transaction.income ? "income" : "expense")
  const [category, setCategory] = useState(transaction.category || "")
  const [amount, setAmount] = useState(transaction.amount?.toString() || "")
  const [date, setDate] = useState(transaction.date || new Date().toISOString().slice(0, 10))
  const [description, setDescription] = useState(transaction.description || "")
  
  const categories = {
    income: ["Sale", "Other"],
    expense: ["Inventory", "Payroll", "Utilities", "Maintenance", "Other"],
  }

  const handleTypeChange = (selectedType) => {
    if (type !== selectedType) {
      setType(selectedType)
      setCategory("") // reset category when type changes
    }
  }
  
  return (
    <Dialog onOpenChange={(isOpen) => {
      if (isOpen) {
        setType(transaction?.income ? "income" : "expense")
        setCategory(transaction?.category || "")
        setAmount(transaction?.amount?.toString() || "")
        setDate(transaction?.date || new Date().toISOString().slice(0, 10))
        setDescription(transaction?.description || "")
      }
    }}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 shadow-none">
      	  <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Transaction Type */}
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="income"
                className="shadow-none border-lg"
                checked={type === "income"}
                onCheckedChange={() => handleTypeChange("income")}
              />
              <Label htmlFor="income">Income</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="expense"
                className="shadow-none border-lg"
                checked={type === "expense"}
                onCheckedChange={() => handleTypeChange("expense")}
              />
              <Label htmlFor="expense">Expense</Label>
            </div>
          </div>

          {/* Date */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Date</Label>
            <Input id="date" type="date" 
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
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  inputMode="decimal"
                  placeholder ="0.00"/>
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
            <Textarea id="description" placeholder="Optional notes..." className="col-span-3 shadow-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
          </div>
        </div>

        <DialogFooter>
            <Button type="submit">Save</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default FinancesEditModal