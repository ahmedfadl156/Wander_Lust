import { CheckCircleIcon, StarIcon } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"

const OurPromise = () => {
    const promises = [
        {
            title: "Small groups for personalized experience"
        },
        {
            title: "Support local communities and conservation"
        },
        {
            title: "Flexible booking and cancellation policies"
        },
    ]
    return (
        <section className="bg-[#032924] mt-24 py-24 px-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-primary/20 
            bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            </div>
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left => Content */}
                <div className="flex flex-col items-start order-2 md:order-1 z-10">
                    <span className="uppercase text-base font-semibold text-[#14B8A5]">Our Promise</span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-lg mt-4 leading-15">Experience the World Without Limits</h1>
                    <p className="text-base text-[#94A3B8] mt-6 max-w-xl leading-relaxed">We believe that adventure is not just about visiting a place, but about
                        connecting with nature and pushing your boundaries. Our curated toursoffer safety,
                        excitement, and unforgettable memories.
                    </p>
                    <ul className="flex flex-col gap-4 mt-8">
                        {promises.map((promise, index) => (
                            <li key={index} className="flex items-center gap-2 group">
                                <CheckCircleIcon className="size-5 text-[#14B8A5] group-hover:text-white" />
                                {promise.title}
                            </li>
                        ))}
                    </ul>
                    <Button className="bg-[#14B8A5] text-white font-medium mt-8 px-6 py-6 text-lg cursor-pointer">Learn About Us</Button>
                </div>
                {/* Right => Image */}
                <div className="relative order-1 md:order-2 min-h-[300px] md:min-h-[400px]">
                    <div className="absolute -inset-4 rounded-2xl rotate-3 bg-primary/20"></div>
                    <div className="relative w-full h-full">
                        <Image src="/images/our-promise.png" alt="Our Promise" fill className="rounded-2xl shadow-2xl object-cover" />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-l-4 border-primary max-w-xs hidden md:block">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="text-4xl font-bold text-slate-900 dark:text-white">15k+</div>
                            <div className="text-sm text-slate-500 leading-tight">Happy<br />Travelers</div>
                        </div>
                        <div className="flex text-yellow-500 fill-yellow-500 text-sm">
                            {[Array.from({ length: 5 }).map((el, index) => (
                                <StarIcon className="size-5 fill-yellow-500" key={index} />
                            ))]
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurPromise