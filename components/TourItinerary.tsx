"use client"

import { MapPin, Calendar, Navigation } from "lucide-react"
import { motion } from "framer-motion"

interface Location {
    _id: string
    id: string
    type: string
    coordinates: number[]
    description: string
    day: number
}

interface TourItineraryProps {
    locations: Location[]
}

export default function TourItinerary({ locations }: TourItineraryProps) {
    // Sort locations by day
    const sortedLocations = [...locations].sort((a, b) => a.day - b.day)

    return (
        <div className="mt-8">
            <div className="relative">
                {/* Journey Path - Decorative Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-primary via-primary/60 to-primary/30 hidden md:block transform -translate-x-1/2" />

                {/* Mobile vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-primary/60 to-primary/30 md:hidden" />

                <div className="space-y-12 md:space-y-16">
                    {sortedLocations.map((location, index) => {
                        const isEven = index % 2 === 0
                        const isLast = index === sortedLocations.length - 1

                        return (
                            <motion.div
                                key={location._id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${isEven ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                <div className={`flex-1 ml-20 md:ml-0 ${isEven ? 'md:text-left md:pr-2' : 'md:pl-2'}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 overflow-hidden relative group"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="relative z-10">
                                            <div className={`inline-flex items-center gap-2 bg-linear-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-md ${isEven ? 'md:float-right' : ''
                                                }`}>
                                                <Calendar className="size-4" />
                                                Day {location.day}
                                            </div>

                                            {/* Location Name */}
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                                                {location.description}
                                            </h3>

                                            {/* Coordinates Info */}
                                            <div className={`flex items-center gap-2 text-gray-600 mb-4 ${isEven ? 'md:justify-start' : ''
                                                }`}>
                                                <Navigation className="size-4 text-primary" />
                                                <span className="text-sm font-mono">
                                                    {location.coordinates[1].toFixed(4)}°N, {Math.abs(location.coordinates[0]).toFixed(4)}°W
                                                </span>
                                            </div>

                                            {/* Journey Progress */}
                                            {!isLast && (
                                                <div className={`flex items-center gap-2 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100`}>
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                        <span className="font-medium">Next destination in {sortedLocations[index + 1].day - location.day} {sortedLocations[index + 1].day - location.day === 1 ? 'day' : 'days'}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {isLast && (
                                                <div className={`flex items-center gap-2 text-sm text-green-600 font-semibold mt-4 pt-4 border-t border-gray-100 ${isEven ? 'md:justify-end' : ''
                                                    }`}>
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                    Final Destination
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Center Pin Marker */}
                                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-20">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: index * 0.1 + 0.2
                                        }}
                                        className="relative"
                                    >
                                        {/* Pulsing ring */}
                                        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />

                                        {/* Pin marker */}
                                        <div className="relative bg-linear-to-br from-primary to-primary/80 rounded-full p-4 shadow-xl border-4 border-white">
                                            <MapPin className="size-6 text-white" fill="white" />
                                        </div>

                                        {/* Location number badge */}
                                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-primary shadow-md border-2 border-primary/20">
                                            {index + 1}
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Journey Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16 bg-linear-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20"
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Journey</h3>
                        <p className="text-gray-600">Experience {sortedLocations.length} incredible destinations</p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">{sortedLocations.length}</div>
                            <div className="text-sm text-gray-600 mt-1">Locations</div>
                        </div>
                        <div className="w-px h-12 bg-gray-300" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">{sortedLocations[sortedLocations.length - 1]?.day || 0}</div>
                            <div className="text-sm text-gray-600 mt-1">Days</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
