export type MovieType = 'movie' | 'series' | 'episode';

export interface Movie {
  Title: string;    
  Year: string;     
  imdbID: string;   
  Type: MovieType; 
  Poster: string;   
  Plot?: string;
  isFavorite?: boolean; 
  rating?: number;
}
