import type { EntryCollection, EntrySkeletonType } from 'contentful';
import { TypeDrinksSkeleton } from '@/lib/contentfulTypes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const extractFieldsFromItems = <TSkeleton extends EntrySkeletonType>(
    entries: EntryCollection<TSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>
) => entries.items.map(i => i.fields)[0];
export type Fields<T extends EntrySkeletonType> = ReturnType<
  typeof extractFieldsFromItems<T>
>;

export const drinksTag = 'drinks';

export async function fetchRest<TReturn extends EntrySkeletonType>(
    searchParams: URLSearchParams
): Promise<EntryCollection<TReturn, 'WITHOUT_UNRESOLVABLE_LINKS'>> {
    const accessToken = process.env.CONTENTFUL_PREVIEW_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;
    const subdomain = process.env.CONTENTFUL_PREVIEW_TOKEN ? 'preview' : 'cdn';
    return fetch(
        `https://${subdomain}.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?${searchParams.toString()}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            // NextJs v14 default behaviour is 'force-cache'. Will change in v15 to be 'no-store'.
            // cache: "no-store",
            next: { tags: [drinksTag] },
        },
    ).then(response => response.json());
}

const extractFirstImageUrl = (
    fetchResponse: EntryCollection<TypeDrinksSkeleton>
): string | undefined => {
    const assets = fetchResponse.includes?.Asset;
    if (!assets || assets.length < 1) {
        return undefined;
    }
    const assetFile = assets[0].fields.file;
    return 'https:' + assetFile?.url;
};

export type DrinkWithUrl = Fields<TypeDrinksSkeleton> & {
    id: string
    url: string | undefined
};

function extractDrinkRest(
    fetchResponse: EntryCollection<
        TypeDrinksSkeleton,
        'WITHOUT_UNRESOLVABLE_LINKS'
    >
): DrinkWithUrl {
    const entry = extractDrinksRest(fetchResponse)[0];
    const id = fetchResponse.items[0].sys.id;
    return {
        ...entry,
        id,
        url: extractFirstImageUrl(fetchResponse),
    };
}

function extractDrinksRest(
    fetchResponse: EntryCollection<
        TypeDrinksSkeleton,
        'WITHOUT_UNRESOLVABLE_LINKS'
    >
): Array<Fields<TypeDrinksSkeleton>> {
    return fetchResponse.items.map(i => i.fields);
}

export async function getDrinkBySlug(slug: string): Promise<DrinkWithUrl> {
    const searchParams = {
        'fields.slug': slug,
        'content_type': 'drinks',
    };
    const entry = await fetchRest<TypeDrinksSkeleton>(
        new URLSearchParams(searchParams)
    );
    return extractDrinkRest(entry);
}

export async function getAllDrinks(): Promise<Array<Fields<TypeDrinksSkeleton>>> {
    const searchParams = new URLSearchParams('content_type=drinks');
    const entries = await fetchRest<TypeDrinksSkeleton>(searchParams);
    return extractDrinksRest(entries);
}
