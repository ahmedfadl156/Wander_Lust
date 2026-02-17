'use client'
import { CalendarIcon, MapPin, SearchIcon, UserIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Controller, useForm } from "react-hook-form"
import { searchSchema, SearchSchema } from "@/lib/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const searchComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const defaultValues = {
        destination: searchParams.get("destination") || "",
        date: searchParams.get("date") || "",
        guests: searchParams.get("guests") || "1",
    }
    const form = useForm<SearchSchema>({
        resolver: zodResolver(searchSchema),
        defaultValues,
    })

    const onSubmit = (data: SearchSchema) => {
        const params = new URLSearchParams(searchParams.toString());
        if(data.destination){
            params.set("destination", data.destination);
        }else{
            params.delete("destination");
        }
        if(data.date){
            params.set("date", data.date);
        }else{
            params.delete("date");
        }
        if(data.guests){
            params.set("guests", data.guests.toString());
        }else{
            params.delete("guests");
        }
        router.push(`/tours?${params.toString()}`);
    }
return (
    <div className="relative -mt-10 md:-mt-12 lg:-mt-16 rounded-2xl bg-white max-w-7xl mx-auto py-8 px-8 shadow-lg backdrop-blur-2xl">
        {/* Search Inputs */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between">
            <Controller 
                name="destination"
                control={form.control}
                render={({ field , fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Destination</FieldLabel>
                        <div className="relative flex flex-col items-start">
                            <MapPin className="size-5 text-[#64748B] absolute top-[40%] left-2 transform" />
                            <Input 
                            {...field} 
                            id={field.name} 
                            type="text" 
                            placeholder="Destination"
                            aria-invalid={fieldState.invalid}
                            className="py-5 px-8"
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                            )}
                        </div>
                    </Field>
                )}
            />
            <Controller 
                name="date"
                control={form.control}
                render={({ field , fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                        <div className="relative flex flex-col items-start">
                            <CalendarIcon className="size-5 text-[#64748B] absolute top-[40%] left-2 transform" />
                            <Input 
                            {...field} 
                            id={field.name} 
                            type="date" 
                            aria-invalid={fieldState.invalid}
                            className="py-5 px-8"
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                            )}
                        </div>
                    </Field>
                )}
            />
            <Controller 
                name="guests"
                control={form.control}
                render={({ field , fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Guests</FieldLabel>
                        <div className="relative flex flex-col items-start">
                            <UserIcon className="size-5 text-[#64748B] absolute top-[40%] left-2 transform" />
                            <Input 
                            {...field} 
                            id={field.name} 
                            type="text" 
                            placeholder="Guests"
                            aria-invalid={fieldState.invalid}
                            className="py-5 px-8"
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                            )}
                        </div>
                    </Field>
                )}
            />
            {/* Search Button */}
            <Button className="w-full mt-8 px-8 py-6 text-base font-semibold bg-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-primary shadow-md cursor-pointer hover:shadow-primary/80 transition-all duration-300 ease-in-out">
                <SearchIcon className="size-5 text-white transform" />
                Find Adventures
            </Button>
        </form>
    </div>
)
}

export default searchComponent