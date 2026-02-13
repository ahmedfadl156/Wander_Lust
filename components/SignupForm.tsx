"use client"
import { signupSchema, SignupSchema } from "@/lib/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Lock, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"

const SignupForm = () => {
    const router = useRouter()
    const { signUp } = useAuth()
    const form = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        }
    })
    const onSubmit = async (data: SignupSchema) => {
        try {
            await signUp(data.name, data.email, data.password, data.passwordConfirmation)
            toast.success("You Signed Up Successfully")
            router.push("/")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong. Please try again.")
        }
    }
    return (
        <form className="w-full space-y-6 mt-12 text-left" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name Controller */}
            <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.error}>
                        <FieldLabel>Name</FieldLabel>
                        <div className="relative">
                            <Mail className="absolute left-3 top-[40%] text-gray-400 w-5 h-5" />
                            <Input
                                {...field}
                                id={field.name}
                                type="text"
                                aria-invalid={fieldState.error}
                                placeholder="e.g. Ahmed Fadl"
                                className="bg-white shadow-sm border-2 border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg py-6 pl-11 pr-4 transition-all duration-200"
                            />
                        </div>
                        {fieldState.error && (
                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                        )}
                    </Field>
                )}
            />
            {/* Email Controller */}
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.error}>
                        <FieldLabel>Email address</FieldLabel>
                        <div className="relative">
                            <Mail className="absolute left-3 top-[40%] text-gray-400 w-5 h-5" />
                            <Input
                                {...field}
                                id={field.name}
                                type="email"
                                aria-invalid={fieldState.error}
                                placeholder="explorer@example.com"
                                className="bg-white shadow-sm border-2 border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg py-6 pl-11 pr-4 transition-all duration-200"
                            />
                        </div>
                        {fieldState.error && (
                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                        )}
                    </Field>
                )}
            />
            {/* Password Controller */}
            <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.error}>
                        <FieldLabel>Password</FieldLabel>
                        <div className="relative">
                            <Lock className="absolute left-3 top-[40%] text-gray-400 w-5 h-5" />
                            <Input
                                {...field}
                                id={field.name}
                                type="password"
                                aria-invalid={fieldState.error}
                                placeholder="••••••••"
                                className="bg-white shadow-sm border-2 border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg py-6 pl-11 pr-4 transition-all duration-200"
                            />
                        </div>
                        {fieldState.error && (
                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                        )}
                    </Field>
                )}
            />
            {/* Password Confirmation Controller */}
            <Controller
                name="passwordConfirmation"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.error}>
                        <FieldLabel>Password Confirmation</FieldLabel>
                        <div className="relative">
                            <Lock className="absolute left-3 top-[40%] text-gray-400 w-5 h-5" />
                            <Input
                                {...field}
                                id={field.name}
                                type="password"
                                aria-invalid={fieldState.error}
                                placeholder="••••••••"
                                className="bg-white shadow-sm border-2 border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg py-6 pl-11 pr-4 transition-all duration-200"
                            />
                        </div>
                        {fieldState.error && (
                            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                        )}
                    </Field>
                )}
            />
            <Button type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full text-base bg-primary text-white font-medium hover:bg-primary/90 cursor-pointer py-6">
                {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-[#0F172A]">
                Already have an account? <Link href="/login" className="text-primary hover:underline transition-colors">Login</Link>
            </p>
        </form>
    )
}

export default SignupForm