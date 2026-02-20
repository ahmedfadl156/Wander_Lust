"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form } from "@/components/ui/form"
import { Steps as ArkSteps, type StepChangeDetails } from "@ark-ui/react/steps"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { tourSchema, TourSchema } from "@/lib/authSchema"

import BasicInfoStep from "./BasicInfoStep"
import PricingStep from "./PricingStep"
import LocationStep from "./LocationStep"
import ImagesStep from "./ImagesStep"
import DatesStep from "./DatesStep"
import ReviewStep from "./ReviewStep"

// ─── Which fields to validate per step ───────────────────────────────────────
const stepFields: (keyof TourSchema)[][] = [
    ["name", "duration", "maxGroupSize", "difficulty", "summary"],  // Step 0
    ["price", "priceDiscount"],                                      // Step 1
    ["startLocation", "locations"],                                  // Step 2
    ["imageCover", "images"],                                        // Step 3
    ["startDates"],                                                  // Step 4
    // Step 5 = Review, no new fields
]

const stepsData = [
    { index: 0, title: "Basic Info" },
    { index: 1, title: "Pricing" },
    { index: 2, title: "Location" },
    { index: 3, title: "Images" },
    { index: 4, title: "Dates" },
    { index: 5, title: "Review" },
]

const CreateTourForm = () => {
    const [currentStep, setCurrentStep] = useState(0)

    const form = useForm<TourSchema>({
        resolver: zodResolver(tourSchema),
        defaultValues: {
            name: "",
            duration: 1,
            maxGroupSize: 1,
            difficulty: "easy",
            summary: "",
            description: "",
            price: 0,
            priceDiscount: undefined,
            startLocation: { description: "", address: "", coordinates: [0, 0] },
            locations: [],
            images: [],
            startDates: [],
        },
        mode: "onTouched",
    })

    const handleNext = async () => {
        const fields = stepFields[currentStep]
        if (!fields) { setCurrentStep(s => s + 1); return }
        const isValid = await form.trigger(fields)
        if (isValid) setCurrentStep(s => s + 1)
    }

    const onSubmit = async (values: TourSchema) => {
        // Build FormData so files are sent correctly to the API
        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("duration", String(values.duration))
        formData.append("maxGroupSize", String(values.maxGroupSize))
        formData.append("difficulty", values.difficulty)
        formData.append("summary", values.summary)
        if (values.description) formData.append("description", values.description)
        formData.append("price", String(values.price))
        if (values.priceDiscount) formData.append("priceDiscount", String(values.priceDiscount))
        formData.append("startLocation", JSON.stringify(values.startLocation))
        formData.append("locations", JSON.stringify(values.locations))
        formData.append("imageCover", values.imageCover)
        values.images?.forEach(img => formData.append("images", img))
        values.startDates.forEach(d => formData.append("startDates", d))

        console.log("✅ Tour submitted:", values)
        // TODO: await createTour(formData)
    }

    const stepInstep = currentStep

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <ArkSteps.Root
                    step={currentStep}
                    count={stepsData.length}
                    onStepChange={(e: StepChangeDetails) => setCurrentStep(e.step)}
                    className="px-6 pb-10"
                >
                    {/* ── Stepper header ── */}
                    <ArkSteps.List className="flex items-center w-full mb-10">
                        {stepsData.map((step, i) => {
                            const isCompleted = stepInstep > step.index
                            const isActive = stepInstep === step.index
                            return (
                                <ArkSteps.Item
                                    key={step.index}
                                    index={step.index}
                                    className="flex items-center flex-1 last:flex-none"
                                >
                                    <ArkSteps.Trigger className="flex flex-col items-center gap-2 cursor-pointer focus:outline-none">
                                        <ArkSteps.Indicator className={`
                                            w-10 h-10 rounded-full flex items-center justify-center
                                            text-sm font-bold border-2 transition-all duration-300
                                            ${isCompleted ? "bg-primary border-primary text-white"
                                                : isActive ? "bg-primary/10 border-primary text-primary"
                                                    : "bg-muted border-border text-muted-foreground"}
                                        `}>
                                            {isCompleted ? <Check className="w-4 h-4" /> : step.index + 1}
                                        </ArkSteps.Indicator>
                                        <span className={`
                                            text-xs font-semibold hidden sm:block transition-colors duration-300
                                            ${isActive ? "text-primary" : isCompleted ? "text-primary/70" : "text-muted-foreground"}
                                        `}>
                                            {step.title}
                                        </span>
                                    </ArkSteps.Trigger>
                                    {i < stepsData.length - 1 && (
                                        <ArkSteps.Separator className={`
                                            flex-1 h-[2px] mx-2 mt-[-18px] rounded-full transition-all duration-500
                                            ${stepInstep > step.index ? "bg-primary" : "bg-border"}
                                        `} />
                                    )}
                                </ArkSteps.Item>
                            )
                        })}
                    </ArkSteps.List>

                    {/* ── Step 0: Basic Info ── */}
                    <ArkSteps.Content index={0}>
                        <StepCard title="Basic Information" description="Enter the core details about the tour.">
                            <BasicInfoStep control={form.control} />
                            <StepNav currentStep={currentStep} total={stepsData.length}
                                onPrev={() => setCurrentStep(s => s - 1)} onNext={handleNext} />
                        </StepCard>
                    </ArkSteps.Content>

                    {/* ── Step 1: Pricing ── */}
                    <ArkSteps.Content index={1}>
                        <StepCard title="Pricing" description="Set the tour price and optional discount.">
                            <PricingStep control={form.control} />
                            <StepNav currentStep={currentStep} total={stepsData.length}
                                onPrev={() => setCurrentStep(s => s - 1)} onNext={handleNext} />
                        </StepCard>
                    </ArkSteps.Content>

                    {/* ── Step 2: Location ── */}
                    <ArkSteps.Content index={2}>
                        <StepCard title="Location" description="Define the starting point and tour stop locations.">
                            <LocationStep control={form.control} />
                            <StepNav currentStep={currentStep} total={stepsData.length}
                                onPrev={() => setCurrentStep(s => s - 1)} onNext={handleNext} />
                        </StepCard>
                    </ArkSteps.Content>

                    {/* ── Step 3: Images ── */}
                    <ArkSteps.Content index={3}>
                        <StepCard title="Images" description="Upload the cover image and optional gallery photos.">
                            <ImagesStep control={form.control} />
                            <StepNav currentStep={currentStep} total={stepsData.length}
                                onPrev={() => setCurrentStep(s => s - 1)} onNext={handleNext} />
                        </StepCard>
                    </ArkSteps.Content>

                    {/* ── Step 4: Dates ── */}
                    <ArkSteps.Content index={4}>
                        <StepCard title="Departure Dates" description="Set all available departure dates for this tour.">
                            <DatesStep control={form.control} />
                            <StepNav currentStep={currentStep} total={stepsData.length}
                                onPrev={() => setCurrentStep(s => s - 1)} onNext={handleNext} />
                        </StepCard>
                    </ArkSteps.Content>

                    {/* ── Step 5: Review ── */}
                    <ArkSteps.Content index={5}>
                        <StepCard title="Review" description="Check all details before publishing the tour.">
                            <ReviewStep getValues={form.getValues} />
                            <div className="flex items-center justify-between pt-4 border-t border-primary/20 mt-6">
                                <Button type="button" variant="outline"
                                    className="border-primary/40 text-primary hover:bg-primary/10"
                                    onClick={() => setCurrentStep(s => s - 1)}>
                                    ← Previous
                                </Button>
                                <Button type="submit" className="bg-primary text-white hover:bg-primary/90 px-8">
                                    Publish Tour
                                </Button>
                            </div>
                        </StepCard>
                    </ArkSteps.Content>

                    {/* ── Completed ── */}
                    <ArkSteps.CompletedContent>
                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-10 flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold">Tour Published!</h2>
                            <p className="text-muted-foreground text-sm">The tour has been created successfully.</p>
                        </div>
                    </ArkSteps.CompletedContent>
                </ArkSteps.Root>
            </form>
        </Form>
    )
}

// ─── Reusable step card wrapper ───────────────────────────────────────────────
const StepCard = ({ title, description, children }: {
    title: string; description: string; children: React.ReactNode
}) => (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 flex flex-col gap-6">
        <div className="border-b border-primary/20 pb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
    </div>
)

// ─── Reusable Prev/Next navigation ───────────────────────────────────────────
const StepNav = ({ currentStep, total, onPrev, onNext }: {
    currentStep: number; total: number; onPrev: () => void; onNext: () => void
}) => (
    <div className="flex items-center justify-between pt-4 border-t border-primary/20 mt-auto">
        <Button type="button" variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10"
            disabled={currentStep === 0} onClick={onPrev}>
            ← Previous
        </Button>
        <span className="text-xs text-muted-foreground font-medium">{currentStep + 1} / {total}</span>
        <Button type="button" className="bg-primary text-white hover:bg-primary/90" onClick={onNext}>
            Next →
        </Button>
    </div>
)

export default CreateTourForm
