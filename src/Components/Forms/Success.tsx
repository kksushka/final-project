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
    <div className="form__success">
      <p className="form__success__text">Nice to see you again!</p>
      <button onClick={handleClick} className="form__success__btn">Go home</button>
    </div>
  );
}
