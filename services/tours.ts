const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const SEARCH_PARAM_MAPPINGS: Record<string, string | ((value: string) => Record<string, string>)> = {
    destination: 'search',
    search: 'search',
    price: 'price[gte]',
    guests: 'maxGroupSize[gte]',
    minPrice: 'price[gte]',
    maxPrice: 'price[lte]',
    difficulties: 'difficulty',
    durations: 'duration[gte]',
    // Parameters اللي بتمر كما هي
    sort: 'sort',
    page: 'page',
    limit: 'limit',
};

export const getAllTours = async (searchParams: { [key: string]: string | undefined }) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
        if (!value) return;

        const mapping = SEARCH_PARAM_MAPPINGS[key];

        if (mapping) {
            const paramKey = typeof mapping === 'string' ? mapping : key;
            params.set(paramKey, value);
        } else {
            params.set(key, value);
        }
    });

    const queryString = params.toString();
    const url = `${API_URL}/tours${queryString ? `?${queryString}` : ''}`;

    try {
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`Failed to fetch tours: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching tours:', error);
        throw error;
    }
};


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