import Image from "next/image"

const Footer = () => {
    return (
        <footer className="bg-[#F6F8F8] py-12 px-6">
            <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Logo */}
                <div className="flex items-center justify-center lg:justify-start gap-2 z-50">
                    <Image src="/icons/Logo.png" alt="Logo" width={30} height={30} />
                    <p className="text-xl font-bold text-[#0F172A]">Wanderlust</p>
                </div>
                {/* Quick Links */}
                <ul className="flex gap-4 items-center justify-center lg:justify-start">
                    <li className="text-base font-medium text-[#64748B] cursor-pointer">About Us</li>
                    <li className="text-base font-medium text-[#64748B] cursor-pointer">Tours</li>
                </ul>
                {/* Rights Reserved */}
                <p className="text-sm font-medium text-[#94A3B8] cursor-pointer hover:text-primary transition-colors text-center lg:text-right">© 2026 Wanderlust. All rights reserved.</p>
            </div>
            </div>
        </footer>
    )
}

export default Footer