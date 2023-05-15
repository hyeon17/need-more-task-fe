import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import DashboardBody from '@/components/Dashboard/DashboardBody';
import CommonFooter from '@/components/common/CommonFooter';

import { useUserInfo } from '@/store/userInfoStore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useToast } from '@chakra-ui/react';

function DashBoardPage() {
  const router = useRouter();
  const { userInfo } = useUserInfo();
  const { getAccessToken } = useAccessTokenStore();
  const accessToken = getAccessToken();
  const toast = useToast();

  useEffect(() => {
    if (!accessToken) {
      toast({
        title: '인증되지 않은 사용자는 접근할 수 없습니다.',
        description: '로그인 페이지로 이동합니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      router.push('/login');
    }
  }, [accessToken]);

  return (
    <Layout hasHeader>
      <Head>
        <title>Need More Task · Dashboard</title>
      </Head>
      {userInfo && <DashboardBody userInfo={userInfo} />}
      <CommonFooter />
    </Layout>
  );
}

export default DashBoardPage;
