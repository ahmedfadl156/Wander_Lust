"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { user, isAuthenticated, logout, isLoading } = useAuth()

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const handleLogout = async () => {
        await logout()
        setIsDropdownOpen(false)
    }

    return (
        <>
            <nav className="absolute top-0 left-0 right-0 z-50 w-full px-6 md:px-12 lg:px-[48px] py-[24px] flex items-center justify-between h-[96px]">
                {/* Logo */}
                <div className="flex items-center gap-2 z-50">
                    <Image src="/icons/Logo.png" alt="Logo" width={30} height={30} />
                    <p className="text-2xl font-bold text-white">Wanderlust</p>
                </div>

                {/* Desktop Navigation Links */}
                <ul className="hidden lg:flex items-center gap-6">
                    <li className="text-lg font-medium text-white cursor-pointer">About Us</li>
                    <li className="text-lg font-medium text-white cursor-pointer">Tours</li>
                </ul>

                {/* Desktop Buttons / User Profile */}
                {!isLoading && (
                    <div className="hidden lg:flex items-center gap-6">
                        {isAuthenticated && user ? (
                            // User Profile Dropdown
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-3 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all px-4 py-2.5 rounded-full border border-white/20"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-white font-medium">{user.name || user.email}</span>
                                    <ChevronDown className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                                        <div className="p-4 border-b border-gray-100">
                                            <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors text-red-600"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span className="font-medium">Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Login/signUp Buttons
                            <>
                                <Link href="/login">
                                    <Button className="text-base bg-primary text-white font-medium hover:bg-primary/90 cursor-pointer">Login</Button>
                                </Link>
                                <Link href="/signUp">
                                    <Button className="text-base font-medium border-white text-primary cursor-pointer hover:bg-white hover:text-black transition-colors" variant="outline">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                )}

                {/* Hamburger Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden z-50 text-white hover:text-primary transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <div className={`flex flex-col items-center justify-center h-full space-y-8 transition-all duration-500 ease-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
                    }`}>
                    {/* Mobile Navigation Links */}
                    <ul className="flex flex-col items-center gap-8">
                        <li
                            onClick={toggleMenu}
                            className="text-2xl font-medium text-white cursor-pointer"
                        >
                            About Us
                        </li>
                        <li
                            onClick={toggleMenu}
                            className="text-2xl font-medium text-white cursor-pointer"
                        >
                            Tours
                        </li>
                    </ul>

                    {/* Mobile Buttons / User Profile */}
                    {!isLoading && (
                        <div className="flex flex-col items-center gap-4 w-64">
                            {isAuthenticated && user ? (
                                // User Profile Card
                                <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white font-semibold text-lg">{user.name || 'User'}</p>
                                            <p className="text-white/70 text-sm truncate">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleLogout()
                                                toggleMenu()
                                            }}
                                            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Login/signUp Buttons
                                <>
                                    <Link href="/login" className="w-full" onClick={toggleMenu}>
                                        <Button className="w-full text-lg bg-primary text-white font-medium hover:bg-primary/90 cursor-pointer py-6">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/signUp" className="w-full" onClick={toggleMenu}>
                                        <Button className="w-full text-lg font-medium border-white text-primary cursor-pointer py-6" variant="outline">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar