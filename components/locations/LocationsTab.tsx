import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useLocations } from "@/hooks/useLocations";
import React, { useCallback, useEffect, useState } from "react";
import { getLocations } from "rickmortyapi";
import { Location } from "rickmortyapi/dist/interfaces";
import Box from "../Box";
import Controls from "../Controls";
import LocationCard from "./LocationCard";

interface Props {
	locations: Location[];
}

const LocationsTab = ({ locations: initialLocations }: Props & React.ComponentProps<"div">) => {
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);

	const [mounted, setMounted] = useState(false);
	useEffectOnce(() => setMounted(true));

	const { locations, mutate } = useLocations(page, initialLocations);

	const fetchNewPage = useCallback(async () => {
		setLoading(true);
		const data = await getLocations({ page });
		setLoading(false);
		mutate(data);
	}, [page, mutate, setLoading]);

	useEffect(() => {
		if (!mounted) return;

		fetchNewPage();
	}, [page, mounted, fetchNewPage]);

	if (!locations || !mounted) return <div>Loading..</div>;

	return (
		<Box>
			<Controls page={page} setPage={setPage} loading={loading} max={7} />
			<Box>
				{locations.map((location) => (
					<LocationCard key={location.id} location={location} />
				))}
			</Box>
		</Box>
	);
};

export default LocationsTab;
