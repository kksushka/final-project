import { Link } from 'react-router';

function NotFoundPage() {
    return (
            <div className="not-found">
                <h1 className="not-found__title">404 - Page Not Found</h1>
                <p className="not-found__text">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link to="/" className="not-found__link">Return</Link>
            </div>
    );
}

export default NotFoundPage;
