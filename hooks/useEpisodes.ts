import { getEpisodes } from 'rickmortyapi';
import type { KeyedMutator } from 'swr';
import useSWRImmutable from 'swr';

import type { ApiResponse, Episode, Info } from 'rickmortyapi/dist/interfaces';

export const useEpisodes = (page = 1, initialProps?: Episode[]): {
	episodes: Episode[] | undefined;
	mutate: KeyedMutator<ApiResponse<Info<Episode[]>>>;
	isLoading: boolean;
	isError: boolean;
} => {
	const { data, error, mutate } = useSWRImmutable('/api/episode', async () => {
		return await getEpisodes({ page: page })
	});

	return {
		episodes: data ? data.data.results : initialProps,
		mutate: mutate,
		isLoading: !error && !data,
		isError: error
	}
}