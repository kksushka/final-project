import { useSelector } from 'react-redux';
import './Layout.scss';
import Header from '../Components/Header';
import Sidebar from '../Components/SideBar';
import type { RootState } from '../store/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

export default function Layout() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={`layout ${theme}`}>
      <Header />
      <div className="layout__body">
        <Sidebar />
        <main className="layout__content">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}
