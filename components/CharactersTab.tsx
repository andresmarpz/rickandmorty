import { useCharacters } from "@/hooks/useCharacters";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import React, { useCallback, useEffect, useState } from "react";
import { getCharacters } from "rickmortyapi";
import { Character } from "rickmortyapi/dist/interfaces";
import Box from "./Box";
import CharacterCard from "./CharacterCard";
import Controls from "./Controls";
import Grid from "./Grid";

interface Props {
	characters: Character[];
}

const CharactersTab = ({ characters: initalCharacters }: Props & React.ComponentProps<"div">) => {
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
	);
};

export default CharactersTab;
