"use client"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"

const SearchTours = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPedning , startTransation] = useTransition();
    const [searchTerm , setSearchTerm] = useState(searchParams.get('search') || "");

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if(term){
            params.set('search', term);
        }else{
            params.delete('search');
        }

        startTransation(() => {
            router.push(`${pathname}?${params.toString()}`);
        })
    }
    return (
        <form>
            <div className="relative">
                <Search className="size-5 text-gray-500 absolute left-3 top-[42%]" />
                <Input placeholder="Search by destination,activity,or keyword..."
                    className="w-full py-6 shadow-md border border-gray-300 md:max-w-2xl bg-white text-black pl-10 focus-visible:ring-0"
                    type="text"
                    name="search"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        handleSearch(e.target.value)
                    }}
                />
            </div>
        </form>
    )
}

export default SearchTours