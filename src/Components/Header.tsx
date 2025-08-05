import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../store/slices/authSlice';
import SearchInput from './Search/SearchInput';
import type { RootState } from '../store/store';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { name, surname } = useSelector((state: RootState) => state.auth);
  const initials = `${name[0] ?? ''}${surname[0] ?? ''}`.toUpperCase();

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/signin');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='header-wrapper'>
      <header className="header">
        <div className="sidebar__logo-wrapper">
          <p className='sidebar__logo'><span className='sidebar__logo-span'>pix</span>ema</p>
        </div>
        <SearchInput />
        <div className="header__right" ref={dropdownRef}>
          <div className="header__user" onClick={toggleDropdown}>
            <div className="header__initials">{initials}</div>
            <span className="header__name">{name} {surname}</span>
            <div className={`header__arrow ${dropdownOpen ? 'header__arrow--up' : ''}`}>
              <span className="header__arrow-line"></span>
              <span className="header__arrow-line"></span>
            </div>
          </div>

          {dropdownOpen && (
            <div className="header__dropdown">
              <button onClick={() => navigate('/signin')}>Sign In</button>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
