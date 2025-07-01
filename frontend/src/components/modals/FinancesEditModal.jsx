import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Edit, Loader2 } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from 'react-toastify'
import axios from 'axios'

const FinancesEditModal = ({categoriesList, onEdited, transaction}) => {
  const [type, setType] = useState(transaction.isIncome ? "income" : "expense")
  const [category, setCategory] = useState(transaction?.category?.id ? String(transaction.category.id) : "")
  const [amount, setAmount] = useState(transaction.amount?.toString() || "")
  const [date, setDate] = useState(transaction.date || new Date().toISOString().slice(0, 10))
  const [description, setDescription] = useState(transaction.description || "")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const categories = categoriesList || { income: [], expense: [] }

  const handleTypeChange = (selectedType) => {
    setLoading(true)
    if (type !== selectedType) {
      setType(selectedType)
      setCategory("") // reset category when type changes
    }
  }

  const handleEditTransaction = async () => {
    const amountVal = parseFloat(amount)
    // Validate
    if (!type || !category || !amount || isNaN(amountVal) || amountVal <= 0) {
      toast.error("Please fill all required fields with valid data.")
      return
    }
  
    const selectedCategory = (categories[type] || []).find(
      (cat) => String(cat.id) === String(category)
    )
    if (!selectedCategory) {
      toast.error("Please select a valid category.")
      setLoading(false)
      return
    }
  
    const payload = {
      date,
      amount: amountVal,
      description: description || "",
      category_id: selectedCategory.id,
      is_income: type === "income",
      manual_entry: true,
    }
  
    try {
      const res = await axios.patch(`http://127.0.0.1:5000/finances/transactions/${transaction.id}`, payload)
      toast.success("Transaction edited!")
      setOpen(false)
      if (onEdited) onEdited()
    } catch (err) {
      toast.error("Error editing transaction")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (isOpen) {
        setType(transaction?.isIncome ? "income" : "expense")
        setCategory(transaction?.category?.id ? String(transaction.category.id) : "")
        setAmount(transaction?.amount?.toString() || "")
        setDate(transaction?.date || new Date().toISOString().slice(0, 10))
        setDescription(transaction?.description || "")
      }
    }}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} size="sm" variant="outline" className="h-8 w-8 p-0 shadow-none">
      	  <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">

          {/* Transaction Type */ }
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <RadioGroup
                className="col-span-3 flex gap-6"
                value={type}
                onValueChange={(value) => {
                setType(value)
                setCategory("") // reset category when type changes
                }}>
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="income" id="income" className="shadow-none border-lg"/>
                  <Label htmlFor="income">Income</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expense" id="expense" className="shadow-none border-lg"/>
                  <Label htmlFor="expense">Expense</Label>
                </div>
              </RadioGroup>
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
                  <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
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
          <Button onClick={handleEditTransaction} disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Save'}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default FinancesEditModal