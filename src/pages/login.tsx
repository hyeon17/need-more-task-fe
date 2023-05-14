import React from 'react';
import Login from '@/components/Auth/Login';
import Layout from '@/components/Layout';
import LoginLayout from '@/components/Auth/Join/LoginLayout';
import Head from 'next/head';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useRouter } from 'next/router';

function LoginPage() {
  const router = useRouter();

  const { getAccessToken } = useAccessTokenStore();
  const accessToken = getAccessToken();

  // if (accessToken) {
  //   router.replace('/calendar');
  // }

  return (
    <Layout>
      <Head>
        <title>Need More Task · 로그인</title>
      </Head>
      <LoginLayout>
        <Login />
      </LoginLayout>
    </Layout>
  );
}

export default LoginPage;
