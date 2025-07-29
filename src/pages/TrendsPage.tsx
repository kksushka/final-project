import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import MovieList from '../Components/MovieCardList';

export default function TrendsPage() {
  const { movies } = useSelector((state: RootState) => state.movies);

  const trendingMovies = movies
    .filter((movie) => movie.rating && movie.rating >= 8)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); 

  return (
    <div>
      <MovieList
        movies={trendingMovies}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />
    </div>
  );
}
