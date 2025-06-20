import React from 'react'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'
import { Table, TableCell, TableHeader, TableRow, TableHead, TableBody} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import FinancesEditModal from '@/components/modals/FinancesEditModal'

const RecentTransactions = ({transactions}) => {
    const [showAll, setShowAll] = useState(false)
  	const visibleTransactions = showAll ? transactions : transactions.slice(0, 6)
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
                            <TableCell className="capitalize">{transaction.category}</TableCell>
							<TableCell className={transaction.income ? 
							"text-green-600 break-words font-medium" :
							"text-red-600 break-words font-medium"}>
								{transaction.income ? '+' : '-'}${transaction.amount.toFixed(2)}
							</TableCell>
                            <TableCell className="text-center">
                                {transaction.manualEntry ? (
                                <div className="flex justify-center gap-2">
                                    <FinancesEditModal transaction={transaction}/>
                                    <Button size="sm" variant="outline" 
									className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 shadow-none">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
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
