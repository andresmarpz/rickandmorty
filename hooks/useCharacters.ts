import { getCharacters } from 'rickmortyapi';
import useSWRImmutable, { mutate } from 'swr';

import type { Character } from 'rickmortyapi/dist/interfaces';

const fetchMore = async (page = 1) => {
	const response = await getCharacters({ page });
	mutate('/api/character', response.data.results);
	return response.data.results;
}

export const useCharacters = (page = 1, initialProps?: Character[] | undefined): {
	characters: Character[] | undefined;
	fetchMore: (page: number) => Promise<Character[] | undefined>
	isLoading: boolean;
	isError: boolean;
} => {
	// using immutable swr to avoid unnecesary revalidation since the data won't ever
	// change unless the page changes.
	const { data, error, isValidating } = useSWRImmutable('/api/character', async () => {
		return await getCharacters({ page: page })
	});

	return {
		characters: data?.data ? data.data.results : initialProps,
		fetchMore: fetchMore,
		isLoading: !error && !data || isValidating,
		isError: error
	}
}