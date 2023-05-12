import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import StepOne from '@/components/Auth/Join/StepOne';
import StepThree from '@/components/Auth/Join/StepThree';
import StepTwo from '@/components/Auth/Join/StepTwo';
import Layout from '@/components/Layout';
import JoinLayout from '@/components/Auth/Join/JoinLayout';
import Head from 'next/head';

type TStep = '1' | '2' | '3';

const StepSection = {
  '1': <StepOne />,
  '2': <StepTwo />,
  '3': <StepThree />,
};

function JoinPage() {
  const router = useRouter();
  const step = (router.query?.step ?? '1') as TStep;

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
