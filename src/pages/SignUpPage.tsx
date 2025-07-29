import { useState } from 'react';
import { SignUpForm } from '../Components/Forms/SignUpForm';
import { SignUpSuccess } from '../Components/Forms/SignUpSuccess';

function SignUpPage() {
  const [registered, setRegistered] = useState(false);

  return (
    <>
      {registered ? (
        <SignUpSuccess onClick={() => setRegistered(false)} />
      ) : (
        <SignUpForm onClick={() => setRegistered(true)} />
      )}
    </>
  );
}

export default SignUpPage;