import type { MovieType } from "./Movie";

export interface MovieQuery {
    title: string;
    year?: string;
    type?: MovieType | ''
}

export const DefaultMovieQuery: MovieQuery = {
    title: ''
}