import React from 'react';
import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Sidebar from '@/components/Drawer';
import { useRouter } from 'next/router';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

const ComponentsWithNoSSR = dynamic(() => import('@/components/Calendar/CalendarView'), { ssr: false });

function CalendarPage() {
  const router = useRouter();
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
    <>
      <Head>
        <title>Need More Task · Calendar</title>
      </Head>
      <Layout hasHeader>
        <ComponentsWithNoSSR />
        <Sidebar/>
      </Layout>
    </>
  );
}

export default CalendarPage;
