import { Character } from "rickmortyapi/dist/interfaces";
import BlurImage from "../BlurImage";
import Box from "../Box";

const CharacterCard = ({ character }: { character: Character }) => {
	return (
		<Box
			key={character.id}
			css={{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "auto",
				aspectRatio: "8 / 7",
			}}>
			<BlurImage src={character.image} objectFit="cover" layout="fill" />
		</Box>
	);
};

export default CharacterCard;
