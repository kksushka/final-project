import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import type { Movie } from '../Types/Movie';
import { toggleFavorite } from '../store/slices/movieSlice';
import { useCallback } from 'react';

interface MovieProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/movie/${movie.imdbID}`);
  }, [movie.imdbID, navigate]);

  return (
    <div className="movie-card">
      <div className="movie-card__image" onClick={handleClick}>
        {movie.rating && (
          <div
            className={`movie-card__bookmark ${movie.rating >= 8
                ? 'green'
                : movie.rating >= 5
                  ? 'yellow'
                  : 'red'
              }`}
          >
            <span className="movie-card__rating">{movie.rating}</span>
          </div>
        )}
        <img
          src={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/180x260?text=No+Image'
          }
          alt={movie.Title}
        />
      </div>

      <div className="movie-card__info">
        <h3 className="movie-card__title" onClick={handleClick}>
          {movie.Title}
        </h3>
        <div className='movie-card__meta'>
          <p className="movie-card__year">༚ {movie.Year}</p>
          <p className="movie-card__type">༚ {movie.Type}</p>
        </div>
      </div>

      <button
        className="movie-card__fav"
        onClick={() => dispatch(toggleFavorite(movie.imdbID))}
      >
        {movie.isFavorite ? '★' : '☆'}
      </button>
    </div>
  );
}
