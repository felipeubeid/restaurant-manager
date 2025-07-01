import React, { useState, useEffect } from 'react'
import StaffMember from '@/components/StaffMember'
import StaffAddModal from '@/components/modals/StaffAddModal'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

const Staff = () => {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchStaff = async () => {
    setLoading(true)
    try {
      const staffRes = await axios.get("http://127.0.0.1:5000/staff");
      setStaff(staffRes.data.staff || [])
    } catch (error) {
      toast.error("Failed to load staff.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStaff()
  }, [])
  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">

          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
            <p className="text-muted-foreground">Track staff activity and performance</p>
          </div>
          <StaffAddModal staff={staff} onAdded={fetchStaff}/>
        </div>
        { loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {staff.map((staffMember) => (
                staff.length > 0 && (<StaffMember key={staffMember.id} staffMember={staffMember} 
                  fetchStaffMember={fetchStaff} />)
              ))}
            </div>
          </div>
        )}
      </div>
  )
}

export default Staff
