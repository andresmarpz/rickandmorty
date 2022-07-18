import { useCharacters } from "@/hooks/useCharacters";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { styled } from "@/stitches.config";
import { useCallback, useEffect, useState } from "react";
import { getCharacters } from "rickmortyapi";
import { Character } from "rickmortyapi/dist/interfaces";
import Box from "./Box";
import CharacterCard from "./CharacterCard";
import Controls from "./Controls";
import Grid from "./Grid";

interface Props {
	characters: Character[];
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

const CharactersTab = ({ characters: initalCharacters }: Props) => {
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);

	const [mounted, setMounted] = useState(false);
	useEffectOnce(() => setMounted(true));

	const { characters, isError, mutate } = useCharacters(page, initalCharacters);

	const fetchNewPage = useCallback(async () => {
		setLoading(true);
		const data = await getCharacters({ page });
		setLoading(false);
		mutate(data);
	}, [page, mutate, setLoading]);

	useEffect(() => {
		if (!mounted) return;

		fetchNewPage();
	}, [page, mounted, fetchNewPage]);

	if (isError) return <div>Error loading characters.</div>;
	if (!characters) return <div>Loading...</div>;

	return (
		<Box>
			<Controls page={page} setPage={setPage} loading={loading} />
			<Grid>
				{characters.map((character) => (
					<CharacterCard key={character.id} character={character} />
				))}
			</Grid>
		</Box>

		// <Box css={{ color: "$gray12", paddingBottom: 40 }}>
		// 	<Subtitle>Page {page}</Subtitle>
		// 	<Box
		// 		css={{
		// 			display: "flex",
		// 			alignItems: "center",
		// 			gap: 6,
		// 			marginBottom: 10,
		// 		}}>
		// 		<Control onClick={() => setPage((page) => (page > 1 ? page - 1 : page))} disabled={page === 1}>
		// 			<LeftArrow />
		// 		</Control>
		// 		<Control onClick={() => setPage((page) => (page < 42 ? page + 1 : page))} disabled={page === 42}>
		// 			<RightArrow />
		// 		</Control>
		// 		<Span visible={loading}>
		// 			<Spinner />
		// 		</Span>
		// 	</Box>
		// 	<Grid>
		// 		{characters.map((character) => (
		// 			<CharacterCard key={character.id} character={character} />
		// 		))}
		// 	</Grid>
		// </Box>
	);
};

export default CharactersTab;
