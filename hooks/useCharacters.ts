import { getCharacters } from 'rickmortyapi';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import type { ApiResponse, Character, Info } from 'rickmortyapi/dist/interfaces';

export const useCharacters = (page: number = 1): {
	characters: Character[] | undefined;
	mutate: KeyedMutator<ApiResponse<Info<Character[]>>>;
	isLoading: boolean;
	isError: boolean;
} => {
	const { data, error, mutate } = useSWR('/api/character', async () => {
		return await getCharacters({ page: page })
	});

	return {
		characters: data?.data.results,
		mutate: mutate,
		isLoading: !error && !data,
		isError: error
	}
}