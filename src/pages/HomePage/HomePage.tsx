import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../store/slices/movieSlice';
import type { AppDispatch, RootState } from '../../store/store';
import MovieList from '../../Components/MovieCardList';
import { ErrorMessage, ErrorMessageContainer } from './styles';
import { useEffect } from 'react';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    state,
    error,
    total,
    movieQuery,
    currentPage
  } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(getMovies({ query: movieQuery, page: currentPage }));
  }, []);

  const handlePageChange = (page: number) => {
    dispatch(getMovies({ query: movieQuery, page }));
  };

  return (
    <>
      {state === 'loading' && (
        <div className="loading-indicator">
          Loading...
        </div>
      )}

      {state === 'failed' && (
        <ErrorMessageContainer>
          <ErrorMessage>
            {error || 'Something went wrong... Plesae try again one more time.'}
          </ErrorMessage>
        </ErrorMessageContainer>
      )}

      {state === 'loaded' && (
        <MovieList
          movies={movies}
          currentPage={currentPage}
          totalPages={Math.ceil(total / 10)}
          onPageChange={handlePageChange}
        />
      )}

      {
        state === 'init' && (
          <div className='welcome-message-wrapper'>
            <p className='welcome-message'>
              Welcome! To start explore movies type something in search bar.
            </p>
          </div>
        )
      }
    </>
  );
}