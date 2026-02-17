"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
    id: string
    email: string
    name?: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    signUp: (name: string , email: string , password: string , passwordConfirm: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Check if user is authenticated on mount
    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            // Call your backend to verify the token and get user data
            const res = await fetch(`${API_URL}/users/getMe`, {
                credentials: "include"
            })

            if (res.ok) {
                const userData = await res.json()
                setUser(userData.data.user || userData.user)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.error("Auth check failed:", error)
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    const signUp = async (name: string , email: string , password: string , passwordConfirm: string) => {
        try {
            const res = await fetch(`${API_URL}/users/signup` , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ name, email, password, passwordConfirm })
            })
            if(res.ok){
                await checkAuth()
            }else{
                const errorData = await res.json()
                throw new Error(errorData.message || "Signup failed")
            }
        } catch (error) {
            console.error("Signup failed:", error)
            throw error
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            })

            if (res.ok) {
                await checkAuth()
            } else {
                const errorData = await res.json()
                throw new Error(errorData.message || "Login failed")
            }
        } catch (error) {
            console.error("Login failed:", error)
            throw error
        }
    }

    const logout = async () => {
        try {
            // Call backend to clear the cookie
            await fetch(`${API_URL}/users/logout`, {
                method: "POST",
                credentials: "include"
            })
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                signUp,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
