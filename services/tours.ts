const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllTours = async (sortParams?: string, searchFilter?: string | null) => {
    const params = new URLSearchParams();

    if (sortParams) {
        params.set('sort', sortParams);
    }
    if (searchFilter) {
        params.set('search', searchFilter);
    }

    const queryString = params.toString();
    const url = `${API_URL}/tours${queryString ? `?${queryString}` : ''}`;
    const fetchTours = await fetch(url)
    const tours = await fetchTours.json()
    if (!fetchTours.ok) {
        throw new Error('Failed to fetch tours')
    }
    return tours
}

export const getTopTours = async () => {
    const fetchTopTours = await fetch(`${API_URL}/tours/top-tours`);
    const topTours = await fetchTopTours.json();
    if (!fetchTopTours.ok) {
        throw new Error('Failed to fetch top tours')
    }
    return topTours
}

export const getTour = async (slug: string) => {
    const fetchTour = await fetch(`${API_URL}/tours/${slug}`)
    const tour = await fetchTour.json()
    if (!fetchTour.ok) {
        throw new Error('Failed to fetch tour')
    }
    return tour
}