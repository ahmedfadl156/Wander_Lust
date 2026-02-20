import { Button } from "@/components/ui/button"
import CreateTourForm from "@/components/admin/tour-form/CreateTourForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const page = () => {
    return (
        <main className="max-w-[1900px] mx-auto">
            <header className="flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center justify-between p-6">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-2xl font-bold">Create New Tour</h1>
                    <p className="text-sm text-gray-500">Add details for a new adventure package.</p>
                </div>
                <Button asChild className="bg-primary/20 text-sm font-bold text-primary px-4 py-6 shadow-md hover:bg-primary/30 cursor-pointer">
                    <Link href="/admin/tours">
                        <ArrowLeft />
                        Back to Tours
                    </Link>
                </Button>
            </header>
            <CreateTourForm />
        </main>
    )
}

export default page