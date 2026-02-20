import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid Email Address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

export const signupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid Email Address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirmation: z.string().min(8, "Password must be at least 8 characters long"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
})

export const bookingSchema = z.object({
    tour: z.string(),
    user: z.string(),
    date: z.string(),
    guests: z.number().min(1, "Guests must be at least 1"),
})

export const searchSchema = z.object({
    destination: z.string(),
    price: z.string(),
    guests: z.string(),
})

export const tourSchema = z.object({
    // Step 0 — Basic Info
    name: z.string().min(10, "Name must be at least 10 characters").max(40, "Name must be at most 40 characters"),
    duration: z.number().min(1, "Duration must be at least 1 day"),
    maxGroupSize: z.number().min(1, "Group size must be at least 1"),
    difficulty: z.enum(["easy", "medium", "difficult"], { message: "Select a difficulty" }),
    summary: z.string().min(5, "Summary is required"),
    description: z.string().optional(),

    // Step 1 — Pricing
    price: z.number().min(1, "Price must be greater than 0"),
    priceDiscount: z.number().optional(),

    // Step 2 — Location
    startLocation: z.object({
        description: z.string().min(1, "Description is required"),
        address: z.string().min(1, "Address is required"),
        coordinates: z.tuple([
            z.number({ message: "Longitude is required" }),
            z.number({ message: "Latitude is required" }),
        ]),
    }),
    locations: z.array(z.object({
        description: z.string().min(1, "Description is required"),
        address: z.string().min(1, "Address is required"),
        day: z.number().min(1, "Day must be at least 1"),
        coordinates: z.tuple([
            z.number({ message: "Longitude is required" }),
            z.number({ message: "Latitude is required" }),
        ]),
    })).min(1, "Add at least one location"),

    // Step 3 — Images
    imageCover: z.instanceof(File, { message: "Cover image is required" }),
    images: z.array(z.instanceof(File)).optional(),

    // Step 4 — Dates
    startDates: z.array(z.string().min(1, "Date is required")).min(1, "Add at least one start date"),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type SignupSchema = z.infer<typeof signupSchema>
export type BookingSchema = z.infer<typeof bookingSchema>
export type SearchSchema = z.infer<typeof searchSchema>
export type TourSchema = z.infer<typeof tourSchema>