"use client"
import { Control, useFieldArray } from "react-hook-form"
import { TourSchema } from "@/lib/authSchema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface LocationStepProps {
    control: Control<TourSchema>
}

const LocationStep = ({ control }: LocationStepProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "locations",
    })

    return (
        <div className="flex flex-col gap-8">

            {/* Start Location */}
            <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-base text-foreground">Start Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-primary/20 bg-background">

                    <FormField
                        control={control}
                        name="startLocation.description"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Kathmandu, Nepal" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="startLocation.address"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Thamel, Kathmandu 44600" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="startLocation.coordinates.0"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Longitude</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="any"
                                        placeholder="e.g. 85.3157"
                                        {...field}
                                        onChange={e => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="startLocation.coordinates.1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Latitude</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="any"
                                        placeholder="e.g. 27.7172"
                                        {...field}
                                        onChange={e => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Tour Locations (stops)*/}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base text-foreground">Tour Stop Locations</h3>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-primary/40 text-primary hover:bg-primary/10"
                        onClick={() => append({ description: "", address: "", day: 1, coordinates: [0, 0] })}
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Location
                    </Button>
                </div>

                {fields.length === 0 && (
                    <p className="text-sm text-muted-foreground italic text-center py-6 border border-dashed border-primary/30 rounded-xl">
                        No locations added yet. Click "Add Location" to begin.
                    </p>
                )}

                {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-primary/20 bg-background relative">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 text-destructive hover:bg-destructive/10"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>

                        <p className="md:col-span-2 text-xs font-bold text-primary uppercase tracking-wider">
                            Stop #{index + 1}
                        </p>

                        <FormField
                            control={control}
                            name={`locations.${index}.description`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Pokhara Valley" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name={`locations.${index}.address`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Lakeside, Pokhara" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name={`locations.${index}.day`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Day</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 2"
                                            {...field}
                                            onChange={e => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name={`locations.${index}.coordinates.0`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Longitude</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="any"
                                            placeholder="e.g. 83.9856"
                                            {...field}
                                            onChange={e => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name={`locations.${index}.coordinates.1`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latitude</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="any"
                                            placeholder="e.g. 28.2096"
                                            {...field}
                                            onChange={e => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default LocationStep