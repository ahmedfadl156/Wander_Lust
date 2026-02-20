import { Separator } from "@/components/ui/separator"
import { Map, Plane, Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const page = () => {
    const dashboardData = [
        {
            title: "Total Tours",
            value: "124",
            change: "+12.5%",
            icon: Map,
            color: "bg-green-100"
        },
        {
            title: "Active Bookings",
            value: "45",
            change: "+12.5%",
            icon: Plane,
            color: "bg-green-100"
        },
        {
            title: "Customers",
            value: "12",
            change: "+12.5%",
            icon: Users,
            color: "bg-green-100"
        },
        {
            title: "Avg Rating",
            value: "4.5",
            change: "+12.5%",
            icon: Star,
            color: "bg-green-100"
        }
    ]
    return (
        <main>
            <header className="p-6 border-b border-gray-300">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            </header>
            {/* Stats Cards Section */}
            <section className="mx-auto max-w-[1900px] p-6 mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {dashboardData.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4 border-l-4 border-l-primary hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${item.color}`}>
                                    <item.icon className="size-5 text-primary" />
                                </div>
                                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                    {item.change}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{item.title}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{item.value}</p>
                            </div>
                            <p className="text-xs text-gray-400">Compared to last month</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* Chart and Recent Bookings Section */}
            <section className="mx-auto max-w-[1900px] p-6 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Revenue Chart */}
                    <div className="bg-white col-span-2 rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between px-4">
                            <div className="flex flex-col items-start gap-1">
                                <h2 className="text-xl font-bold">Revenue Overview</h2>
                                <p className="text-sm text-gray-500">Monthly revenue performance vs previous year</p>
                            </div>
                            <span className="text-xs font-semibold text-gray-600 bg-gray-400/40 px-3 py-1.5 rounded-lg">
                                Last 12 Months
                            </span>
                        </div>
                    </div>
                    {/* Recent Bookings */}
                    <div className="bg-white col-span-1 rounded-xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-xl font-bold">Recent Bookings</h2>
                        {/* Table just view customer and tour name */}
                        <div className="overflow-x-auto mt-6">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-300/40">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-500">Customer</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-500">Tour</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2 text-sm font-bold text-gray-900">John Doe</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">Tour 1</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Separator className="my-6"/>
                            <div className="text-center mt-6">
                                <Link href="/admin/bookings" className="text-[#11D4C4] font-bold hover:underline">
                                    View All Bookings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default page