import React from 'react'
import { TableCell, TableRow} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import InventoryEditModal from './modals/InventoryEditModal'

const InventoryItem = ({item}) => {
  return (
    <TableRow className="shadow-none hover:bg-muted/30 transition-all border-none">
        <TableCell className="font-medium">{item.name}</TableCell>
        <TableCell>
            <Badge className= {item.inStock ? "!bg-green-100 !text-green-600 shadow-none" : "!bg-red-100 !text-red-600 shadow-none"}>
                    {item.inStock ? "In Stock" : "Low Stock"}
            </Badge>
        </TableCell>
        <TableCell>{item.quantity} {item.unit}</TableCell>
        <TableCell>{item.minQuantity} {item.unit}</TableCell>
        <TableCell>${item.costPerUnit}/{item.unit}</TableCell>
        <TableCell>${item.totalCost.toFixed(2)}</TableCell>
        <TableCell className="text-center">
            <div className="flex justify-center gap-2">
                <InventoryEditModal item={item} />
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 shadow-none">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
      </TableCell>
    </TableRow>
  )
}

export default InventoryItem
