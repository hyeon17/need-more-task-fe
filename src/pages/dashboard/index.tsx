import React from 'react';
import Layout from '@/components/Layout';
import DashboardBody from '@/components/Dashboard/DashboardBody';
import CommonFooter from '@/components/common/CommonFooter';

import { useUserInfo } from '@/store/userInfoStore';
import { GetServerSideProps } from 'next';
import { axiosWithToken } from '@/apis/configs';

import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { authMeAPI } from '@/apis/user';
import { dehydrate, QueryClient } from '@tanstack/react-query';

function DashBoardPage() {
  const { userInfo } = useUserInfo();

  return (
    <Layout hasHeader>
      <DashboardBody userInfo={userInfo} />
      <CommonFooter />
    </Layout>
  );
}

export default DashBoardPage;

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   try {
//     const cookie = req.headers.cookie;
//     // 쿠키가 없으면 에러를 전송
//     if (!cookie) throw new Error('Missing auth token cookie');

//     // 쿠키가 있으면 그 쿠키를 이용해서 백엔드에서 인증 처리
//     await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, {
//       headers: { cookie },
//     });
//     return { props: {} };
//   } catch (error) {
//     // 백엔드의 요청에서 가져온 쿠키를 이용해 인증 처리할 때 에러가 발생 시, /login 페이지로 이동
//     res.writeHead(307, { Location: '/login' }).end();

//     return { props: {} };
//   }
// };

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const queryClient = new QueryClient();

//   const queryKey = `/auth/me`;
//   const queryFn = () => axiosWithToken.get(queryKey).then((res) => res.data);

//   // `prefetchQuery` 대신 `getQueryData`를 사용하여 캐시된 데이터를 가져옵니다.
//   const data = queryClient.getQueryData([queryKey]);
//   console.log('data>>', data);

//   if (!data) {
//     res.writeHead(302, { Location: '/login' }).end();
//     return { props: {} };
//   }

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const queryClient = new QueryClient();

//   const queryKey = `/auth/me`;

//   const { data } = await axiosWithToken.get(queryKey);
//   console.log('data>>', data);

//   // 데이터를 캐시합니다.
//   queryClient.setQueryData([queryKey], data);

//   // 데이터가 없으면 로그인 페이지로 이동합니다.
//   if (!data) {
//     res.writeHead(302, { Location: '/login' }).end();
//     return { props: {} };
//   }

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       // id: params?.id,
//     },
//   };
// };
