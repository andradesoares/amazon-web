import React from 'react';
import AuthLayout from '../features/auth/components/Auth.layout';
import SignUpForm from '../features/auth/components/SignUpForm.component';

const SingUpPage = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SingUpPage;
