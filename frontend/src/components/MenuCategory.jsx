import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MenuItem from './MenuItem'

const MenuCategory = ({category, items, fetchMenu, categories}) => {
  return (
    <div className="space-y-6">
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle className="text-xl">{category}</CardTitle>
            </CardHeader>
            <CardContent>
                <MenuItem items={items} fetchMenu={fetchMenu} categories={categories}></MenuItem>
            </CardContent>
        </Card>
    </div>
  )
}

export default MenuCategory
