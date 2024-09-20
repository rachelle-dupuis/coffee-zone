import React from 'react';
import { getAllDrinks } from '@/lib/api';
import Link from 'next/link';

export default async function LayoutLinks() {
    const drinks = await getAllDrinks();
    return (
        <>
            {drinks.map(drink => (
                <div key={drink.name}>
                    <Link
                        href={`/coffee/${drink.slug}`}
                    >
                        {drink.name}
                    </Link>
                </div>
            ))}
        </>
    );
}
