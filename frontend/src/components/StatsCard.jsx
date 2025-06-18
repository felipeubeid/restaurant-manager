import React from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { ArrowUp, ArrowDown} from 'lucide-react'

const StatsCard = ({ title, value, percentage, subtitle, icon: Icon, textColor, symbol }) => {
  return (
    <Card className="shadow-none flex flex-col items-center text-center">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
                <CardTitle className="text-md font-medium">{title}</CardTitle>
                {Icon && <Icon className="h-4 w-4" />}
            </div>
        </CardHeader>
        <CardContent>
            <div className={`text-2xl font-bold pb-2 break-words ${textColor}`}>{symbol}{value}</div>
            <p className="text-xs">
                {percentage >= 0 ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                {percentage >= 0 ? ' +' : ' '}{percentage}% {subtitle}
            </p>
          </CardContent>
      </Card>
  )
}

export default StatsCard
