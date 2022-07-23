import create from 'zustand';

type pageType = 'characters' | 'locations' | 'episodes';

const useStore = create((set) => ({
	charactersPage: 0,

	setCharactersPage: (page: number) => set((state) => ({ charactersPage: page })),

	locationsPage: 0,
	setLocationsPage: (page: number) => set((state) => ({ locationsPage: page })),

	episodesPage: 0,
	setEpisodesPage: (page: number) => set((state) => ({ episodesPage: page })),
}));