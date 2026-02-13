'use client'
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import TourCard from "../TourCard"
import { useEffect, useState } from "react"
import { getTopTours } from "@/services/tours"
const PopularTours = () => {
    const [topTours , setTopTours] = useState<any>([])
    useEffect(() => {
        const fetchTopTours = async () => {
            setTopTours(await getTopTours())
        }
        fetchTopTours()
    }, [])
return (
    <section className="my-12 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-4xl text-[#0F172A] font-bold">Popular Expeditions</h2>
                <p className="text-lg text-[#64748B] mt-2">Hand-picked adventures for the discerning traveler.</p>
            </div>
            <Link href="/tours" className="text-primary font-semibold flex items-center gap-1 hover:underline transition-all duration-300 ease-in-out">
                View all tours
                <ArrowRightIcon className="size-5" />
            </Link>
        </div>
        {/* Tours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {topTours?.data?.topTours?.map((tour: any) => (
            <TourCard key={tour._id} tour={tour} />
        ))}
        </div>
    </section>
)
}

export default PopularTours