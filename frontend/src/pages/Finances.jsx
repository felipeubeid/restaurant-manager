import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import FinancesSummary from '@/components/FinancesSummary'
import RecentTransactions from '@/components/RecentTransactions'
import ExpenseCategories from '@/components/ExpenseCategories'
import RevenueCategories from '@/components/RevenueCategories'
import FinancesAddModal from '@/components/modals/FinancesAddModal'

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
        category: "Sale",
        income: true,
        amount: 75.00,
        description: "Order #1034",
        date: "2025-06-14",
        manualEntry: true
      },
      {
        category: "Inventory",
        income: false,
        amount: 120.50,
        description: "Food Supplier - Vegetables",
        date: "2025-06-12",
        manualEntry: false
      },
      {
        category: "Sale",
        income: true,
        amount: 60.00,
        description: "Order #1033",
        date: "2025-06-11",
        manualEntry: false
      },
      {
        category: "Sale",
        income: true,
        amount: 26.00,
        description: "Order #1035",
        date: "2025-06-14",
        manualEntry: true
      },
      {
        category: "Sale",
        income: true,
        amount: 34.00,
        description: "Order #1036",
        date: "2025-06-16",
        manualEntry: true
      },
      {
        category: "Utilities",
        income: false,
        amount: 320.70,
        description: "Electric Bill",
        date: "2025-06-12",
        manualEntry: false
      },
      {
        category: "Payroll",
        income: false,
        amount: 210,
        description: "Alice Johnson Payroll",
        date: "2025-06-11",
        manualEntry: false,
      },
      {
        category: "Sale",
        income: true,
        amount: 12.00,
        description: "Order #1037",
        date: "2025-06-15",
        manualEntry: true,
      },
      {
        category: "Utilities",
        income: false,
        amount: 53.00,
        description: "Order #1038",
        date: "2025-06-16",
        manualEntry: true,
      },
      {
        category: "Sale",
        income: true,
        amount: 18.00,
        description: "Order #1039",
        date: "2025-06-13",
        manualEntry: false
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
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finances</h1>
            <p className="text-muted-foreground">Revenue, expenses, and financial performance at a glance</p>
          </div>
          <FinancesAddModal />
        </div>
        <div className="space-y-6">
          {finances.map(({ summary, recentTransactions, expenseCategories, revenueByCategory }, index) => (
            // Can't return two components directly from map
            // Need to wrap them in a React.Fragment 
            <React.Fragment key={index}>
              {summary && Object.keys(summary).length > 0 && (
                <FinancesSummary summary={summary} />
              )}
              {recentTransactions && recentTransactions.length > 0 && (
                <RecentTransactions transactions={recentTransactions} />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentTransactions && recentTransactions.length > 0 && (
                  <ExpenseCategories expenses={expenseCategories} />
                )}
                {recentTransactions && recentTransactions.length > 0 && (
                  <RevenueCategories revenues={revenueByCategory} />
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
    </div>
  )
}

export default Finances