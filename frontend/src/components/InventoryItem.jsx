import React from 'react'
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const InventoryItem = ({item}) => {
  return (
    <Card className="shadow-none hover:bg-muted/30 transition-all">
        <div className="grid gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 ">                        
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge className= {item.inStock ? "!bg-green-100 !text-green-600 shadow-none" : "!bg-red-100 !text-red-600 shadow-none"}>
                                {item.inStock ? "In Stock" : "Low Stock"}
                        </Badge>
                    </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm mt-1">
                            <div className="text-sm">
                                <span className=" text-gray-500">Quantity: </span>
                                <span className="font-medium">{item.quantity} {item.unit}</span>
                            </div>
                            <div className="text-sm">
                                <span className=" text-gray-500">Min quantity: </span>
                                <span className="font-medium">{item.minQuantity} {item.unit}</span>
                            </div>
                            <div className="text-sm">
                                <span className=" text-gray-500">Cost per unit: </span>
                                <span className="font-medium">${item.costPerUnit}/{item.unit}</span>
                            </div>
                            <div className="text-sm">
                                <span className=" text-gray-500">Total cost: </span>
                                <span className="font-medium">${item.totalCost}</span>
                            </div>
                        </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
                    {/* <div className="text-lg font-semibold">${item.price}</div> */}
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
        </div>
    </Card>
  )
}

export default InventoryItem
