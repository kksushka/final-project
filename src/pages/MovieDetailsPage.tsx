import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById } from '../store/slices/selectedMovieSlice';

const MovieDetailsPage = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { movie, loading, error } = useSelector((state: RootState) => state.selectedMovie);

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieById(imdbID));
    }
  }, [imdbID, dispatch]);

  if (loading) return <p className='loading-indicator'>Loading...</p>;
  if (error) return <p className='error-message'>Error: {error}</p>;
  if (!movie) return <p className='error-message'>Movie not found.</p>;

  return (

      <div className="movie-details">
        <div className='movie-details__btn'>
              <button onClick={() => navigate(-1)} className="movie-details__back-btn">
        Back
      </button>
      </div>
        <div className="movie-details__container">
        <div className="movie-details__main">
          <div className="movie-details__poster-wrapper">
            <img className='movie-details__poster'
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={movie.Title}
            />
          </div>
          <div className="movie-details__info">
            <h2 className="movie-details__title">{movie.Title}</h2>
            <p className='movie-details__meta'><strong>Year:</strong> {movie.Year}</p>
            <p className='movie-details__meta'><strong>Type:</strong> {movie.Type}</p>
            <p className='movie-details__meta'><strong>IMDb ID:</strong> {movie.imdbID}</p>
            <p className='movie-details__meta'><strong>Plot:</strong> {movie.Plot}</p>
          </div>
        </div>
        </div>
      </div>

  );
};

export default MovieDetailsPage;
