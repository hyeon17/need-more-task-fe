import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import CommonFooter from '@/components/common/CommonFooter';
import Admin from '@/components/Admin/Admin';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUserInfo } from '@/store/userInfoStore';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useToast } from '@chakra-ui/react';

function AdminPage() {
  const router = useRouter();
  const { userInfo } = useUserInfo();
  const { getAccessToken } = useAccessTokenStore();
  const accessToken = getAccessToken();
  const toast = useToast();
  console.log('userInfo>>>', userInfo);

  useEffect(() => {
    if (userInfo === null) {
      return; // 대기 상태로 유지
    }

    if (userInfo?.userId !== 1) {
      toast({
        title: '관리자 외에는 접근할 수 없습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      router.back();
    }
  }, [userInfo]);

  return (
    <Layout hasHeader>
      <Head>
        <title>Need More Task · 관리자 페이지</title>
      </Head>
      <Admin />
      <CommonFooter />
    </Layout>
  );
}

export default AdminPage;
