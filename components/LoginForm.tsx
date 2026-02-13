"use client"
import { loginSchema, LoginSchema } from "@/lib/loginSchema"
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

const LoginForm = () => {
    const router = useRouter()
    const { login } = useAuth()
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = async (data: LoginSchema) => {
        try {
            const res = await fetch("http://localhost:7000/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const responseData = await res.json()

            if (res.ok) {
                if (responseData.token) {
                    await login(responseData.token)
                }

                toast.success("You Logged In Successfully")
                router.push("/")
            } else {
                toast.error(responseData.message || "Invalid Email or Password")
            }
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong. Please try again.")
        }
    }
    return (
        <form className="w-full space-y-6 mt-12 text-left" onSubmit={form.handleSubmit(onSubmit)}>
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
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 mt-0.5 shrink-0 accent-primary cursor-pointer rounded border-2 border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 transition-all"
                    />
                    <label htmlFor="remember" className="text-sm text-[#0F172A] cursor-pointer select-none">Remember me</label>
                </div>
                <Link href="#" className="text-primary text-sm hover:underline transition-colors">Forgot password?</Link>
            </div>
            <Button type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full text-base bg-primary text-white font-medium hover:bg-primary/90 cursor-pointer py-6">
                {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-[#0F172A]">
                Don't have an account? <Link href="/signup" className="text-primary hover:underline transition-colors">Sign Up</Link>
            </p>
        </form>
    )
}

export default LoginForm