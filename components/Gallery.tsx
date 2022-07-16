import { useCharacters } from "@/hooks/useCharacters";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useEffect, useState } from "react";
import { getCharacters } from "rickmortyapi";
import Box from "./Box";
import CharacterCard from "./CharacterCard";

import { styled } from "@/stitches.config";
import type { ApiResponse, Character, Info } from "rickmortyapi/dist/interfaces";
import LeftArrow from "./svgs/LeftArrow";
import RightArrow from "./svgs/RightArrow";

interface CharactersProps {
	page: number;
	initialProps: ApiResponse<Info<Character[]>>;
}

const Grid = styled("div", {
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gridGap: "12px",
	margin: "auto",
	"@sm": {
		gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
	},
	"@lg": {
		gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
	},
});

const Subtitle = styled("h2", {
	fontSize: "18px",
	fontWeight: 400,
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

const Characters = ({ page, initialProps }: CharactersProps) => {
	const [mounted, setMounted] = useState(false);
	useEffectOnce(() => setMounted(true));

	const [lastPage, setLastPage] = useState<number>(page);

	// initial data, then prefetched page
	// this is the data displayed
	const [data, setData] = useState<Character[] | undefined>(initialProps.data.results);

	// always keep the next page ready with SWR
	// mutated to page +1 on page change
	const { characters, isError, mutate } = useCharacters(page + 1);

	// fetch the next page, mutate SWR data
	const fetchCharacters = async (page: number = 1) => {
		setData(characters);
		const res = await getCharacters({ page });
		mutate(res, false);
	};

	// execute fetchCharacters every time the page changes
	useEffect(() => {
		if (!mounted) return;

		fetchCharacters(page < lastPage ? page - 1 : page);
	}, [page, fetchCharacters]);

	if (!data || !mounted) return <div>Loading..</div>;
	if (isError) return <div>Error</div>;

	return (
		<Grid>
			{data.map((character) => (
				<CharacterCard key={character.id} character={character} />
			))}
		</Grid>
	);
};

const Episodes = () => {
	return <Box></Box>;
};

const Locations = () => {
	return <Box></Box>;
};

type displays = "Characters" | "Episodes" | "Locations";

const Gallery = ({ initialProps }: { initialProps: ApiResponse<Info<Character[]>> }) => {
	const [page, setPage] = useState<number>(1);

	const [display, setDisplay] = useState<displays>("Characters");

	const getComponent = () => {
		switch (display) {
			case "Characters":
				return <Characters initialProps={initialProps} page={page} />;
			case "Episodes":
				return <Episodes />;
			case "Locations":
				return <Locations />;
			default:
				return <div>Invalid display type</div>;
		}
	};

	return (
		<Box css={{ color: "$gray12" }}>
			<Box
				css={{
					display: "flex",
					alignItems: "center",
					gap: 10,
				}}>
				<Subtitle>Page {page}</Subtitle>
				<Control onClick={() => setPage((page) => (page > 1 ? page - 1 : page))} disabled={page === 1}>
					<LeftArrow />
				</Control>
				<Control onClick={() => setPage((page) => (page < 42 ? page + 1 : page))} disabled={page === 42}>
					<RightArrow />
				</Control>
			</Box>
			{getComponent()}
		</Box>
	);
};

export default Gallery;
