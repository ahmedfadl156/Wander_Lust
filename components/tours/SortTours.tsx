'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortTours = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSort = (sort: string) => {
        //  هاخد نسخة من ال search params الحالية احفظها عندى علشان اضيفلها او اعدل عليها
        const params = new URLSearchParams(searchParams);

        // بعدين نشوف لو فيه قيمة عندنا بنحطها لو مفيش بنمسحها من ال url
        if (sort) {
            params.set('sort', sort);
        } else {
            params.delete('sort');
        }

        // واخيرا بقا بنبدل ال url الحالى بالجديد
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    return (
        <div className="flex items-center gap-2">
            <p>Sort by:</p>
            <select
                defaultValue={searchParams.get('sort')?.toString()}
                className="border border-gray-300 rounded-md px-2 py-1" onChange={(e) => handleSort(e.target.value)}>
                <option value="">Default</option>
                <option value="price">Price (low to high)</option>
                <option value="-price">Price (high to low)</option>
                <option value="ratingsAverage">Rating (low to high)</option>
                <option value="-ratingsAverage">Rating (high to low)</option>
            </select>
        </div>
    )
}

export default SortTours