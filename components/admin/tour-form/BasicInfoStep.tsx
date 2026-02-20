"use client"
import { Control } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TourSchema } from "@/lib/authSchema"

interface BasicInfoStepProps {
    control: Control<TourSchema>
}

const BasicInfoStep = ({ control }: BasicInfoStepProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <FormField
                control={control}
                name="name"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                        <FormLabel>Tour Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. The Forest Hiker" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Duration */}
            <FormField
                control={control}
                name="duration"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Duration (days)</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="e.g. 5"
                                {...field}
                                onChange={e => field.onChange(Number(e.target.value))}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Max Group Size */}
            <FormField
                control={control}
                name="maxGroupSize"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Max Group Size</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="e.g. 15"
                                {...field}
                                onChange={e => field.onChange(Number(e.target.value))}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Difficulty */}
            <FormField
                control={control}
                name="difficulty"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="difficult">Difficult</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Summary */}
            <FormField
                control={control}
                name="summary"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="A short summary shown on the tour card..."
                                className="resize-none"
                                rows={3}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Description */}
            <FormField
                control={control}
                name="description"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Full description of the tour experience..."
                                className="resize-none"
                                rows={5}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    )
}

export default BasicInfoStep
