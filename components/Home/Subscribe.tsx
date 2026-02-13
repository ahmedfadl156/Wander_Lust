import Image from "next/image"
import { Button } from "../ui/button"

const Subscribe = () => {
    return (
        <section className="bg-[#14B8A5]/10 py-20">
            <div className="flex flex-col items-center justify-center text-center">
                <Image src="/icons/mark_email_unread.png" 
                alt="Subscribe" width={50} height={50} />
                <h2 className="text-[#0F172A] text-2xl md:text-3xl lg:text-4xl mt-4 leading-relaxed font-bold">Get Travel Inspiration</h2>
                <p className="text-[#64748B] text-sm lg:text-base mt-4 leading-relaxed max-w-2xl">Join our newsletter to recieve the latest deals, travel tips
                    ,and destination guides directly to your inbox.
                </p>
                <div className="flex flex-col md:flex-row gap-2 mt-8 w-full max-w-2xl px-4">
                    <input type="email" placeholder="Your email address" 
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
                    <Button className="bg-primary text-white px-8 mt-2 py-6 rounded-lg cursor-pointer">Subscribe</Button>
                </div>
                <span className="text-[#94A3B8] text-[12px] mt-6 leading-relaxed">We respect your privacy. Unsubscribe anytime.</span>
            </div>
        </section>
    )
}

export default Subscribe