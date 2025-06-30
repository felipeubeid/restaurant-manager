import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

const DeleteModal = ({title, onDeleted, deleteId, deleteFunction}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteFunction(deleteId)
      toast.success(`${title} deleted successfully!`)
      setOpen(false)
      if (onDeleted) onDeleted()
    } catch (error) {
      console.error(error)
      toast.error(`Failed to delete ${title}.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
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
						<Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? <Loader2 className="animate-spin h-4 w-4 mx-auto" /> : 'Delete'}
            </Button>
        	</div>
				</DialogContent>
      </Dialog>
    </div>
  )
}

export default DeleteModal
