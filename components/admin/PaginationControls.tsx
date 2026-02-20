"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"

interface PaginationControlsProps {
    currentPage: number
    hasNextPage: boolean
    limit: number
}

const PaginationControls = ({ currentPage, hasNextPage, limit }: PaginationControlsProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const navigateTo = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", String(page))
        params.set("limit", String(limit))
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                onClick={() => navigateTo(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                Previous
            </Button>
            <span className="text-sm font-medium px-2">Page {currentPage}</span>
            <Button
                variant="outline"
                onClick={() => navigateTo(currentPage + 1)}
                disabled={!hasNextPage}
            >
                Next
            </Button>
        </div>
    )
}

export default PaginationControls
