"use client"
import { Control } from "react-hook-form"
import { TourSchema } from "@/lib/authSchema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface PricingStepProps {
    control: Control<TourSchema>
}

const PricingStep = ({ control }: PricingStepProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Price */}
            <FormField
                control={control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="e.g. 499"
                                {...field}
                                onChange={e => field.onChange(Number(e.target.value))}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Price Discount */}
            <FormField
                control={control}
                name="priceDiscount"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price Discount ($) <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="e.g. 50"
                                {...field}
                                value={field.value ?? ""}
                                onChange={e => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    )
}

export default PricingStep