import { styled } from "@/stitches.config";
import type { Character, Episode, Location } from "rickmortyapi/dist/interfaces";

import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import CharactersTab from "./CharactersTab";
import EpisodesTab from "./EpisodesTab";
import LocationsTab from "./LocationsTab";

const Root = styled(Tabs.Root, {
	width: "100%",
});
const List = styled(Tabs.List, {
	display: "flex",
});

const Trigger = styled(Tabs.Trigger, {
	all: "unset",

	color: "$gray10",
	padding: 6,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flex: 1,
	"&:hover": { color: "$gray12" },
	'&[data-state="active"]': {
		color: "$gray12",
		boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
	},
	"&:focus": { position: "relative", boxShadow: `0 0 0 2px black` },
});

const Content = styled(Tabs.Content, {
	marginTop: 8,
});

interface Props {
	initialProps: {
		characters: Character[];
		locations: Location[];
		episodes: Episode[];
	};
}

const Gallery = ({ initialProps }: Props) => {
	const [value, setValue] = useState<string>("characters");

	/*
	
		In this case I opted to keep tabs mounted but hidden.
		This is because I need to keep the tabs mounted in the DOM
		so as not to lose state and keep a smooth transition between
		them. Otherwise, it would have to re-fetch the data, and
		even though it's cached, it still shows the loading state for a brief
		moment.
	
	*/
	return (
		<>
			<Root defaultValue="characters" onValueChange={(value) => setValue(value)}>
				<List>
					<Trigger value="characters">Characters</Trigger>
					<Trigger value="locations">Locations</Trigger>
					<Trigger value="episodes">Episodes</Trigger>
				</List>
				<Content value="characters" forceMount hidden={value !== "characters"}>
					<CharactersTab characters={initialProps.characters} />
				</Content>
				<Content value="locations" forceMount hidden={value !== "locations"}>
					<LocationsTab locations={initialProps.locations} />
				</Content>
				<Content value="episodes" forceMount hidden={value !== "episodes"}>
					<EpisodesTab episodes={initialProps.episodes} />
				</Content>
			</Root>
		</>
	);
};
export default Gallery;
