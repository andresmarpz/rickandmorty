import React, { useState } from "react";
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

	return (
		<Box>
			<Controls page={page} setPage={setPage} loading={loading} />
			{initialEpisodes.map((episode) => (
				<EpisodeCard key={episode.id} episode={episode} />
			))}
		</Box>
	);
};

export default EpisodesTab;
