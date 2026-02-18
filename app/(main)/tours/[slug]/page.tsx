"use client"
import { Button } from "@/components/ui/button"
import { getTour } from "@/services/tours"
import { ratingToStars } from "@/utils/ratingsToStars"
import TourItinerary from "@/components/TourItinerary"
import { ChartNoAxesColumn, Clock, Download, Heart, MapPin, Share, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import TourBookingCard from "@/components/TourBookingCard"

interface SearchParams {
    slug: string
    [key: string]: string
}

interface Tour {
    _id?: string
    id?: string
    name: string
    ratingsAverage: number
    ratingsQuantity: number
    difficulty: string
    duration: number
    maxGroupSize: number
    price: number
    summary: string
    description: string
    imageCover: string
    images: string[]
    startDates: string[]
    startLocation: {
        description: string
        type: string
        coordinates: number[]
    }
    locations: {
        _id: string
        id: string
        description: string
        type: string
        coordinates: number[]
        day: number
    }[]
    guides?: {
        _id: string
        name: string
        role: string
        photo?: string
        bio?: string
    }[]
    reviews?: {
        _id: string
        rating: number
        review: string
        createdAt: string
        user: {
            name: string
            photo?: string
        }
    }[]
}

const TourPage = () => {
    const { slug } = useParams<SearchParams>()
    const [tour, setTour] = useState<Tour | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const { data } = await getTour(slug)
                setTour(data.tour[0])
                console.log(data.tour[0])
            } catch (error) {
                console.error("Failed to fetch tour:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchTour()
    }, [slug])

    if (!tour) {
        return (
            <main className="mx-auto max-w-7xl py-12 lg:py-20 mt-20 px-4 md:px-6 lg:px-8">
                <p className="text-gray-600">Tour not found</p>
            </main>
        )
    }

    return (
        <main className="mx-auto max-w-7xl py-12 lg:py-20 mt-20 px-4 md:px-6 lg:px-8">
            {/* Tour Details Section */}
            <section className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {tour.name}
                    </h1>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1 border-r-2 border-gray-200 pr-4">
                            {ratingToStars(tour.ratingsAverage)}
                            <span className="text-sm text-gray-600 font-medium">
                                {tour.ratingsAverage.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500">
                                ({tour.ratingsQuantity} {tour.ratingsQuantity === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4 text-primary" />
                            <span className="text-sm text-gray-600 font-medium">
                                {tour.startLocation.description}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 md:mt-4 flex items-center gap-4">
                    <Button className="text-base bg-[#E2E8F0]/20 text-[#334155] border border-[#E2E8F0] font-medium cursor-pointer hover:bg-[#E2E8F0]/80">
                        <Share className="size-4" />
                        Share
                    </Button>
                    <Button className="text-base bg-[#E2E8F0]/20 text-[#334155] border border-[#E2E8F0] font-medium cursor-pointer hover:bg-[#E2E8F0]/80">
                        <Heart className="size-4 text-red-500" />
                        Save
                    </Button>
                </div>
            </section>
            {/* Gallery Section */}
            <section className="mt-12">
                {/* Image */}
                <div className="relative h-[600px] w-full rounded-lg overflow-hidden">
                    <span className="absolute top-5 left-5 bg-white px-5 py-1 rounded-full z-10 text-sm uppercase">{tour.difficulty}</span>
                    <Image
                        src="/images/Hero-bg.png"
                        alt={tour.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </section>
            {/* Info Section */}
            <section className="mt-12 bg-white shadow-md border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Duration */}
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/20 p-3 rounded-lg">
                            <Clock className="size-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-base font-bold text-gray-600">Duration</p>
                            <span className="text-sm text-gray-600 font-medium">
                                {tour.duration} days
                            </span>
                        </div>
                    </div>
                    {/* Difficulty */}
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/20 p-3 rounded-lg">
                            <ChartNoAxesColumn className="size-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-base font-bold text-gray-600">Difficulty</p>
                            <span className="text-sm text-gray-600 font-medium">
                                {tour.difficulty}
                            </span>
                        </div>
                    </div>
                    {/* Group Size */}
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/20 p-3 rounded-lg">
                            <Users className="size-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-base font-bold text-gray-600">Group Size</p>
                            <span className="text-sm text-gray-600 font-medium">
                                {tour.maxGroupSize}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* Main Section For Info And Booking */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Overview Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900">Tour Overview</h2>
                        <p className="text-[#475569] mt-4 leading-relaxed tracking-wide">
                            {tour.description}
                        </p>
                    </section>

                    {/* Itinerary Section */}
                    <section>
                        {/* Itinerary Timeline */}
                        {tour.locations && tour.locations.length > 0 ? (
                            <>
                                {/* Header */}
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
                                    <Link href="/pdf" download={tour.name + "-itinerary.pdf"} className="flex text-primary font-bold items-center gap-2">
                                        <Download className="size-4" />
                                        Download PDF
                                    </Link>
                                </div>
                                <TourItinerary locations={tour.locations} />
                            </>
                        ) : (
                            <p className="text-center text-xl text-primary mt-8">No Itinerary available right now for this tour</p>
                        )}
                    </section>

                    {/* Guides Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-black">Your Guides</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            {tour.guides && tour.guides.length > 0 ? tour.guides?.map((guide) => (
                                <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6" key={guide._id}>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative size-24 rounded-full overflow-hidden border-3 border-primary">
                                            <Image
                                                src={guide.photo || "/images/guide-avatar.jpg"}
                                                alt={guide.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col text-center">
                                            <h3 className="text-lg font-bold text-gray-900">{guide.name}</h3>
                                            <p className="text-sm text-primary uppercase">{guide.role}</p>
                                            <p className="text-gray-600 mt-4">{guide.bio || "No bio available"}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-xl text-primary mt-8 col-span-2">No Guides available right now for this tour</p>
                            )}
                        </div>
                    </section>

                    {/* Reviews Section */}
                    <section>
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-2xl font-bold text-black">Traveler Reviews</h2>
                            <Link href="/reviews" className="text-primary font-bold">View all {tour.reviews?.length} reviews</Link>
                        </div>
                        {tour.reviews && tour.reviews.length > 0 ? tour.reviews?.slice(0, 3).map((review) => (
                            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 w-full mt-8" key={review._id}>
                                <div className="flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={review.user?.photo || "/images/guide-avatar.jpg"}
                                            alt={review.user?.name || ""}
                                            width={50}
                                            height={50}
                                            className="object-cover rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-bold text-gray-900">{review.user?.name}</h3>
                                            <p className="text-sm text-primary uppercase">{review.createdAt.split('T')[0]}</p>
                                        </div>
                                    </div>
                                    <p>{ratingToStars(review.rating)}</p>
                                </div>
                                <p className="text-gray-600 mt-4 text-center md:text-left">{review.review}</p>
                            </div>
                        )) : (
                            <p className="text-center text-xl text-primary mt-8">No Reviews available right now for this tour</p>
                        )}
                    </section>
                </div>

                {/* Right Column - Booking Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <TourBookingCard
                            tourId={tour._id || tour.id || slug}
                            tourName={tour.name}
                            price={tour.price}
                            maxGroupSize={tour.maxGroupSize}
                            startDates={tour.startDates}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default TourPage