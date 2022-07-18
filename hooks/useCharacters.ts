import { getCharacters } from 'rickmortyapi';
import type { KeyedMutator } from 'swr';
import useSWRImmutable from 'swr';

import type { ApiResponse, Character, Info } from 'rickmortyapi/dist/interfaces';

export const useCharacters = (page = 1, initialProps?: Character[] | undefined): {
	characters: Character[] | undefined;
	mutate: KeyedMutator<ApiResponse<Info<Character[]>>>;
	isLoading: boolean;
	isError: boolean;
} => {
	// using immutable swr to avoid unnecesary revalidation since the data won't ever
	// change unless the page changes.
	const { data, error, mutate, isValidating } = useSWRImmutable('/api/character', async () => {
		return await getCharacters({ page: page })
	});

	return {
		characters: data ? data.data.results : initialProps,
		mutate: mutate,
		isLoading: !error && !data || isValidating,
		isError: error
	}
}