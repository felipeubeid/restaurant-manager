import React from 'react'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'
import { Table, TableCell, TableHeader, TableRow, TableHead, TableBody} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import FinancesEditModal from '@/components/modals/FinancesEditModal'
import DeleteModal from './modals/DeleteModal'

const RecentTransactions = ({transactions, categories, refreshData}) => {
    const [showAll, setShowAll] = useState(false)
  	const visibleTransactions = showAll ? transactions : transactions.slice(0, 6)

    const deleteTransaction = async (id) => {
      const res = await fetch(`http://127.0.0.1:5000/finances/transactions/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Delete failed')
    }

  	return (
    <Card className="shadow-none">
        <CardHeader>
            <CardTitle className="text-lg font-large">Recent Transactions</CardTitle>
            <CardDescription className="text-sm text-gray-500">Latest financial transactions and activities</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className="text-center">
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {visibleTransactions.map((transaction, index) => (
                        <TableRow key={index} className="h-12 shadow-none hover:bg-muted/30 transition-all border-none">
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell className="font-medium">{transaction.description}</TableCell>
                            <TableCell className="capitalize">{transaction.category.name}</TableCell>
							<TableCell className={transaction.isIncome ? 
							"text-green-600 break-words font-medium" :
							"text-red-600 break-words font-medium"}>
								{transaction.isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
							</TableCell>
                            <TableCell className="text-center">
                                {transaction.manualEntry ? (
                                <div className="flex justify-center gap-2">
                                    <FinancesEditModal categoriesList={categories} onEdited={refreshData} transaction={transaction}/>
                                    <DeleteModal title="Transaction" onDeleted={refreshData} 
                                    deleteId={transaction.id} deleteFunction={deleteTransaction}/>
                                </div>
                                ) : (
                                <span className="text-gray-300 text-sm">-</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
			{transactions.length > 5 && (
			<div className="flex justify-center mt-4">
				<Button
				variant="outline"
				className="text-primary shadow-none"
				onClick={() => setShowAll(!showAll)}>
				{showAll ? 'Show Less' : 'Show More'}
				</Button>
			</div>
			)}
        </CardContent>
    </Card>
	)
}

export default RecentTransactions
