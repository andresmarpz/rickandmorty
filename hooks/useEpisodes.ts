import { getEpisodes } from 'rickmortyapi';
import useSWRImmutable, { mutate } from 'swr';

import type { Episode } from 'rickmortyapi/dist/interfaces';

const fetchMore = async (page = 1) => {
	const response = await getEpisodes({ page });
	mutate('/api/episode', response.data.results);
	return response.data.results;
}

export const useEpisodes = (page = 1, initialProps?: Episode[]): {
	episodes: Episode[] | undefined;
	fetchMore: (page: number) => Promise<Episode[] | undefined>
	isLoading: boolean;
	isError: boolean;
} => {
	const { data, error } = useSWRImmutable('/api/episode', async () => {
		return await getEpisodes({ page: page })
	});

	return {
		episodes: data?.data ? data.data.results : initialProps,
		fetchMore: fetchMore,
		isLoading: !error && !data,
		isError: error
	}
}