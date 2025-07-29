import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../store/slices/authSlice';

 export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
}