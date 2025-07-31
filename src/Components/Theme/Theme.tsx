import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import type { RootState } from '../../store/store';

export default function Theme() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored && stored !== theme) {
      dispatch(toggleTheme());
    }
  }, []);

  return (
    <div className="settings">
      <h1 className="settings__title">Theme</h1>
      <div className="settings__content">
        <div className="settings__info">
          <span className='settings__info-title'>{theme === 'light' ? 'Light Mode' : 'Dark mode'}</span>
          <span className='settings__info-subtitle'>You use {theme === 'light' ? 'light' : 'dark'} theme</span>
        </div>
        <button
          className="settings__toggle"
          onClick={() => dispatch(toggleTheme())}
          aria-label="Change mode"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
}
