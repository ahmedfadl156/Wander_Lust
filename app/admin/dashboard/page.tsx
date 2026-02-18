import Image from "next/image"

const page = () => {
    const dashboardData = [
        {
            title: "Total Revenue",
            value: "$12,345.67",
            change: "+12.5%",
            icon: "/icons/eco.png",
            color: "bg-green-100"
        },
        {
            title: "Total Revenue",
            value: "$12,345.67",
            change: "+12.5%",
            icon: "/icons/eco.png",
            color: "bg-green-100"
        },
        {
            title: "Total Revenue",
            value: "$12,345.67",
            change: "+12.5%",
            icon: "/icons/eco.png",
            color: "bg-green-100"
        },
        {
            title: "Total Revenue",
            value: "$12,345.67",
            change: "+12.5%",
            icon: "/icons/eco.png",
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
                                    <Image src={item.icon} alt={item.title} width={22} height={22} />
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
        </main>
    )
}

export default page