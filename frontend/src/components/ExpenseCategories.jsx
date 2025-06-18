import React from 'react'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'

const ExpenseCategories = ({expenses}) => {
  return (
    <Card className="shadow-none">
        <CardHeader>
            <CardTitle className="text-lg font-large">Expense Categories</CardTitle>
            <CardDescription className="text-sm text-gray-500">Breakdown of expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {expenses.map(({ category, amount }, index) => (
                <div key={index} className="flex justify-between items-center">
                    <span className="">{category}</span>
                    <span className="text-red-600 break-words font-medium">-${amount.toFixed(2)}</span>
                </div>
                ))}
            </div>
        </CardContent>
    </Card>
    )
}

export default ExpenseCategories
