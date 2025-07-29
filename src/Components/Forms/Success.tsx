import { useNavigate } from 'react-router';

interface SuccessProps {
  onClick?: () => void; 
}

export function Success({ onClick }: SuccessProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.(); 
    navigate('/'); 
  };

  return (
    <div className="success">
      <p className="success__text">Nice to see you again!</p>
      <button onClick={handleClick} className="success__btn">Go home</button>
    </div>
  );
}
