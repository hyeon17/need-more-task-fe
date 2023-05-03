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
  const { me } = useUserJoinStore();
  console.log('me>>>', me);

  const onClickRoute = () => {
    router.push('/calendar');
  };

  return (
    <Layout>
      <A.Container>
        <TitleLabel title="회원가입 완료" />
        <A.CompleteBody>
          <A.LottieWrapper>
            <LottieAni aniName={welcome} />
          </A.LottieWrapper>
          <h1>안녕하세요 {me?.fullname}님 </h1>
          <h1>Task 받을 준비 되셨나요?</h1>
          <p>지금 바로 Task 받으러 갑시다.</p>

          <A.CompleteButton colorScheme="teal" size="md" onClick={onClickRoute}>
            Task 받으러 가기
          </A.CompleteButton>
        </A.CompleteBody>
      </A.Container>
    </Layout>
  );
}

export default complete;
