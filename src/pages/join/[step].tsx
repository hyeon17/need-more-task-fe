import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import StepOne from '@/components/Auth/Join/StepOne';
import StepThree from '@/components/Auth/Join/StepThree';
import StepTwo from '@/components/Auth/Join/StepTwo';
import Layout from '@/components/Layout';
import JoinLayout from '@/components/Auth/Join/JoinLayout';
import Head from 'next/head';
import { useUserInfo } from '@/store/userInfoStore';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useToast } from '@chakra-ui/react';

type TStep = '1' | '2' | '3';

const StepSection = {
  '1': <StepOne />,
  '2': <StepTwo />,
  '3': <StepThree />,
};

function JoinPage() {
  const router = useRouter();
  const step = (router.query?.step ?? '1') as TStep;

  const { userInfo } = useUserInfo();
  const { getAccessToken } = useAccessTokenStore();
  const accessToken = getAccessToken();
  const toast = useToast();

  useEffect(() => {
    if (accessToken) {
      toast({
        title: '현재 로그인 중입니다. 로그아웃 후 다시 시도해주세요',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      router.back();
    }
  }, [accessToken]);

  return (
    <Layout>
      <Head>
        <title>Need More Task · 회원가입</title>
      </Head>
      <JoinLayout step={step}>{StepSection[step]}</JoinLayout>
    </Layout>
  );
}

export default JoinPage;

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   if (!req.headers.referer) {
//     res.statusCode = 302;
//     res.setHeader('Location', `/login`);
//     res.end();
//   }
//   return { props: {} };
// };
