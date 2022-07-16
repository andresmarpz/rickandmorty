import { Character } from "@/types";
import BlurImage from "./BlurImage";
import Box from "./Box";

const CharacterCard = ({ character }: { character: Character }) => {
	return (
		<Box
			key={character.id}
			css={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				border: "1px solid $gray4",
				borderRadius: 4,
			}}>
			<span>{character.name}</span>
			<BlurImage src={character.image} width={200} height={175} objectFit="cover" />
		</Box>
	);
};

export default CharacterCard;
