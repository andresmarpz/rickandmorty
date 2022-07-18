import { Location } from "rickmortyapi/dist/interfaces";
import Box from "../Box";

interface Props {
	location: Location;
}

const LocationCard = ({ location }: Props) => {
	return (
		<Box
			css={{
				padding: "10px 12px",
				borderBottom: "1px solid $gray5",
				display: "flex",
				lineHeight: "1.35",
			}}>
			<Box
				css={{
					paddingRight: 12,
					color: "$gray11",
				}}>
				<Box>Name: </Box>
				<Box>Type: </Box>
				<Box>Dimension: </Box>
			</Box>
			<Box>
				<Box>{location.name}</Box>
				<Box>{location.type}</Box>
				<Box>{location.dimension}</Box>
			</Box>
		</Box>
	);
};

export default LocationCard;
