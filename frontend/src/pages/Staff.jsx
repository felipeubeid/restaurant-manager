import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import StaffMember from '@/components/StaffMember';

const staff = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Server",
    status: "Active",
    shift: "Mon-Fri, 10am-6pm",
    wage: 15.50,
    earnings: 620.00,
    contact: "alice@example.com",
    hours: 4
  },
  {
    id: 2,
    name: "Carlos Ramirez",
    role: "Cook",
    status: "Active",
    shift: "Wed-Sun, 2pm-10pm",
    wage: 17.25,
    earnings: 690.00,
    contact: "carlos@example.com",
    hours: 3,
  },
  {
    id: 3,
    name: "Jenna Lee",
    role: "Host",
    status: "Off",
    shift: "Tue-Sat, 4pm-9pm",
    wage: 14.00,
    earnings: 0.00,
    contact: "jenna@example.com",
    hours_worked: 0,
    hours: 5
  },
  {
    id: 4,
    name: "Marcus Smith",
    role: "Dishwasher",
    status: "Active",
    shift: "Mon-Fri, 5pm-11pm",
    wage: 13.00,
    earnings: 520.00,
    contact: "marcus@example.com",
    hours: 8
  },
  {
    id: 5,
    name: "Emily Brown",
    role: "Manager",
    status: "Active",
    shift: "Mon-Fri, 9am-5pm",
    wage: 22.50,
    earnings: 1125.00,
    contact: "emily@example.com",
    hours: 6
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
          <Link to ={'/add-staff-member'}>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Staff Member
            </Button>
          </Link>
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
