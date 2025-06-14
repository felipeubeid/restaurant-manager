import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'


const OrderCard = ({order}) => {
  return (
    <Card key={order.index} className="shadow-none hover:bg-muted/30 transition-all">
        <CardHeader className>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">#{order.id}</CardTitle>
                    <Badge variant="outline" className="shadow-none">
                        {order.isTakeout ? "Takeout" : "Dine-in"}
                    </Badge>
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />{order.date}
                        </div>
                        <Badge className= {order.completed ? "!bg-green-100 !text-green-600 shadow-none" : "!bg-red-100 !text-red-600 shadow-none"}>
                                {order.completed ? "Completed" : "Cancelled"}
                        </Badge>
                    </div>
                </div>
            </div>
            <CardDescription>Server: {order.server}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
                <div className="space-y-2">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                            <div>
                                <span className="text-gray-500">{item.quantity}x</span>
                                <span className="font-medium ml-2">{item.name}</span>
                            </div>
                            <span className="font-medium">${item.price}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                    <div className="font-semibold">Total: ${order.total}</div>
                    <div className="flex gap-2">
                        <Link to={'/edit-menu-item/${item.id}'}>
                            <Button size="sm" variant="outline" 
                            className="h-8 w-8 p-0 shadow-none">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button size="sm" variant="outline" 
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 shadow-none">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default OrderCard
