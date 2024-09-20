import LayoutLinks from '@/components/LayoutLinks';
import { getDrinkBySlug } from '@/lib/api';
import Link from 'next/link';
import React from 'react';

export default async function CoffeeLayout({
    params,
    children,
}: Readonly<{
    params: { coffeeName: string }
    children: React.ReactNode
}>) {
    const drink = await getDrinkBySlug(params.coffeeName);

    return (
        <div className="flex">
            <div className="mx-3">
                <Link href="/">
                    <h1>COFFEE ZONE</h1>
                </Link>
                <LayoutLinks />
            </div>
            <div className="flex-1">
                <div className="mb-4 flex">
                    <div className="flex-1">
                        <h2>{drink.name}</h2>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
