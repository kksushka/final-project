interface SignInFormProps {
    onClick: () => void,
}

export function SignInForm({ onClick }: SignInFormProps) {
    return (
        <form className="form__container">
            <input type="email" placeholder="Your email" className="form__input" />
            <input type="password" placeholder="Your password" className="form__input" />
            <button onClick={onClick} className="form__btn">Sign In</button>
        </form>
    )
}