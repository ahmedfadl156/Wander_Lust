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
    login: (token: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Check if user is authenticated on mount
    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const token = localStorage.getItem("token")

        if (!token) {
            setIsLoading(false)
            return
        }

        try {
            // Call your backend to verify the token and get user data
            const res = await fetch("http://localhost:7000/api/v1/users/getMe", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (res.ok) {
                const userData = await res.json()
                setUser(userData.data.user || userData.user)
            } else {
                // Token is invalid, remove it
                localStorage.removeItem("token")
                setUser(null)
            }
        } catch (error) {
            console.error("Auth check failed:", error)
            localStorage.removeItem("token")
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (token: string) => {
        localStorage.setItem("token", token)
        await checkAuth()
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
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
