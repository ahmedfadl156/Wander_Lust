"use client"
import TourCard from "@/components/TourCard"
import FilterTours from "@/components/tours/FilterTours"
import SearchTours from "@/components/tours/SearchTours"
import SortTours from "@/components/tours/SortTours"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getAllTours } from "@/services/tours"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const page = () => {
    const [tours, setTours] = useState<any[]>([]);
    const [filteredTours, setFilteredTours] = useState<any[]>([])
    const searchParams = useSearchParams();
    const searchFilter = searchParams.get('search');
    useEffect(() => {
        const getTours = async () => {
            try {
                const sortParams = searchParams.get('sort');
                const searchFilter = searchParams.get('search');
                const response = await getAllTours(sortParams, searchFilter);
                const toursData = response.data.tours;
                setTours(toursData);
                setFilteredTours(toursData);
            } catch (error) {
                console.log(error);
            }
        }
        getTours();
    }, [searchParams])

    const handleFilterChange = (filters: any) => {
        setFilteredTours(filters)
    }
    return (
        <main className="my-32 px-4 max-w-[1640px] mx-auto">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem className="text-primary hover:bg-primary/20">
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-primary hover:bg-primary/20" />
                    <BreadcrumbItem className="text-primary hover:bg-primary/20">
                        <BreadcrumbLink href="/tours">Tours</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-primary hover:bg-primary/20" />
                    <BreadcrumbItem className="text-primary hover:bg-primary/20">
                        <BreadcrumbPage>All Tours</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* Search Tours */}
            <SearchTours />
            {/* filter and show all tours */}
            <section className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 mt-16">
                {/* Filter Sidebar */}
                <aside className="lg:sticky lg:top-24 lg:h-fit">
                    <FilterTours tours={tours} onFilterChange={handleFilterChange} />
                </aside>
                {/* All Tours */}
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Showing <span className="text-primary">{tours.length}</span> Tours</h2>
                        <SortTours />
                    </div>
                    {/* Tours List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTours.length > 0 ? (
                            filteredTours.map((tour: any) => (
                                <TourCard key={tour._id} tour={tour} />
                            ))
                        ) : (
                            <p>No tours found</p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default page