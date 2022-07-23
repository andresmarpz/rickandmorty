import { getLocations } from 'rickmortyapi';
import useSWRImmutable, { mutate } from 'swr';

import type { Location } from 'rickmortyapi/dist/interfaces';

const fetchMore = async (page = 1) => {
	const response = await getLocations({ page });
	mutate('/api/location', response.data.results);
	return response.data.results;
}

export const useLocations = (page = 1, initialProps?: Location[]): {
	locations: Location[] | undefined;
	fetchMore: (page: number) => Promise<Location[] | undefined>
	isLoading: boolean;
	isError: boolean;
} => {
	const { data, error } = useSWRImmutable('/api/location', async () => {
		return await getLocations({ page: page })
	});

	return {
		locations: data?.data ? data.data.results : initialProps,
		fetchMore: fetchMore,
		isLoading: !error && !data,
		isError: error
	}
}