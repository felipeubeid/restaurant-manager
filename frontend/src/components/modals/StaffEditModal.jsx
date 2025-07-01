import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Edit, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const StaffEditModal = ({staffMember, onEdited}) => {
  const [name, setName] = useState(staffMember?.name || "")
  const [role, setRole] = useState(staffMember?.role || "")
  const [wage, setWage] = useState(staffMember?.wage?.toString() || "")
  const [contact, setContact] = useState(staffMember?.contact || "")
  const [hours, setHours] = useState(staffMember?.hours?.toString() || "")
  const [days, setDays] = useState(staffMember?.days || [])
  const [shiftStart, setShiftStart] = useState(staffMember?.shift?.start || "")
  const [shiftEnd, setShiftEnd] = useState(staffMember?.shift?.end || "")
  const [available, setAvailable] = useState(staffMember?.status?.toLowerCase() === "active")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEditStaff = async () => {
    setLoading(true)
    const wageVal = parseFloat(wage) || 0
    const hoursVal = parseFloat(hours) || 0
    
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
      // hours: hoursVal,
      days,
      shift_start: shiftStart,
      shift_end: shiftEnd,
      // is_active: available
    }
  
    try {
      const res = await axios.patch(`http://127.0.0.1:5000/staff/${staffMember.id}`, payload)
      toast.success("Staff member edited!")
      setOpen(false)
      if (onEdited) onEdited()
    } catch (err) {
      toast.error("Error editing staff member")
    } finally {
      setLoading(false)
    }
  }


  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) {
        setName(staffMember?.name || "")
        setRole(staffMember?.role || "")
        setWage(staffMember?.wage?.toString() || "")
        setContact(staffMember?.contact || "")
        setHours(staffMember?.hours?.toString() || "")
        setDays(staffMember?.days || [])
        setShiftStart(staffMember?.shift?.start || "")
        setShiftEnd(staffMember?.shift?.end || "")
        setAvailable(staffMember?.status?.toLowerCase() === "active")
      }}}>
      <DialogTrigger asChild>
      <Button onClick={() => setOpen(true)} size="sm" variant="outline" className="h-8 w-8 p-0 shadow-none">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Staff Member Info</DialogTitle>
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

        {/* Availability and Hours
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="available" className="text-right">Available</Label>
          <div className="col-span-3 flex items-center gap-4">
            <Checkbox
              id="available"
              className="shadow-none border-lg"
              checked={available}
              onCheckedChange={setAvailable}
            />
            <div className="flex items-center gap-2 ml-4">
              <Label htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                type="number"
                inputMode="decimal"
                className="w-20 shadow-none"
                placeholder="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
          </div>
        </div> */}

        <DialogFooter>
          <Button onClick={handleEditStaff} disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Save'}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default StaffEditModal
