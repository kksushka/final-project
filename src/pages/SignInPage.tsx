import { useDispatch } from 'react-redux';
import { signIn } from '../store/slices/authSlice';
import { Success } from '../Components/Forms/Success';
import { SignInForm } from '../Components/Forms/SignInForm';
import { useState } from 'react';

export default function SignInPage() {
  const [signedIn, setSignedIn] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = (formData: { name: string; surname: string }) => {
    dispatch(signIn(formData));
    setSignedIn(true);
  };

  return (
    <>
      {signedIn ? (
        <Success onClick={() => setSignedIn(false)} />
      ) : (
        <SignInForm onSubmit={handleSignIn} />
      )}
    </>
  );
}
