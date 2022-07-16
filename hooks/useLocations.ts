import { getLocations } from 'rickmortyapi';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import type { ApiResponse, Info, Location } from 'rickmortyapi/dist/interfaces';

export const useLocations = (page = 1): {
	characters: Location[] | undefined;
	mutate: KeyedMutator<ApiResponse<Info<Location[]>>>;
	isLoading: boolean;
	isError: boolean;
} => {
	const { data, error, mutate } = useSWR('/api/episode', async () => {
		return await getLocations({ page: page })
	});

	return {
		characters: data?.data.results,
		mutate: mutate,
		isLoading: !error && !data,
		isError: error
	}
}