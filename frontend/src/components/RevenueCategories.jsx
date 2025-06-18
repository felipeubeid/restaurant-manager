import React from 'react'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'

const RevenueCategories = ({revenues}) => {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle className="text-lg font-large">Revenue Categories</CardTitle>
                <CardDescription className="text-sm text-gray-500">Breakdown of revenue by category</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {revenues.map(({ category, amount }, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="">{category}</span>
                        <span className="text-green-600 break-words font-medium">+${amount.toFixed(2)}</span>
                    </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default RevenueCategories
