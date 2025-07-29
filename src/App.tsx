import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/SettingsPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Layout from './Layout/Layout';
import NotFoundPage from './pages/NotFoundPage';
import FavoriteMoviesPage from './pages/FavoriteMoviesPage';
import TrendsPage from './pages/TrendsPage';

export default function App() {
  return (

      <Routes>
        <Route element={<Layout />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/movie/:imdbID" element={<MovieDetailsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

  );
}
