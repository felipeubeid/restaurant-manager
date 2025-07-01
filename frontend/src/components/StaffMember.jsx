import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, Coins } from 'lucide-react'
import StaffEditModal from './modals/StaffEditModal'
import DeleteModal from './modals/DeleteModal'
import axios from 'axios'

const statusColors = {
    Active: "!bg-green-100 !text-green-600",
    Off: "!bg-red-100 !text-red-600"
  }

const StaffMember = ({staffMember, fetchStaffMember}) => {
    const status = staffMember.is_active ? "Active" : "Off"
    const statusClass = statusColors[status] || ""

    const deleteStaffMember = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/staff/${id}`)
        } catch (error) {
            throw new Error('Delete failed')
        }
    }

    return (
        <Card key={staffMember.index} className="shadow-none hover:bg-muted/30 transition-all">
            <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <CardTitle className="text-gray-500">{staffMember.name}</CardTitle>
                        <div className="flex gap-2 mt-2">
                            <Badge className={`${statusClass} shadow-none`}>
                                {status}
                            </Badge>
                            <Badge variant="outline" className="shadow-none">
                                {staffMember.role}
                            </Badge>
                        </div>  
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="text-sm">
                    <span className="text-gray-500">Schedule: </span>
                    <span className="font-medium">{staffMember.schedule}</span>
                </div>
                <div className="text-sm">
                    <span className="text-gray-500">Contact: </span>
                    <span className="font-medium">{staffMember.contact}</span>
                </div>
                {/* <div className="grid grid-cols-3 gap-2 pt-2"> */}
                <div className="flex gap-3 justify-between pt-2">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                            <Clock className="h-3 w-3" />Hours
                        </div>
                        <div className="font-semibold">{staffMember.hours}</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                            <Coins className="h-3 w-3" />Wage
                        </div>
                        <div className="font-semibold">{`$${staffMember.wage}`}</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                            <DollarSign className="h-3 w-3" />Today
                        </div>
                        <div className="font-semibold">{`$${staffMember.earnings}`}</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <StaffEditModal staffMember={staffMember} onEdited={fetchStaffMember} />
                    <DeleteModal title="Staff Member" onDeleted={fetchStaffMember} 
                    deleteId={staffMember.id} deleteFunction={deleteStaffMember}/>
                </div>
            </CardContent>
        </Card>
  )
}

export default StaffMember


