"use client"
import { useState } from "react"
import { Slider } from "../ui/slider"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const FilterTours = () => {
    const difficulties = ["easy", "medium", "difficult"]
    const durations = ["5 days", "10 days", "15 days", "20 days"]
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
    const [selectedDurations, setSelectedDurations] = useState<string[]>([])
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleDifficultyChange = (difficulty: string, checked: boolean) => {
        if (checked) {
            setSelectedDifficulties([...selectedDifficulties, difficulty])
        } else {
            setSelectedDifficulties(selectedDifficulties.filter(d => d !== difficulty))
        }
    }

    const handleDurationChange = (duration: string, checked: boolean) => {
        if (checked) {
            setSelectedDurations([...selectedDurations, duration])
        } else {
            setSelectedDurations(selectedDurations.filter(d => d !== duration))
        }
    }

    const handleReset = () => {
        setPriceRange([0, 1000])
        setSelectedDifficulties([])
        setSelectedDurations([])
    }

    const handleApplyFilters = () => {
        const queryParams = new URLSearchParams(searchParams.toString());
        if (priceRange[0] !== 0) queryParams.set("minPrice", priceRange[0].toString());
        if (priceRange[1] !== 1000) queryParams.set("maxPrice", priceRange[1].toString());
        if (selectedDifficulties.length > 0) queryParams.set("difficulties", selectedDifficulties.join(","));
        if (selectedDurations.length > 0) queryParams.set("durations", selectedDurations.join(",").split(" ")[0]);
        router.push(`${pathname}?${queryParams.toString()}`);

    }

    return (
        <div className="bg-white shadow-md rounded-2xl border border-gray-200 p-6 space-y-6">
            {/* Filter Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <Button
                    variant="ghost"
                    className="text-primary font-semibold hover:bg-primary/10"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>

            {/* Price Filter */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-800">Price Range</h3>
                    <span className="text-sm text-gray-600">
                        ${priceRange[0]} - ${priceRange[1]}
                    </span>
                </div>
                <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                />
            </div>

            <Separator />

            {/* Difficulty Filter */}
            <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-800">Difficulty</h3>
                <div className="space-y-3">
                    {difficulties.map((difficulty) => (
                        <div key={difficulty} className="flex items-center gap-3">
                            <Checkbox
                                id={`difficulty-${difficulty.toLowerCase()}`}
                                checked={selectedDifficulties.includes(difficulty)}
                                onCheckedChange={(checked: boolean) =>
                                    handleDifficultyChange(difficulty, checked)
                                }
                                className="border-gray-300"
                            />
                            <Label
                                htmlFor={`difficulty-${difficulty.toLowerCase()}`}
                                className="text-sm font-medium text-gray-700 cursor-pointer"
                            >
                                {difficulty}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Duration Filter */}
            <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-800">Duration</h3>
                <div className="space-y-3">
                    {durations.map((duration) => (
                        <div key={duration} className="flex items-center gap-3">
                            <Checkbox
                                id={`duration-${duration.toLowerCase()}`}
                                checked={selectedDurations.includes(duration)}
                                onCheckedChange={(checked: boolean) =>
                                    handleDurationChange(duration, checked)
                                }
                                className="border-gray-300"
                            />
                            <Label
                                htmlFor={`duration-${duration.toLowerCase()}`}
                                className="text-sm font-medium text-gray-700 cursor-pointer"
                            >
                                {duration}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            <Button
                className="w-full bg-primary text-white hover:bg-primary/90 cursor-pointer my-4 py-5"
                onClick={handleApplyFilters}
            >
                Apply Filters
            </Button>
        </div>
    )
}

export default FilterTours