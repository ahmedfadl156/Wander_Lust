import ToursTable from "@/components/admin/ToursTable"
import { Button } from "@/components/ui/button"
import Link from "next/link";

interface PageProps {
    searchParams: Promise<{ page?: string; limit?: string }>
}

const page = async ({ searchParams }: PageProps) => {
    const { page: pageParam = "1", limit: limitParam = "12" } = await searchParams

    return (
        <main className="max-w-[1900px] mx-auto">
            <header className="flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center justify-between p-6">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-2xl font-bold">Manage Tours</h1>
                    <p className="text-sm text-gray-500">Oversee and manage your tour inventory,
                        pricing, and availability.
                    </p>
                </div>
                <Button asChild className="bg-primary/20 text-sm font-bold text-primary px-4 py-6 shadow-md hover:bg-primary/30 cursor-pointer">
                    <Link href="/admin/tours/add-tour">
                        + Add New Tour
                    </Link>
                </Button>
            </header>
            {/* Search Component */}
            <p>Search Component will be added here</p>
            {/* Tours Table */}
            <ToursTable page={pageParam} limit={limitParam} />
        </main>
    )
}

export default page