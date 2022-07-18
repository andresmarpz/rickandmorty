import { styled } from "@/stitches.config";
import React, { useState } from "react";
import { Location } from "rickmortyapi/dist/interfaces";
import Box from "./Box";
import Controls from "./Controls";
import Grid from "./Grid";

interface Props {
	locations: Location[];
}

const Span = styled("span", {
	variants: {
		visible: {
			false: {
				visibility: "hidden",
			},
			true: {
				visibility: "visible",
			},
		},
	},
});

const Subtitle = styled("h2", {
	fontSize: "18px",
	fontWeight: 400,
	marginY: 4,
	lineHeight: 1.2,
});

const Control = styled("button", {
	background: "$gray3",
	border: "1px solid $gray6",
	borderRadius: 4,
	padding: "4px 8px",
	cursor: "pointer",

	transition: "all .1s ease",
	"&:hover": {
		backgroundColor: "$gray2",
	},
	"&:focus": {
		borderColor: "$gray5",
	},
});

const LocationsTab = ({ locations: initialLocations }: Props & React.ComponentProps<"div">) => {
	const [page, setPage] = useState<number>(1);
	const [loading] = useState<boolean>(false);

	return (
		<Box>
			<Controls page={page} setPage={setPage} loading={loading} />
			<Grid>
				{initialLocations.map((location) => (
					<div key={location.id}>{location.name}</div>
				))}
			</Grid>
		</Box>
	);
};

export default LocationsTab;
