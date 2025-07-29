import { useNavigate } from 'react-router';

interface SignUpSuccessProps {
    onClick?: () => void;
}

export function SignUpSuccess({ onClick }: SignUpSuccessProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        onClick?.();
        navigate('/');
    };

    return (
        <div className="confirmation">
            <p className="confirmation__text">
                Registration Successful! Nice to meet you in our App!
            </p>
            <button onClick={handleClick} className="confirmation__btn">
                Confirm
            </button>
        </div>
    );
}
