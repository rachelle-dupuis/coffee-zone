import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful';

export interface TypeBaristaFields {
    firstName?: EntryFieldTypes.Symbol
    lastName?: EntryFieldTypes.Symbol
}

export type TypeBaristaSkeleton = EntrySkeletonType<TypeBaristaFields, 'barista'>;
export type TypeBarista<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeBaristaSkeleton, Modifiers, Locales>;
