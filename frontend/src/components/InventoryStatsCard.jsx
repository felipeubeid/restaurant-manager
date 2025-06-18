import React from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'

const InventoryStatsCard = ({ title, value, percentage, subtitle, icon: Icon, textColor }) => {
    return (
        <Card className="shadow-none flex flex-col items-center text-center">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                    <CardTitle className="text-md font-medium">{title}</CardTitle>
                    {Icon && <Icon className="h-4 w-4" />}
                </div>
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold pb-2 break-words ${textColor}`}>{value}</div>
                <p className="text-xs">{percentage}% {subtitle}</p>
              </CardContent>
          </Card>
    )
}

export default InventoryStatsCard
