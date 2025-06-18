import React from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableCell, TableHeader, TableRow, TableHead, TableBody} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";

const StaffTable = ({staff}) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-large">Today's Staff</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Staff scheduled for today's shifts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-center">
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((staffMember, index) => (
              <TableRow key={index} className="h-12 shadow-none hover:bg-muted/30 transition-all border-none">
                <TableCell className="font-medium">{staffMember.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="shadow-none">
                    {staffMember.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{staffMember.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default StaffTable

{/* <Table>
<TableHeader>
  <TableRow>
    <TableHead>Name</TableHead>
    <TableHead>Role</TableHead>
    <TableHead className="text-right">Hours</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  {staff.map((staff, index) => (
    <TableRow key={index}>
      <TableCell>{staff.name}</TableCell>
      <TableCell>{staff.role}</TableCell>
      <TableCell className="text-right">{staff.hours}</TableCell>
    </TableRow>
  ))}
</TableBody>
</Table> */}