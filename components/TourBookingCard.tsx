"use client"

import { bookingSchema, BookingSchema } from "@/lib/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Field, FieldLabel } from "./ui/field"
import { Button } from "./ui/button"
import { CheckCircle2 } from "lucide-react"
import { useMemo } from "react"

interface TourBookingCardProps {
    tourId: string
    tourName: string
    price: number
    maxGroupSize: number
    startDates: string[]
}

const TourBookingCard = ({ tourId, tourName, price, maxGroupSize, startDates }: TourBookingCardProps) => {
    const form = useForm<BookingSchema>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            tour: tourId,
            user: "",
            date: "",
            guests: 1,
        }
    })

    const watchGuests = form.watch("guests")

    // Calculate total price
    const totalPrice = useMemo(() => {
        const guests = Number(watchGuests) || 1
        return price * guests
    }, [watchGuests, price])

    const minDate = new Date().toISOString().split('T')[0]

    const onSubmit = async (data: BookingSchema) => {
        try {
            console.log("Booking data:", {
                ...data,
                tour: tourId,
                totalPrice,
            })
            alert(`Booking submitted for ${tourName}!\nGuests: ${data.guests}\nDate: ${data.date}\nTotal: $${totalPrice}`)
        } catch (error) {
            console.error("Booking error:", error)
        }
    }

    return (
        <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 flex flex-col gap-6">
            {/* Price Header */}
            <div className="flex flex-col items-start gap-2">
                <span className="text-sm text-gray-600">From</span>
                <p className="font-bold text-3xl text-primary">
                    ${price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-600">/person</span>
                </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <Controller
                    name="date"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="uppercase text-gray-700 font-semibold">Select Date</FieldLabel>
                            <Input
                                {...field}
                                type="date"
                                min={minDate}
                                placeholder="Select Date"
                                className="py-6 px-4 bg-[#F9FAFB] border-2 border-gray-200 shadow-md focus:border-primary transition-colors"
                            />
                            {fieldState.error && (
                                <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="guests"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="uppercase text-gray-700 font-semibold">Guests</FieldLabel>
                            <Input
                                {...field}
                                type="number"
                                min={1}
                                max={maxGroupSize}
                                placeholder="Number of guests"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                className="py-6 px-4 bg-[#F9FAFB] border-2 border-gray-200 shadow-md focus:border-primary transition-colors"
                            />
                            {fieldState.error && (
                                <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">Maximum {maxGroupSize} guests</p>
                        </Field>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full py-7 text-base font-bold text-white bg-primary hover:bg-primary/90 transition-colors duration-200 rounded-lg shadow-md hover:shadow-lg"
                >
                    Book Tour Now!
                </Button>
            </form>

            {/* Trust Indicators */}
            <div className="text-center flex flex-col items-center justify-center gap-2 py-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">You won't be charged yet</p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle2 className="text-green-500 size-4" />
                    Free cancellation up to 48h before
                </p>
            </div>

            {/* Price Calculation */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        ${price.toLocaleString()} × {watchGuests || 1} {watchGuests > 1 ? 'guests' : 'guest'}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">${totalPrice.toLocaleString()}</p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <p className="text-base font-bold text-gray-900">Total</p>
                    <p className="text-xl font-bold text-primary">${totalPrice.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default TourBookingCard