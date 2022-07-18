import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useEpisodes } from "@/hooks/useEpisodes";
import React, { useCallback, useEffect, useState } from "react";
import { getEpisodes } from "rickmortyapi";
import type { Episode } from "rickmortyapi/dist/interfaces";
import Box from "../Box";
import Controls from "../Controls";
import EpisodeCard from "./EpisodeCard";

interface Props {
	episodes: Episode[];
}

const EpisodesTab = ({ episodes: initialEpisodes }: Props & React.ComponentProps<"div">) => {
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);

	const [mounted, setMounted] = useState(false);
	useEffectOnce(() => setMounted(true));

	const { episodes, mutate } = useEpisodes(page, initialEpisodes);

	const fetchNewPage = useCallback(async () => {
		setLoading(true);
		const data = await getEpisodes({ page });
		setLoading(false);
		mutate(data);
	}, [page, mutate, setLoading]);

	useEffect(() => {
		if (!mounted) return;

		fetchNewPage();
	}, [page, mounted, fetchNewPage]);

	if (!episodes || !mounted) return <div>Loading..</div>;

	return (
		<Box>
			<Controls page={page} setPage={setPage} loading={loading} max={3} />
			{episodes.map((episode) => (
				<EpisodeCard key={episode.id} episode={episode} />
			))}
		</Box>
	);
};

export default EpisodesTab;
