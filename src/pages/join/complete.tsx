import React from 'react';
import Layout from '@/components/Layout';
import { useUserJoinStore } from '@/store/userJoinStore';
import LottieAni from '@/hooks/LottieAni';
import welcome from 'public/lottie/welcome.json';

import * as A from '@/styles/auth.styles';
import { useRouter } from 'next/router';
import TitleLabel from '@/components/Auth/TitleLabel';

function complete() {
  const router = useRouter();
  const { me, onResetSignup } = useUserJoinStore();

  const onClickRoute = () => {
    onResetSignup();
    router.push('/login');
  };

  return (
    <Layout>
      <A.Container>
        <TitleLabel title="회원가입 완료" />
        <A.CompleteBody>
          <A.LottieWrapper>
            <LottieAni aniName={welcome} />
          </A.LottieWrapper>
          <h1>안녕하세요 {me?.fullName}님,</h1>
          <h1>Task 받을 준비 되셨나요?</h1>
          <p>우선 로그인 하러 갑시다.</p>

          <A.CompleteButton colorScheme="teal" size="md" onClick={onClickRoute}>
            로그인 하러 가기
          </A.CompleteButton>
        </A.CompleteBody>
      </A.Container>
    </Layout>
  );
}

export default complete;
