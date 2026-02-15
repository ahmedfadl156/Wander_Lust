import { Clock, StarIcon, UserIcon } from "lucide-react"
import Image from "next/image"
import { Separator } from "./ui/separator"
import Link from "next/link"

interface tourProps {
    name: string,
    difficulty: string,
    duration: number,
    maxGroupSize: number,
    price: number,
    ratingsAverage: number,
    ratingsQuantity: number,
    imageCover: string,
}

const tourDifficulty = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500"
}

const TourCard = ({tour}: {tour: tourProps}) => {
    return (
        <div className="bg-white relative rounded-2xl shadow-md flex flex-col">
            {/* Info */}
            <div className="absolute top-5 right-5 flex items-center gap-2 z-50 bg-white text-black px-3 py-1 rounded-full">
                <span className={`${tourDifficulty[tour.difficulty]} w-2 h-2 rounded-full`}></span>
                <span className="text-[12px] font-bold capitalize">{tour.difficulty}</span>
            </div>
            {/* Image */}
            <div className="relative w-full h-64">
                <Image src="/images/Hero-bg.png" alt="Tour" fill className="object-cover rounded-t-2xl" />
            </div>
            {/* Content */}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <p className="text-primary font-bold uppercase text-[12px]">Switzerland</p>
                    <span className="flex items-center gap-1">
                        <StarIcon className="size-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-yellow-500">{tour.ratingsAverage}</span>
                        <span className="text-[#94A3B8]">({tour.ratingsQuantity})</span>
                    </span>
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className="text-2xl font-semibold mt-2">{tour.name}</h3>
                    <div className="flex items-center gap-3">
                        <p className="flex items-center gap-1 text-[#94A3B8]">
                            <Clock className="size-4"/>
                            {tour.duration} days
                        </p>
                        <p className="flex items-center gap-1 text-[#94A3B8]">
                            <UserIcon className="size-4"/>
                            {tour.maxGroupSize} people
                        </p>
                    </div>
                </div>
                <Separator className="my-6 py-[1px] bg-[#E2E8F0]"/>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start">
                        <p className="text-[#94A3B8]">Starting from</p>
                        <p className="text-[#0F172A] font-bold text-[22px]">${tour.price}</p>
                    </div>
                    <Link href={`/tours/${tour.slug}`} className="text-primary font-bold underline">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TourCard