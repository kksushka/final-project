import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import SearchInput from './Search/SearchInput';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

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
        <SearchInput />
        <div className="header__right" ref={dropdownRef}>
          <div className="header__user" onClick={toggleDropdown}>
            <div className="header__initials">KK</div>
            <span className="header__name">Kseniya Kisel</span>
            <div className={`header__arrow ${dropdownOpen ? 'header__arrow--up' : ''}`}>
              <span className="header__arrow-line"></span>
              <span className="header__arrow-line"></span>
            </div>
          </div>

          {dropdownOpen && (
            <div className="header__dropdown">
              <button onClick={() => navigate('/signin')}>Sign In</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}