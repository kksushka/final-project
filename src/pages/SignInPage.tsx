import { useState } from 'react';
import { Success } from '../Components/Forms/Success';
import { SignInForm } from '../Components/Forms/SignInForm';

function SignInPage() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <>
      {signedIn ? (
        <Success onClick={() => setSignedIn(false)} />
      ) : (
        <SignInForm onClick={() => setSignedIn(true)} />
      )}
    </>
  );
}

export default SignInPage;