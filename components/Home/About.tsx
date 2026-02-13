const About = () => {
    const About = [
        {
            title: "Certified Guides",
            description: "Expert local knowledge",
            icon: '/icons/verified_user.png'
        },
        {
            title: "Eco-Friendly",
            description: "Sustanable travel",
            icon: '/icons/eco.png'
        },
        {
            title: "24/7 Support",
            description: "Always here for you",
            icon: '/icons/support_agent.png'
        },
        {
            title: "Best Price",
            description: "Guaranteed valueknowledge",
            icon: '/icons/thumb_up_alt.png'
        },
    ]
return (
    <div className="mx-auto max-w-7xl bg-white shadow-md border border-[#E2E8F0] rounded-2xl p-8 mt-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center justify-center">
            {About.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                    <span className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                        <img src={item.icon} alt={item.title} className="w-5 h-5" />
                    </span>
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
}

export default About