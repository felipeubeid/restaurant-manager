import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Edit } from 'lucide-react'

const StaffEditModal = ({emp}) => {
  const [name, setName] = useState(emp?.name || "")
  const [role, setRole] = useState(emp?.role || "")
  const [wage, setWage] = useState(emp?.wage?.toString() || "")
  const [contact, setContact] = useState(emp?.contact || "")
  const [hours, setHours] = useState(emp?.hours?.toString() || "")
  const [days, setDays] = useState(emp?.days || [])
  const [shiftStart, setShiftStart] = useState(emp?.shift?.start || "")
  const [shiftEnd, setShiftEnd] = useState(emp?.shift?.end || "")
  const [available, setAvailable] = useState(emp?.status === "Active")

  return (
    <Dialog onOpenChange={(isOpen) => {
    if (!isOpen) {
      setName(emp?.name || "")
      setRole(emp?.role || "")
      setWage(emp?.wage?.toString() || "")
      setContact(emp?.contact || "")
      setHours(emp?.hours?.toString() || "")
      setDays(emp?.days || [])
      setShiftStart(emp?.shift?.start || "")
      setShiftEnd(emp?.shift?.end || "")
      setAvailable(emp?.status === "Active")
    }}}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 shadow-none">
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

        {/* Availability and Hours */}
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
        </div>

        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default StaffEditModal
