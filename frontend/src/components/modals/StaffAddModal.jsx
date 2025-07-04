import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Plus, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const StaffAddModal = ({staff, onAdded}) => {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [wage, setWage] = useState("")
  const [contact, setContact] = useState("")
  const [days, setDays] = useState([])
  const [shiftStart, setShiftStart] = useState("")
  const [shiftEnd, setShiftEnd] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAddStaff = async () => {
    setLoading(true)
    const wageVal = parseFloat(wage) || 0
    // Validate
    if (!name || !role || !wage || isNaN(wageVal) || wageVal < 0 
    || !contact || !days || !shiftEnd || !shiftStart) {
      toast.error("Please fill in name, role, contact, schedule and a valid wage.")
      setLoading(false)
      return 
    }
  
    const payload = {
      name,
      role,
      wage: wageVal,
      contact,
      days,
      shift_start: shiftStart,
      shift_end: shiftEnd
    }
  
    try {
      const res = await axios.post("http://127.0.0.1:5000/staff", payload)
      if (onAdded) onAdded()

      setName("")
      setRole("")
      setWage("")
      setContact("")
      setDays([])
      setShiftStart("")
      setShiftEnd("")
      
      setOpen(false)
      toast.success("Staff member added!")
    } catch (err) {
      toast.error("Error adding staff member")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) {
        setName("")
        setRole("")
        setWage("")
        setContact("")
        setDays([])
        setShiftStart("")
        setShiftEnd("")
      }}}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Staff Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <div className="relative col-span-3">
              <Input
                id="name"
                className="shadow-none"
                placeholder ="Staff member name"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>
          </div>

          {/* Role */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">Role</Label>
            <div className="relative col-span-3">
              <Input
                id="role"
                className="shadow-none"
                placeholder ="Staff member role"
                value={role}
                onChange={(e) => setRole(e.target.value)}/>
            </div>
          </div>

          {/* Wage */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wage" className="text-right">Wage</Label>
              <div className="relative col-span-3">
                <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500 pointer-events-none">
                  $ </span>
                <Input
                  id="wage"
                  className="pl-7 shadow-none"
                  type="number"
                  inputMode="decimal"
                  placeholder ="0.00"
                  value={wage}
                  onChange={(e) => setWage(e.target.value)}/>
                  <span className="absolute inset-y-0 right-10 flex items-center text-sm text-gray-500 pointer-events-none">
                  /hr </span>
              </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contact" className="text-right">Contact</Label>
            <div className="relative col-span-3">
              <Input
                id="contact"
                className="shadow-none"
                placeholder ="Email or phone number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}/>
            </div>
          </div>
            
          {/* Days */}
          <div className="grid items-center gap-4">
            <Label htmlFor="days" className="text-center">Schedule</Label>
            <ToggleGroup
            type="multiple"
            value={days}
            onValueChange={setDays}
            className="flex flex-wrap justify-center gap-2 text-gray-500">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <ToggleGroupItem
                key={day}
                value={day}
                aria-label={day}
                className="px-3">
                  {day}</ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          
          {/* Shift Start */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shiftStart" className="text-right text-sm text-gray-500">
              Shift Start</Label>
            <div className="relative col-span-3">
              <Input
                id="shiftStart"
                className="shadow-none"
                type="time"
                value={shiftStart}
                onChange={(e) => setShiftStart(e.target.value)}/>
            </div>
          </div>

          {/* Shift End */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shiftEnd" className="text-right text-sm text-gray-500">
              Shift End</Label>
            <div className="relative col-span-3">
              <Input
                id="shiftEnd"
                className="shadow-none"
                type="time"
                value={shiftEnd}
                onChange={(e) => setShiftEnd(e.target.value)}/>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleAddStaff} disabled={loading}>
            <Plus className="h-4 w-4" />
            {loading ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Add'}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default StaffAddModal
