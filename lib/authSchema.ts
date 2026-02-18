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

export type LoginSchema = z.infer<typeof loginSchema>
export type SignupSchema = z.infer<typeof signupSchema>
export type BookingSchema = z.infer<typeof bookingSchema>
export type SearchSchema = z.infer<typeof searchSchema>