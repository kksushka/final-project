import axios from "axios";
import type { Movie } from "../Types/Movie";

const API_KEY = '35b30234';
const BASE_URL = 'https://omdbapi.com/';

export const fetchMoviesBySearch = async (
  query: string,
  page = 1,
  year?: string,
  type?: string
) => {
  const params: Record<string, string> = {
    apikey: API_KEY,
    s: query,
    page: page.toString(),
  };

  if (year) {
    params.y = year;
  }

  if ((type || '').length > 0) {
    params.type = type!;
  }

  const response = await axios.get(BASE_URL, { params });

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'Movies not found');
  }

  return response.data;
};

export const fetchMovieDetails = async (id: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: 'full',
    },
  });

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'Movie details not found');
  }

  return response.data;
};

export const fetchMultipleMoviePages = async (query: string, maxPages = 10) => {
  const allResults: Movie[] = [];

  for (let page = 1; page <= maxPages; page++) {
    try {
      const data = await fetchMoviesBySearch(query, page);
      allResults.push(...data.Search);

      const total = parseInt(data.totalResults, 10);
      const totalPages = Math.ceil(total / 10);

      if (page >= totalPages) break;
    } catch (error) {
      break; 
    }
  }

  return allResults; 
};
