import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import InventoryItem from './InventoryItem'
import { ScrollArea } from "@/components/ui/scroll-area"

const InventoryList = ({inventory}) => {
  return (
	<ScrollArea className="w-full rounded-md border bg-white shadow-none px-4 py-1">
		<Table className="min-w-[700px]">
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
					<InventoryItem key={item.id} item={item} />
				))}
			</TableBody>
		</Table>
	</ScrollArea>
  )
}

export default InventoryList
