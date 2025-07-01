import React, {useState, useEffect} from 'react'
import { ChartLine, Wallet, HandPlatter, Package2, TriangleAlert} from 'lucide-react'
import StatsCard from '@/components/StatsCard'
import InventoryStatsCard from '@/components/InventoryStatsCard'
import StaffTable from '@/components/StaffTable'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

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

function setFinancesOrdersCards(financesData, ordersData) {
  return [
    {
      title: "Revenue Today",
      value: financesData.revenueToday,
      percentage: financesData.revenuePercentChange,
      subtitle: "from yesterday",
      symbol: '$',
      icon: ChartLine,
      textColor: "text-green-600"
    },
    {
      title: "Expenses Today",
      value: financesData.expensesToday,
      percentage: financesData.expensesPercentChange,
      subtitle: "from yesterday",
      symbol: '$',
      icon: Wallet,
      textColor: "text-red-600"
    },
    {
      title: "Orders Today",
      value: ordersData.ordersToday,
      percentage: ordersData.ordersPercentChange,
      subtitle: "from yesterday",
      icon: HandPlatter
    }
  ]
}

function setInventoryCards(inventoryData) {
  return [
    {
      title: "Total Inventory Items",
      value: inventoryData.totalInventoryItems,
      icon: Package2
    },
    {
      title: "Low Stock Items",
      value: inventoryData.lowStockItems,
      icon: TriangleAlert,
      textColor: "text-red-600"
    }
  ]
}


const HomePage = () => {
  const [financesOrdersSummary, setFinancesOrdersSummary] = useState([])
  const [inventorySummary, setInventorySummary] = useState([])
  const [staffSummary, setStaffSummary] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const [ financesStatsRes, ordersStatsRes, inventoryStatsRes, staffStatsRes ] 
      = await Promise.all([
        axios.get('http://127.0.0.1:5000/stats/finances'),
        axios.get('http://127.0.0.1:5000/stats/orders'),
        axios.get('http://127.0.0.1:5000/stats/inventory'),
        axios.get('http://127.0.0.1:5000/stats/staff'),
      ])

      const financesData = financesStatsRes.data || {}
      const ordersData = ordersStatsRes.data || {}
      setFinancesOrdersSummary(setFinancesOrdersCards(financesData, ordersData))

      const inventoryData = inventoryStatsRes.data || {}
      setInventorySummary(setInventoryCards(inventoryData))

      setStaffSummary(staffStatsRes.data.todaysStaff || [])
    } catch (error) {
      toast.error("Failed to load home page.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Home</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your restaurant</p>
        </div>
      </div>
      { loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {financesOrdersSummary.map((stat, index) => (
              // ... passes all properties of stat as props to StatsCard
                <StatsCard key={index} {...stat} />
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {inventorySummary.map((stat, index) => (
                <InventoryStatsCard key={index} {...stat} />
                ))}
            </div>
            <div>
              <StaffTable staff={staffSummary} />
            </div>
          </div>
        )}
    </div>
  )
}

export default HomePage