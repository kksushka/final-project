import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, clearError, resetToDefault } from '../../store/slices/movieSlice';
import type { AppDispatch, RootState } from '../../store/store';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 500;

export default function SearchInput() {
  const dispatch = useDispatch<AppDispatch>();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [yearFilter, setYearFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<'movie' | 'series' | 'episode' | 'game' | ''>('');

  const { error } = useSelector((state: RootState) => state.movies);
  const filterRef = useRef<HTMLDivElement>(null);

  const performSearch = useCallback(
    (query: string, year: string, type: string) => {
      const trimmedQuery = query.trim();
      if (trimmedQuery || year || type) {
        dispatch(getMovies({
          query: trimmedQuery,
          page: 1,
          year: year || undefined,
          type: type || undefined,
        }));
      } else {
        dispatch(resetToDefault());
      }
    },
    [dispatch]
  );

  const debouncedSearch = useCallback(
    debounce((q: string, y: string, t: string) => {
      performSearch(q, y, t);
    }, DEBOUNCE_DELAY),
    [performSearch]
  );

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query, yearFilter, typeFilter);
    } else {
      dispatch(resetToDefault());
    }
    return () => debouncedSearch.cancel();
  }, [query]);

  useEffect(() => {
    if (error) dispatch(clearError());
  }, [error, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleApplyFilters = () => {
    performSearch(query, yearFilter, typeFilter);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setQuery('');
    setYearFilter('');
    setTypeFilter('');
    dispatch(resetToDefault());
    setIsOpen(false); 
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search__input"
      />

      <button
        type="button"
        className="search__burger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line3"></div>
      </button>

      {isOpen && (
        <div className="search__filters" ref={filterRef}>
          <label>
            Year:
            <input
              type="number"
              placeholder="e.g. 2020"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            />
          </label>

          <label>
            Type:
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as 'movie' | 'series' | 'episode' | 'game' | '')
              }
            >
              <option value="">All</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
              <option value="game">Game</option>
            </select>
          </label>

          <div className="search__buttons">
            <button className='search__btn' onClick={handleApplyFilters}>Apply Filters</button>
            <button className='search__btn' onClick={handleClearFilters}>Clear Filters</button>
          </div>
        </div>
      )}
    </div>
  );
}
