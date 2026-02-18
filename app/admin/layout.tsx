import AdminSidebar from "@/components/admin/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex h-screen w-full bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 overflow-y-auto pt-16 lg:pt-0">
                {children}
            </div>
        </main>
    )
}
