import { CalendarIcon, MapPin, SearchIcon, UserIcon } from "lucide-react"
import { Button } from "./ui/button"

const searchComponent = () => {
return (
    <div className="relative -mt-10 md:-mt-12 lg:-mt-16 rounded-2xl bg-white max-w-7xl mx-auto py-8 px-8 shadow-lg backdrop-blur-2xl">
        {/* Search Inputs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between">
            {/* Destination Input */}
            <div className="relative flex flex-col items-start">
                <label htmlFor="destination">Destination</label>
                <MapPin className="size-5 text-[#64748B] absolute top-[60%] left-2 transform" />
                <input type="text" placeholder="Destination"/>
            </div>
            {/* Date Input */}
            <div className="relative">
                <label htmlFor="date">Date</label>
                <CalendarIcon className="size-5 text-[#64748B] absolute top-[60%] left-2 transform" />
                <input type="date" placeholder="Date" />
            </div>
            {/* Guest Input */}
            <div className="relative">
                <label htmlFor="guest">Guest</label>
                <UserIcon className="size-5 text-[#64748B] absolute top-[60%] left-2 transform" />
                <input type="text" placeholder="Guest" />
            </div>
            {/* Search Button */}
            <Button className="w-full mt-8 px-8 py-6 text-base font-semibold bg-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-primary shadow-md cursor-pointer hover:shadow-primary/80 transition-all duration-300 ease-in-out">
                <SearchIcon className="size-5 text-white transform" />
                Find Adventures
            </Button>
        </div>
    </div>
)
}

export default searchComponent