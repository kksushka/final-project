import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Layout.scss';
import Sidebar from '../Components/SideBar';
import type { RootState } from '../store/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Header from '../Components/Header';

export default function Layout() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`layout ${theme} ${sidebarOpen ? 'layout--sidebar-open' : ''}`}>
      <Header toggleSidebar={toggleSidebar} />
      <div className="layout__body">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}