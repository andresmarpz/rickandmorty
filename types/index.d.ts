/*
	@origin: character's origin location
	@location: character's current location
	@image: character's image (300x300 px)
*/
export interface Character {
	id: number;
	name: string;
	status: 'Alive' | 'Dead' | 'unknown';
	species: string;
	type: string;
	gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
	origin: Location;
	location: Location;
	image: string;
	episode: Episode[]
	url: string;
	created: string;
}

export interface Location {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: Character[];
	url: string;
	created: string;
}

export interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: Character[];
	url: string;
	created: string;
}