import React, { useState } from "react";
import { Location } from "rickmortyapi/dist/interfaces";
import Box from "../Box";
import Controls from "../Controls";
import LocationCard from "./LocationCard";

interface Props {
	locations: Location[];
}

const LocationsTab = ({ locations: initialLocations }: Props & React.ComponentProps<"div">) => {
	const [page, setPage] = useState<number>(1);
	const [loading] = useState<boolean>(false);

	return (
		<Box>
			<Controls page={page} setPage={setPage} loading={loading} />
			<Box>
				{initialLocations.map((location) => (
					<LocationCard key={location.id} location={location} />
				))}
			</Box>
		</Box>
	);
};

export default LocationsTab;
