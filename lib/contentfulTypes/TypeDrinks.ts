import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful';

export interface TypeDrinksFields {
    name: EntryFieldTypes.Symbol
    image: EntryFieldTypes.AssetLink
    taste?: EntryFieldTypes.RichText
    slug: EntryFieldTypes.Symbol
}

export type TypeDrinksSkeleton = EntrySkeletonType<TypeDrinksFields, 'drinks'>;
export type TypeDrinks<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeDrinksSkeleton, Modifiers, Locales>;
