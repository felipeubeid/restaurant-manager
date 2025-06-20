import React from 'react'
import StaffMember from '@/components/StaffMember'
import StaffAddModal from '@/components/modals/StaffAddModal'

const staff = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Server",
    status: "Active",
    schedule: "Mon-Fri, 10am-6pm",
    wage: 15.50,
    earnings: 62.00,
    contact: "alice@example.com",
    hours: 4,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    shift: {
      start: "10:00",
      end: "18:00"
    }
  },
  {
    id: 2,
    name: "Carlos Ramirez",
    role: "Cook",
    status: "Active",
    schedule: "Wed-Sun, 2pm-10pm",
    wage: 17.25,
    earnings: 51.75,
    contact: "carlos@example.com",
    hours: 3,
    days: ["Wed", "Thu", "Fri", "Sat", "Sun"],
    shift: {
      start: "14:00",
      end: "22:00"
    }
  },
  {
    id: 3,
    name: "Jenna Lee",
    role: "Host",
    status: "Off",
    schedule: "Tue-Sat, 4pm-9pm",
    wage: 14.00,
    earnings: 70.00,
    contact: "jenna@example.com",
    hours_worked: 0,
    hours: 5,
    days: ["Tue", "Wed", "Thu", "Fri", "Sat"],
    shift: {
      start: "16:00",
      end: "21:00"
    }
  },
  {
    id: 4,
    name: "Marcus Smith",
    role: "Dishwasher",
    status: "Active",
    schedule: "Mon-Fri, 5pm-11pm",
    wage: 13.00,
    earnings: 104.00,
    contact: "marcus@example.com",
    hours: 8,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    shift: {
      start: "17:00",
      end: "23:00"
    }
  },
  {
    id: 5,
    name: "Emily Brown",
    role: "Manager",
    status: "Active",
    schedule: "Mon-Fri, 9am-5pm",
    wage: 22.50,
    earnings: 135.00,
    contact: "emily@example.com",
    hours: 6,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    shift: {
      start: "09:00",
      end: "17:00"
    }
  }
];

const Staff = () => {
  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">

          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
            <p className="text-muted-foreground">Track staff activity and performance</p>
          </div>
          <StaffAddModal />
        </div>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {staff.map((emp) => (
              staff.length > 0 && (<StaffMember key={emp.id} emp={emp} />)
            ))}
          </div>
        </div>
      </div>
  )
}

export default Staff
