import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import MovieCard from '../Components/MovieCard';

export default function FavoriteMovies() {
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);
  const favorites = movies.filter(movie => movie.isFavorite);

  if (loading) {
    return (
      <div className="favorites-container">
        <div className="loading-indicator">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favorites-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You don't have any favorite movies yet...</p>
          <p>Click the star icon on movie cards to add them to favorites.</p>
        </div>
      ) : (
        <>
          <div className="favorites-count">
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} in favorites
          </div>
          <div className="movie__grid">
            {favorites.map(movie => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}