import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'

const MenuItem = ({ items }) => {
  return (
    <div className="grid gap-6">
        {items.map((item, index) => (
            <Card key={index} className="hover:bg-muted/30 transition-all shadow-none">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4">
                    <div>
                        <CardTitle className="flex items-center gap-3 font-semibold">
                            {item.name}
                            <Badge className={item.available ? 
                            "!bg-green-100 !text-green-600 shadow-none" :
                            "!bg-red-100 !text-red-600 shadow-none"}>
                            {item.available ? "Available" : "Unavailable"}
                            </Badge>
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500 mt-1">
                        {item.description}
                        </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
                        <div className="text-lg font-semibold">${item.price}</div>
                        <div className="flex gap-2">
                            <Link to={`/edit-menu-item/${item.id}`}>
                                <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 w-8 p-0 shadow-none">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button 
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive 
                            hover:bg-destructive/10 shadow-none">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        ))}
    </div>
  )
}

export default MenuItem
