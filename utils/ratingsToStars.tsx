import Image from "next/image";
import React from "react";


export const ratingToStars = (rating: number): React.ReactElement[] => {
    const clampedRating = Math.max(0, Math.min(5, rating));

    const fullStars = Math.floor(clampedRating);
    const hasHalfStar = clampedRating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars: React.ReactElement[] = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <Image
                key={`full-${i}`}
                src="/icons/star-svgrepo-com.svg"
                alt="Full star"
                width={20}
                height={20}
                className="inline-block"
            />
        );
    }

    // Add half star if needed
    if (hasHalfStar) {
        stars.push(
            <Image
                key="half"
                src="/icons/star-half-alt-svgrepo-com.svg"
                alt="Half star"
                width={20}
                height={20}
                className="inline-block"
            />
        );
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <Image
                key={`empty-${i}`}
                src="/icons/star-svgrepo-com.svg"
                alt="Empty star"
                width={20}
                height={20}
                className="inline-block opacity-30"
            />
        );
    }

    return stars;
};