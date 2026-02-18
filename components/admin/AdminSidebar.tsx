"use client"
import Image from "next/image"
import { Separator } from "../ui/separator"
import Link from "next/link"
import { Calendar, ChevronLeft, ChevronRight, LayoutDashboard, Map, Menu, Settings, Users, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/tours", label: "Tours", icon: Map },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
]

const AdminSidebar = () => {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 shadow-md p-2 rounded-lg"
                aria-label="Open sidebar"
            >
                <Menu className="size-5 text-gray-700" />
            </button>

            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed lg:relative z-50 lg:z-auto
                    h-screen bg-white border-r border-gray-200 shadow-md
                    flex flex-col
                    transition-all duration-300 ease-in-out
                    ${collapsed ? "lg:w-[72px]" : "lg:w-64"}
                    ${mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <div className={`flex items-center gap-3 p-4 h-16 ${collapsed ? "justify-center" : "justify-between"}`}>
                    {!collapsed && (
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="bg-primary/20 w-9 h-9 rounded-lg shrink-0 flex items-center justify-center">
                                <Image src="/icons/logo.png" alt="Logo" width={18} height={18} className="object-contain" />
                            </div>
                            <div className="leading-tight">
                                <h1 className="text-sm font-bold uppercase tracking-wide whitespace-nowrap">Adventure Admin</h1>
                                <p className="text-xs text-gray-400">Management Portal</p>
                            </div>
                        </div>
                    )}

                    {collapsed && (
                        <div className="bg-primary/20 w-9 h-9 rounded-lg flex items-center justify-center">
                            <Image src="/icons/logo.png" alt="Logo" width={18} height={18} className="object-contain" />
                        </div>
                    )}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors shrink-0"
                        aria-label="Toggle sidebar"
                    >
                        {collapsed
                            ? <ChevronRight className="size-3.5 text-gray-500" />
                            : <ChevronLeft className="size-3.5 text-gray-500" />
                        }
                    </button>

                    <button
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden ml-auto p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="size-5 text-gray-500" />
                    </button>
                </div>

                <Separator />

                <nav className="flex-1 p-3 space-y-1 mt-2 overflow-y-auto">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                title={collapsed ? link.label : undefined}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                                    transition-all duration-150 group relative
                                    ${active
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                                    }
                                    ${collapsed ? "justify-center" : ""}
                                `}
                            >
                                <link.icon className={`size-5 shrink-0 ${active ? "text-white" : "text-gray-500 group-hover:text-primary"}`} />

                                {!collapsed && (
                                    <span className="text-sm font-medium whitespace-nowrap">{link.label}</span>
                                )}

                                {collapsed && (
                                    <span className="
                                        absolute left-full ml-3 px-2 py-1 text-xs font-medium
                                        bg-gray-900 text-white rounded-md whitespace-nowrap
                                        opacity-0 group-hover:opacity-100 pointer-events-none
                                        transition-opacity duration-150 z-50
                                    ">
                                        {link.label}
                                    </span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {!collapsed && (
                    <div className="p-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400 text-center">© 2026 WanderLust</p>
                    </div>
                )}
            </aside>
        </>
    )
}

export default AdminSidebar