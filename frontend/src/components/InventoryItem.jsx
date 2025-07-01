import React from 'react'
import { TableCell, TableRow} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import InventoryEditModal from './modals/InventoryEditModal'
import DeleteModal from './modals/DeleteModal'
import axios from 'axios'

const InventoryItem = ({item, fetchInventory}) => {

  const deleteInventoryItem = async (id) => {
    try {
        await axios.delete(`http://127.0.0.1:5000/inventory/${id}`)
    } catch (error) {
        throw new Error('Delete failed')
    }
  }

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
                <InventoryEditModal item={item} onEdited={fetchInventory}/>
                <DeleteModal title="Inventory Item" onDeleted={fetchInventory} 
                deleteId={item.id} deleteFunction={deleteInventoryItem}/>
            </div>
      </TableCell>
    </TableRow>
  )
}

export default InventoryItem
