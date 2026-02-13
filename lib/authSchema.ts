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

export type LoginSchema = z.infer<typeof loginSchema>
export type SignupSchema = z.infer<typeof signupSchema>