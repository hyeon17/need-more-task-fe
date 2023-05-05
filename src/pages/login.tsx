import React from 'react';
import Login from '@/components/Auth/Login';
import Layout from '@/components/Layout';
import LoginLayout from '@/components/Auth/Join/LoginLayout';

function LoginPage() {
  return (
    <Layout>
      <LoginLayout>
        <Login />
      </LoginLayout>
    </Layout>
  );
}

export default LoginPage;
