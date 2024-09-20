import React from 'react';
import { getDrinkBySlug } from '@/lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { CustomisationForm } from '@/components/CustomisationForm';

export default async function CoffeePage({
    params,
}: {
    params: { coffeeName: string }
}) {
    const { coffeeName } = params;
    const drink = await getDrinkBySlug(coffeeName);
    return (
        <div>
            <img
                src={drink?.url || ''}
                alt={drink?.name}
            />
            <div className="mb-5">{drink?.taste ? documentToReactComponents(drink.taste) : null}</div>
            <CustomisationForm />
        </div>
    );
}
