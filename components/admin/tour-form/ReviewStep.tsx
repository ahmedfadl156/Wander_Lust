"use client"
import { UseFormGetValues } from "react-hook-form"
import { TourSchema } from "@/lib/authSchema"
import { MapPin, DollarSign, Image, CalendarDays, Info } from "lucide-react"

interface ReviewStepProps {
    getValues: UseFormGetValues<TourSchema>
}

const ReviewItem = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        <span className="text-sm font-medium text-foreground">{value ?? "—"}</span>
    </div>
)

const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
    <div className="flex items-center gap-2 pb-2 border-b border-primary/20 mb-3">
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
    </div>
)

const ReviewStep = ({ getValues }: ReviewStepProps) => {
    const v = getValues()

    return (
        <div className="flex flex-col gap-6">

            {/* Basic Info */}
            <div className="p-4 rounded-xl bg-background border border-primary/20">
                <SectionTitle icon={Info} title="Basic Information" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <ReviewItem label="Tour Name" value={v.name} />
                    <ReviewItem label="Duration" value={v.duration ? `${v.duration} days` : undefined} />
                    <ReviewItem label="Max Group Size" value={v.maxGroupSize} />
                    <ReviewItem label="Difficulty" value={v.difficulty} />
                    <ReviewItem label="Summary" value={v.summary} />
                </div>
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-xl bg-background border border-primary/20">
                <SectionTitle icon={DollarSign} title="Pricing" />
                <div className="grid grid-cols-2 gap-4">
                    <ReviewItem label="Price" value={v.price ? `$${v.price}` : undefined} />
                    <ReviewItem label="Discount" value={v.priceDiscount ? `$${v.priceDiscount}` : "No discount"} />
                </div>
            </div>

            {/* Location */}
            <div className="p-4 rounded-xl bg-background border border-primary/20">
                <SectionTitle icon={MapPin} title="Location" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ReviewItem label="Start Location" value={v.startLocation?.description} />
                    <ReviewItem label="Address" value={v.startLocation?.address} />
                    <ReviewItem label="Coordinates" value={v.startLocation?.coordinates ? `${v.startLocation.coordinates[0]}, ${v.startLocation.coordinates[1]}` : undefined} />
                </div>
                {v.locations?.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Tour Stops ({v.locations.length})</p>
                        {v.locations.map((loc, i) => (
                            <div key={i} className="text-sm text-foreground pl-3 border-l-2 border-primary/30">
                                Day {loc.day} — {loc.description} <span className="text-muted-foreground">({loc.address})</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Images */}
            <div className="p-4 rounded-xl bg-background border border-primary/20">
                <SectionTitle icon={Image} title="Images" />
                <div className="grid grid-cols-2 gap-4">
                    <ReviewItem label="Cover Image" value={v.imageCover?.name} />
                    <ReviewItem label="Gallery Images" value={v.images?.length ? `${v.images.length} images` : "None"} />
                </div>
            </div>

            {/* Dates */}
            <div className="p-4 rounded-xl bg-background border border-primary/20">
                <SectionTitle icon={CalendarDays} title="Departure Dates" />
                {v.startDates?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {v.startDates.map((d, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                {new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">No dates added.</p>
                )}
            </div>

        </div>
    )
}

export default ReviewStep
