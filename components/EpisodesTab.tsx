import React from "react";
import type { Episode } from "rickmortyapi/dist/interfaces";

interface Props {
	episodes: Episode[];
}

const EpisodesTab = ({ episodes: initialEpisodes }: Props & React.ComponentProps<"div">) => {
	return (
		<div>
			{initialEpisodes.map((episode) => (
				<div key={episode.id}>{episode.name}</div>
			))}
		</div>
	);
};

export default EpisodesTab;