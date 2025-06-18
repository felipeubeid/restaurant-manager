import React from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartLine, Wallet, HandPlatter, Package2, TriangleAlert} from 'lucide-react'
import StatsCard from '@/components/StatsCard'
import InventoryStatsCard from '@/components/InventoryStatsCard'
import StaffTable from '@/components/StaffTable'

const homeStats = {
  statsData: [
    {
      title: "Revenue Today",
      value: 845.75,
      percentage: 12.3,
      subtitle: "from yesterday",
      icon: ChartLine,
      textColor: "text-green-600",
      symbol: '$'
    },
    {
      title: "Expenses Today",
      value: 348.85,
      percentage: -2.1,
      subtitle: "from yesterday",
      icon: Wallet,
      textColor: "text-red-600",
      symbol: '$'
    },
    {
      title: "Orders Today",
      value: 34,
      percentage: 5.6,
      subtitle: "from yesterday",
      icon: HandPlatter
    }
  ],
  inventoryStats: [
    {
      title: "Total Inventory Items",
      value: 152,
      percentage: 86,
      subtitle: "of maximum capacity",
      icon: Package2
    },
    {
      title: "Low Stock Items",
      value: 12,
      percentage: 7.9,
      subtitle: "of items are low on stock",
      icon: TriangleAlert,
      textColor: "text-red-600"
    }
  ],
  todaysStaff: [
    {
      name: "Alice Johnson",
      role: "Server",
      hours: "10am-6pm"
    },
    {
      name: "Jenna Lee",
      role: "Host",
      hours: "4pm-9pm"
    },
    {
      name: "Marcus Smith",
      role: "Dishwasher",
      hours: "5pm-11pm"
    },
    {
      name: "Emily Brown",
      role: "Manager",
      hours: "9am-5pm"
    }
  ]
}

const HomePage = () => {
  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Home</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your restaurant</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {homeStats.statsData.map((stat, index) => (
          // ... passes all properties of stat as props to StatsCard
            <StatsCard key={index} {...stat} />
            ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {homeStats.inventoryStats.map((stat, index) => (
            <InventoryStatsCard key={index} {...stat} />
            ))}
        </div>
        <div>
          <StaffTable staff={homeStats.todaysStaff} />
        </div>
      </div>
    </div>
  )
}

export default HomePage