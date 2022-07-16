import { getEpisodes } from 'rickmortyapi';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import type { ApiResponse, Episode, Info } from 'rickmortyapi/dist/interfaces';

export const useEpisodes = (page = 1): {
	characters: Episode[] | undefined;
	mutate: KeyedMutator<ApiResponse<Info<Episode[]>>>;
	isLoading: boolean;
	isError: boolean;
} => {
	const { data, error, mutate } = useSWR('/api/episode', async () => {
		return await getEpisodes({ page: page })
	});

	return {
		characters: data?.data.results,
		mutate: mutate,
		isLoading: !error && !data,
		isError: error
	}
}