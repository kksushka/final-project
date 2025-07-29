import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../store/slices/movieSlice';
import type { AppDispatch, RootState } from '../store/store';
import MovieList from '../Components/MovieCardList';

const DEFAULT_SEARCH_QUERY = 'marvel';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    movies, 
    loading, 
    error, 
    total, 
    currentQuery, 
    currentPage 
  } = useSelector((state: RootState) => state.movies);
  
  useEffect(() => {
    if (currentQuery === '' && movies.length === 0) {
      dispatch(getMovies({ query: DEFAULT_SEARCH_QUERY, page: 1 }));
    }
  }, [dispatch, currentQuery, movies.length]);

  const handlePageChange = (page: number) => {
    const queryToUse = currentQuery || DEFAULT_SEARCH_QUERY;
    dispatch(getMovies({ query: queryToUse, page }));
  };

  return (
    <>
      {loading && currentQuery && (
        <div className="loading-indicator">
          Loading...
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <MovieList
        movies={movies}
        currentPage={currentPage}
        totalPages={Math.ceil(total / 10)}
        onPageChange={handlePageChange}
      />
    </>
  );
}