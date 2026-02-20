"use client"
import { Control, useFieldArray } from "react-hook-form"
import { TourSchema } from "@/lib/authSchema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, CalendarDays } from "lucide-react"

interface DatesStepProps {
    control: Control<TourSchema>
}

const DatesStep = ({ control }: DatesStepProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        // @ts-expect-error — useFieldArray requires object fields; we wrap the string in an object
        name: "startDates",
    })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base text-foreground">Departure Dates</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-primary/40 text-primary hover:bg-primary/10"
                    // @ts-expect-error — same reason as above
                    onClick={() => append("")}
                >
                    <Plus className="w-4 h-4 mr-1" /> Add Date
                </Button>
            </div>

            {fields.length === 0 && (
                <div className="flex flex-col items-center gap-3 py-10 border border-dashed border-primary/30 rounded-xl text-muted-foreground">
                    <CalendarDays className="w-10 h-10 text-primary/40" />
                    <p className="text-sm italic">No dates added yet. Click "Add Date" to begin.</p>
                </div>
            )}

            <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-3">
                        <FormField
                            control={control}
                            name={`startDates.${index}`}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Date {index + 1}</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="mb-0.5 text-destructive hover:bg-destructive/10"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DatesStep
