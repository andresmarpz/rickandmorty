import { getLocations } from 'rickmortyapi';
import type { KeyedMutator } from 'swr';
import useSWRImmutable from 'swr';

import type { ApiResponse, Info, Location } from 'rickmortyapi/dist/interfaces';

export const useLocations = (page = 1, initialProps?: Location[]): {
	locations: Location[] | undefined;
	mutate: KeyedMutator<ApiResponse<Info<Location[]>>>;
	isLoading: boolean;
	isError: boolean;
} => {
	const { data, error, mutate } = useSWRImmutable('/api/locations', async () => {
		return await getLocations({ page: page })
	});

	return {
		locations: data ? data.data.results : initialProps,
		mutate: mutate,
		isLoading: !error && !data,
		isError: error
	}
}