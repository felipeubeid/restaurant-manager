import React from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import InventoryItem from './InventoryItem'

const InventoryList = ({inventory, fetchInventory}) => {
  return (
	<div className="rounded-xl border bg-white shadow-none px-4 py-1">
		<Table>
			<TableHeader>
				<TableRow className="text-center">
					<TableHead>Name</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Quantity</TableHead>
					<TableHead>Min Qty</TableHead>
					<TableHead>Cost/Unit</TableHead>
					<TableHead>Total Cost</TableHead>
					<TableHead className="text-center">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{inventory.map((item) => (
					<InventoryItem key={item.id} item={item} fetchInventory={fetchInventory}/>
				))}
			</TableBody>
		</Table>
	</div>
  )
}

export default InventoryList
