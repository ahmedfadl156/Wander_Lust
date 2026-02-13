'use client'
import { getAllTours } from "@/services/tours";
import { useEffect, useState } from "react"

const ToursComponents = () => {
    const [tours, setTours] = useState<any>([]);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const data = await getAllTours();
                setTours(data);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };

        fetchTours();
    }, [])
    return (
        <div>
            {tours?.data?.tours?.map((tour: any) => (
                <div key={tour._id}>
                    <h2>{tour.name}</h2>
                    <p>{tour.description}</p>
                    <p>{tour.price}</p>
                </div>
            ))}
        </div>
    )
}

export default ToursComponents;
