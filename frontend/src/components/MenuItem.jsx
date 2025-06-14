import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const MenuItem = ({items}) => {
  return (
    <div className="grid gap-4">
        {items.map((item, index) => ( 
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-border rounded-lg 
            hover:bg-muted/30 transition-all">                        
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge className= {item.available ? "!bg-green-100 !text-green-600 shadow-none" : "!bg-red-100 !text-red-600 shadow-none"}>
                            {item.available ? "Available" : "Unavailable"}
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
                    <div className="text-lg font-semibold">${item.price}</div>
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
        ))}
    </div>
  )
}

export default MenuItem
