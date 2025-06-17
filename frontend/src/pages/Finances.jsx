import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import FinancesSummary from '@/components/FinancesSummary'

const finances = [
  {
    summary: {
      totalRevenue: 18650.00,
      totalExpenses: 11234.75,
      netProfit: 7415.25,
      profitMargin: 0.3975
    },
    recentTransactions: [
      {
        type: "sale",
        amount: 75.00,
        description: "Order #1034",
        date: "2025-06-14"
      },
      {
        type: "expense",
        amount: 120.50,
        description: "Food Supplier - Vegetables",
        date: "2025-06-13"
      },
      {
        type: "sale",
        amount: 60.00,
        description: "Order #1033",
        date: "2025-06-13"
      }
    ],
    expenseCategories: [
      {
        category: "Labor",
        amount: 3980.00
      },
      {
        category: "Ingredients",
        amount: 5230.75
      },
      {
        category: "Utilities",
        amount: 735.25
      },
      {
        category: "Maintenance",
        amount: 1288.75
      }
    ],
    revenueByCategory: [
      {
        category: "Entrees",
        amount: 8700.00
      },
      {
        category: "Drinks",
        amount: 4200.50
      },
      {
        category: "Desserts",
        amount: 1750.25
      },
      {
        category: "Appetizers",
        amount: 4499.25
      }
    ]
  }
]

const Finances = () => {
  return (
    <div>
      <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 px-4 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finances</h1>
            <p className="text-muted-foreground">Revenue, expenses, and financial performance at a glance</p>
          </div>
          <Link to ={'/add-transaction'}>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Transaction
            </Button>
          </Link>
        </div>
        <div className="px-4 space-y-6">
          {finances.map(({ summary }, index) => (
              finances.length > 0 && (<FinancesSummary key={index} summary={summary} />)
            ))}
        </div>
      </div>
    </div>
  )
}

export default Finances