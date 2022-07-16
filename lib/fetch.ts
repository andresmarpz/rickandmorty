import { Character } from "@/types";

const endpoint = 'https://rickandmortyapi.com/api';

export async function fetcher<JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init);
	return res.json();
}

export interface Response {
	info: {
		count: number,
		pages: number,
		next: string | null,
		prev: string | null
	},
	results: Character[]
}

export const getCharacters = async (page: number = 1) => {
	return await fetcher<Response>(`${endpoint}/character/?page=${page}`);
}