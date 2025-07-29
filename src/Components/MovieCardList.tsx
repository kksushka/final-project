import type { Movie } from '../Types/Movie';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

interface Props {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function MovieList({ 
  movies, 
  currentPage, 
  totalPages, 
  onPageChange 
}: Props) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <p>No movies found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="movie__grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}