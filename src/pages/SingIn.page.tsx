import React from 'react';
import AuthLayout from '../features/auth/components/Auth.layout';
import SignInForm from '../features/auth/components/SignInForm.component';

const SingInPage = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SingInPage;
