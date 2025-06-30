import React, {useState, useEffect} from 'react'
import FinancesSummary from '@/components/FinancesSummary'
import RecentTransactions from '@/components/RecentTransactions'
import ExpenseCategories from '@/components/ExpenseCategories'
import RevenueCategories from '@/components/RevenueCategories'
import FinancesAddModal from '@/components/modals/FinancesAddModal'
import { Loader2 } from 'lucide-react'

const Finances = () => {
  const [summary, setSummary] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [expenseCategories, setExpenseCategories] = useState([])
  const [revenueByCategory, setRevenueByCategory] = useState([])
  const [categories, setCategories] = useState({ income: [], expense: [] })
  const [loading, setLoading] = useState(false)

  const refreshData = async () => {
    setLoading(true)  // start loading
    try {
      // Promise.all to fetch data in parallel
      const [ summaryRes, transactionsRes, expenseCatRes, revenueCatRes, categoriesRes] 
      = await Promise.all([
        fetch('http://127.0.0.1:5000/finances/summary'),
        fetch('http://127.0.0.1:5000/finances/transactions'),
        fetch('http://127.0.0.1:5000/finances/expense-by-category'),
        fetch('http://127.0.0.1:5000/finances/revenue-by-category'),
        fetch('http://127.0.0.1:5000/finances/categories')
      ])

      if (!summaryRes.ok) throw new Error("Failed to fetch summary")
      if (!transactionsRes.ok) throw new Error("Failed to fetch transactions")
      if (!expenseCatRes.ok) throw new Error("Failed to fetch expense categories")
      if (!revenueCatRes.ok) throw new Error("Failed to fetch revenue categories")
      if (!categoriesRes.ok) throw new Error("Failed to fetch categories")

      const summaryData = await summaryRes.json()
      const transactionsData = await transactionsRes.json()
      const expenseCatData = await expenseCatRes.json()
      const revenueCatData = await revenueCatRes.json()
      const categoriesData = await categoriesRes.json()

      setSummary(summaryData)
      setRecentTransactions(transactionsData.transactions)
      setExpenseCategories(expenseCatData.expenses)
      setRevenueByCategory(revenueCatData.revenue)
      setCategories({
        income: categoriesData.incomeCategories,
        expense: categoriesData.expenseCategories,
      })
    } catch (error) {
      toast.error("Error.")
    } finally {
      setLoading(false)  // done loading
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finances</h1>
            <p className="text-muted-foreground">Revenue, expenses, and financial performance at a glance</p>
          </div>
          <FinancesAddModal categoriesList={categories} onAdded={refreshData}/>
        </div>
        { loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <div className="space-y-6">
            {summary && Object.keys(summary).length > 0 && (
            <FinancesSummary summary={summary} />)}
            {recentTransactions && recentTransactions.length > 0 && (
            <RecentTransactions transactions={recentTransactions} 
            categories={categories} refreshData={refreshData} />)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expenseCategories && expenseCategories.length > 0 && (
              <ExpenseCategories expenses={expenseCategories} />)}
              {revenueByCategory && revenueByCategory.length > 0 && (
              <RevenueCategories revenues={revenueByCategory} />)}
            </div>
          </div>
        )}
    </div>
  )
}

export default Finances