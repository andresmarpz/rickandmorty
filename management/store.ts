import create from 'zustand';

export type pageType = 'characters' | 'locations' | 'episodes';

interface StoreType {
	charactersPage: number,
	locationsPage: number,
	episodesPage: number,
	setPage: (page: pageType, pageNumber: number) => void,
}

const useStore = create<StoreType>((set) => ({
	charactersPage: 1,
	locationsPage: 1,
	episodesPage: 1,
	setPage: (pageType: pageType, page: number) => set({ [`${pageType}Page`]: page }),
}));

export default useStore