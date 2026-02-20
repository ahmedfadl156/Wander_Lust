"use client"
import { Steps as ArkSteps, type StepChangeDetails } from '@ark-ui/react/steps';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stepsData = [
    { index: 0, title: "Basic Info", description: "Enter the basic information about the tour." },
    { index: 1, title: "Pricing", description: "Enter the pricing information about the tour." },
    { index: 2, title: "Location", description: "Enter the location information about the tour." },
    { index: 3, title: "Images", description: "Upload the cover image and gallery for the tour." },
    { index: 4, title: "Dates", description: "Set the available departure dates for the tour." },
    { index: 5, title: "Review", description: "Review all the information before submitting." },
]

const Steps = () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <ArkSteps.Root
            step={currentStep}
            count={stepsData.length}
            onStepChange={(e: StepChangeDetails) => setCurrentStep(e.step)}
            className="px-6 pb-10"
        >
            <ArkSteps.List className="flex items-center w-full mb-10">
                {stepsData.map((step, i) => {
                    const isCompleted = currentStep > step.index;
                    const isActive = currentStep === step.index;

                    return (
                        <ArkSteps.Item
                            key={step.index}
                            index={step.index}
                            className="flex items-center flex-1 last:flex-none"
                        >
                            <ArkSteps.Trigger className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none">
                                <ArkSteps.Indicator
                                    className={`
                                        w-10 h-10 rounded-full flex items-center justify-center
                                        text-sm font-bold border-2 transition-all duration-300
                                        ${isCompleted
                                            ? 'bg-primary border-primary text-white'
                                            : isActive
                                                ? 'bg-primary/10 border-primary text-primary'
                                                : 'bg-muted border-border text-muted-foreground'
                                        }
                                    `}
                                >
                                    {isCompleted
                                        ? <Check className="w-4 h-4" />
                                        : <span>{step.index + 1}</span>
                                    }
                                </ArkSteps.Indicator>

                                <span className={`
                                    text-xs font-semibold whitespace-nowrap transition-colors duration-300 hidden sm:block
                                    ${isActive ? 'text-primary' : isCompleted ? 'text-primary/70' : 'text-muted-foreground'}
                                `}>
                                    {step.title}
                                </span>
                            </ArkSteps.Trigger>

                            {i < stepsData.length - 1 && (
                                <ArkSteps.Separator
                                    className={`
                                        flex-1 h-[2px] mx-2 mt-[-18px] rounded-full transition-all duration-500
                                        ${currentStep > step.index ? 'bg-primary' : 'bg-border'}
                                    `}
                                />
                            )}
                        </ArkSteps.Item>
                    );
                })}
            </ArkSteps.List>

            {stepsData.map((step) => (
                <ArkSteps.Content key={step.index} index={step.index}>
                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 min-h-[320px] flex flex-col gap-6">
                        <div className="flex flex-col gap-1 border-b border-primary/20 pb-4">
                            <h2 className="text-xl font-bold text-foreground">
                                Step {step.index + 1} — {step.title}
                            </h2>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-muted-foreground text-sm italic">
                                Form fields for "{step.title}" will go here.
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                            <ArkSteps.PrevTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="border-primary/40 text-primary hover:bg-primary/10 disabled:opacity-40 cursor-pointer"
                                    disabled={currentStep === 0}
                                >
                                    ← Previous
                                </Button>
                            </ArkSteps.PrevTrigger>

                            <span className="text-xs text-muted-foreground font-medium">
                                {step.index + 1} / {stepsData.length}
                            </span>

                            <ArkSteps.NextTrigger asChild>
                                <Button
                                    className="bg-primary text-white hover:bg-primary/90 cursor-pointer"
                                >
                                    {currentStep === stepsData.length - 1 ? 'Submit' : 'Next →'}
                                </Button>
                            </ArkSteps.NextTrigger>
                        </div>
                    </div>
                </ArkSteps.Content>
            ))}

            <ArkSteps.CompletedContent>
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-10 flex flex-col items-center justify-center gap-4 min-h-[320px]">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">All Done!</h2>
                    <p className="text-muted-foreground text-sm text-center max-w-sm">
                        All steps are complete. Review your information before publishing the tour.
                    </p>
                    <Button className="mt-2 bg-primary text-white hover:bg-primary/90 cursor-pointer px-8">
                        Publish Tour
                    </Button>
                </div>
            </ArkSteps.CompletedContent>
        </ArkSteps.Root>
    )
}

export default Steps