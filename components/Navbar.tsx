"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

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
                    <li className="text-lg font-medium text-white cursor-pointer hover:text-primary transition-colors">About Us</li>
                    <li className="text-lg font-medium text-white cursor-pointer hover:text-primary transition-colors">Tours</li>
                </ul>

                {/* Desktop Buttons */}
                <div className="hidden lg:flex items-center gap-6">
                    <Link href="/login">
                        <Button className="text-lg bg-primary text-white font-medium hover:bg-primary/90 cursor-pointer">Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="text-lg font-medium border-white text-primary cursor-pointer hover:bg-white hover:text-black transition-colors" variant="outline">Sign Up</Button>
                    </Link>
                </div>

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
                            className="text-2xl font-medium text-white cursor-pointer hover:text-primary transition-colors"
                        >
                            About Us
                        </li>
                        <li
                            onClick={toggleMenu}
                            className="text-2xl font-medium text-white cursor-pointer hover:text-primary transition-colors"
                        >
                            Tours
                        </li>
                    </ul>

                    {/* Mobile Buttons */}
                    <div className="flex flex-col items-center gap-4 w-64">
                        <Link href="/login" className="w-full" onClick={toggleMenu}>
                            <Button className="w-full text-lg bg-primary text-white font-medium hover:bg-primary/90 cursor-pointer py-6">
                                Login
                            </Button>
                        </Link>
                        <Link href="/signup" className="w-full" onClick={toggleMenu}>
                            <Button className="w-full text-lg font-medium border-white text-primary cursor-pointer py-6" variant="outline">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar