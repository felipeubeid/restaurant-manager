import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import StaffEditModal from './modals/StaffEditModal'

const statusColors = {
    Active: "!bg-green-100 !text-green-600",
    Off: "!bg-red-100 !text-red-600"
  }

const StaffMember = ({emp}) => {
    const statusClass = statusColors[emp.status] || ""

    return (
        <Card key={emp.index} className="shadow-none hover:bg-muted/30 transition-all">
            <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <CardTitle className="text-gray-500">{emp.name}</CardTitle>
                        <div className="flex gap-2 mt-2">
                            <Badge className={`${statusClass} shadow-none`}>
                                {emp.status}
                            </Badge>
                            <Badge variant="outline" className="shadow-none">
                                {emp.role}
                            </Badge>
                        </div>  
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="text-sm">
                    <span className="text-gray-500">Schedule: </span>
                    <span className="font-medium">{emp.schedule}</span>
                </div>
                <div className="text-sm">
                    <span className="text-gray-500">Contact: </span>
                    <span className="font-medium">{emp.contact}</span>
                </div>
                {/* <div className="grid grid-cols-3 gap-2 pt-2"> */}
                <div className="flex gap-3 justify-between pt-2">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                            <Clock className="h-3 w-3" />Hours
                        </div>
                        <div className="font-semibold">{emp.hours}</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                            <Coins className="h-3 w-3" />Wage
                        </div>
                        <div className="font-semibold">{`$${emp.wage}`}</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                            <DollarSign className="h-3 w-3" />Today
                        </div>
                        <div className="font-semibold">{`$${emp.earnings}`}</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <StaffEditModal emp={emp} />
                    <Button size="sm" variant="outline" 
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 shadow-none">
                            <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
  )
}

export default StaffMember


