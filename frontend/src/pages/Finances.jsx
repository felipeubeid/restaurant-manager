import React, {useState, useEffect} from 'react'
import FinancesSummary from '@/components/FinancesSummary'
import RecentTransactions from '@/components/RecentTransactions'
import ExpenseCategories from '@/components/ExpenseCategories'
import RevenueCategories from '@/components/RevenueCategories'
import FinancesAddModal from '@/components/modals/FinancesAddModal'
import { Loader2 } from 'lucide-react'
import axios from 'axios'

const Finances = () => {
  const [summary, setSummary] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [expenseCategories, setExpenseCategories] = useState([])
  const [revenueByCategory, setRevenueByCategory] = useState([])
  const [categories, setCategories] = useState({ income: [], expense: [] })
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)  // start loading
    try {
      // Promise.all to fetch data in parallel
      // axios makes it easier to send HTTP requests
      // parses JSON responses automatically, handles errors, etc
      const [ summaryRes, transactionsRes, expenseCatRes, revenueCatRes, categoriesRes] 
      = await Promise.all([
        axios.get('http://127.0.0.1:5000/finances/summary'),
        axios.get('http://127.0.0.1:5000/finances/transactions'),
        axios.get('http://127.0.0.1:5000/finances/expense-by-category'),
        axios.get('http://127.0.0.1:5000/finances/revenue-by-category'),
        axios.get('http://127.0.0.1:5000/finances/categories'),
      ])

      setSummary(summaryRes.data)
      setRecentTransactions(transactionsRes.data.transactions)
      setExpenseCategories(expenseCatRes.data.expenses)
      setRevenueByCategory(revenueCatRes.data.revenue)
      setCategories({
        income: categoriesRes.data.incomeCategories,
        expense: categoriesRes.data.expenseCategories,
      })
    } catch (error) {
      toast.error("Error.")
    } finally {
      setLoading(false)  // done loading
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finances</h1>
            <p className="text-muted-foreground">Revenue, expenses, and financial performance at a glance</p>
          </div>
          <FinancesAddModal categoriesList={categories} onAdded={fetchData}/>
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
            categories={categories} fetchData={fetchData} />)}
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