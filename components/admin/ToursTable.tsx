import { getAllTours } from "@/services/tours"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import PaginationControls from "./PaginationControls"

const Difficulty: Record<string, string> = {
    easy: "bg-green-200 text-green-600",
    medium: "bg-yellow-200 text-yellow-600",
    difficult: "bg-red-200 text-red-600"
}

interface ToursTableProps {
    page: string
    limit: string
}

const ToursTable = async ({ page, limit }: ToursTableProps) => {
    const currentPage = Number(page) || 1
    const pageLimit = Number(limit) || 12

    const { data } = await getAllTours({ page, limit })
    const tours = data?.tours ?? []

    const hasNextPage = tours.length === pageLimit

    return (
        <Table className="mt-24 px-4 border border-primary/40">
            <TableHeader>
                <TableRow className="border-b border-primary/40">
                    <TableHead>Image</TableHead>
                    <TableHead>Tour Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tours.map((tour: any) => (
                    <TableRow key={tour._id}>
                        <TableCell>
                            <Image src={'/images/Hero-bg.png'} alt={tour.name} width={50} height={50} className="rounded-md" />
                        </TableCell>
                        <TableCell className="font-bold">{tour.name}</TableCell>
                        <TableCell className="font-medium">{tour.startLocation.description}</TableCell>
                        <TableCell className="font-bold">${tour.price}</TableCell>
                        <TableCell>
                            <span className={`capitalize ${Difficulty[tour.difficulty]} font-bold px-2 py-1 rounded-md`}>
                                {tour.difficulty}
                            </span>
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={6} className="py-3 px-10">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing {tours.length} results — Page {currentPage}
                            </p>
                            <PaginationControls
                                currentPage={currentPage}
                                hasNextPage={hasNextPage}
                                limit={pageLimit}
                            />
                        </div>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default ToursTable