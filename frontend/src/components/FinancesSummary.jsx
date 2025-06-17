import React from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { ChartLine, Wallet, ReceiptText, ChartPie } from 'lucide-react'

const FinancesSummary = ({summary}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="shadow-none flex flex-col items-center text-center">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
                <CardTitle className="text-md font-medium">Total Revenue</CardTitle>
                <ChartLine className="h-4 w-4" />
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold text-green-600 pb-2 break-words">${summary.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
      </Card>

      <Card className="shadow-none flex flex-col items-center text-center">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
                <CardTitle className="text-md font-medium">Total Expenses</CardTitle>
                <Wallet className="h-4 w-4" />
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold text-red-600 pb-2 break-words">${summary.totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
      </Card>

      <Card className="shadow-none flex flex-col items-center text-center">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
                <CardTitle className="text-md font-medium">Net Profit</CardTitle>
                <ReceiptText className="h-4 w-4" />
            </div>
        </CardHeader>
        <CardContent>
            <div className= {
                summary.netProfit >= 0 ? "text-2xl font-bold text-green-600 pb-2 break-words" 
                : "text-2xl font-bold text-red-600 pb-2 break-words"}>
                    ${summary.netProfit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
      </Card>

      <Card className="shadow-none flex flex-col items-center text-center">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
                <CardTitle className="text-md font-medium">Profit Margin</CardTitle>
                <ChartPie className="h-4 w-4" />
            </div>
        </CardHeader>
        <CardContent>
            <div className= {
                summary.profitMargin >= 0 ? "text-2xl font-bold text-green-600 pb-2 break-words" 
                : "text-2xl font-bold text-red-600 pb-2 break-words"}>
                    {summary.profitMargin.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
      </Card>
    </div>
  )
}

export default FinancesSummary
