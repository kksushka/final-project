import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignInPage';
import SettingsPage from './pages/SettingsPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Layout from './Layout/Layout';
import NotFoundPage from './pages/NotFoundPage';
import FavoriteMoviesPage from './pages/FavoriteMoviesPage';
import TrendsPage from './pages/TrendsPage';
import PrivateRoute from './utils/PrivateRoute';

export default function App() {
    
  return (

    <Routes>
      <Route element={<Layout />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/movie/:imdbID" element={<MovieDetailsPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="/favorites" element={
          <PrivateRoute>
            <FavoriteMoviesPage />
          </PrivateRoute>
        } />

        <Route path="/settings" element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        } />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>

  );
}
