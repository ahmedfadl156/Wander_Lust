export const getAllTours = async () => {
    const fetchTours = await fetch('http://localhost:7000/api/v1/tours')
    const tours = await fetchTours.json()
    if (!fetchTours.ok) {
        throw new Error('Failed to fetch tours')
    }
    return tours
}

export const getTopTours = async () => {
    const fetchTopTours = await fetch('http://localhost:7000/api/v1/tours/top-tours');
    const topTours = await fetchTopTours.json();
    if (!fetchTopTours.ok) {
        throw new Error('Failed to fetch top tours')
    }
    return topTours
}

export const getTour = async (slug: string) => {
    const fetchTour = await fetch(`http://localhost:7000/api/v1/tours/${slug}`)
    const tour = await fetchTour.json()
    if (!fetchTour.ok) {
        throw new Error('Failed to fetch tour')
    }
    return tour
}