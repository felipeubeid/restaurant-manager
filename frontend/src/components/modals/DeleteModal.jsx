import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

const DeleteModal = ({title}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" 
					className="h-8 w-8 p-0 text-red-600 hover:text-red-600 hover:bg-destructive/10 shadow-none">
						<Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete {title}</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4 text-center">
						<p className="text-lg font-semibold">Are you sure?</p>
						<p className="text-sm text-gray-500">This action cannot be undone.</p>
					</div>
					<div className="flex justify-center gap-4 pb-4">
						<DialogClose asChild>
							<Button variant="secondary">Cancel</Button>
						</DialogClose>
						<Button variant="destructive">Delete</Button>
        	</div>
				</DialogContent>
      </Dialog>
    </div>
  )
}

export default DeleteModal
