import SignupForm from "@/components/SignupForm"
import Image from "next/image"

const page = () => {
    return (
        <div className="w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">
            {/* Left Side => Image */}
            <div className="relative w-full lg:w-1/2 h-80 lg:h-auto bg-slate-900 order-first">
                {/* Image */}
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
                    <Image src="/images/login-image.png" alt="Login Image" fill />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t 
                from-[#11211f]/90 via-[#11211f]/20 to-transparent 
                lg:bg-gradient-to-r lg:from-transparent lg:via-[#11211f]/20 
                lg:to-[#11211f]/80"></div>
                {/* Logo */}
                <div className="absolute top-10 left-10 flex items-center gap-2 z-50">
                    <Image src="/icons/Logo.png" alt="Logo" width={30} height={30} />
                    <p className="text-xl font-bold text-white">Wanderlust</p>
                </div>
                {/* Quote */}
                <div className="absolute bottom-10 left-10 text-white z-50">
                    <h1 className="text-sm lg:text-2xl font-bold max-w-sm drop-shadow-lg leading-tight italic">“The mountain are calling and i must go.”</h1>
                    <p className="text-[12px] lg:text-base mt-4 flex items-center italic">
                        <span className="h-[2px] w-4 lg:w-10 bg-primary mr-2"></span>
                        John Muir
                    </p>
                </div>
            </div>
            {/* Right Side => Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-gradient-to-br from-gray-50 via-white to-primary/5">
                <div className="w-full max-w-md">
                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-40 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

                    {/* Main Form Container */}
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-8 sm:p-10">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>

                        {/* Content */}
                        <div className="flex flex-col items-center text-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Welcome Back</h1>
                                <p className="text-[#64748B] text-base">Ready for your next adventure? Please enter your details.</p>
                            </div>
                            <SignupForm />
                        </div>

                        {/* Bottom Decorative Corner */}
                        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-tl-full blur-sm"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page