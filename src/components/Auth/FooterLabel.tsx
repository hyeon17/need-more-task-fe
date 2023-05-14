import React from 'react';
import * as A from '@/styles/auth.styles';
import { useRouter } from 'next/router';

interface IFooterLabel {
  isJoined: boolean;
}

function FooterLabel({ isJoined }: IFooterLabel) {
  const router = useRouter();

  return (
    <A.FooterWrapper>
      {isJoined ? (
        <>
          <span>처음이신가요?</span>
          <button onClick={() => router.push('/join/1')}>회원가입 하기</button>
        </>
      ) : (
        <>
          <span>이미 회원이신가요?</span>
          <button onClick={() => router.push('/login')}>로그인 하기</button>
        </>
      )}
    </A.FooterWrapper>
  );
}

export default FooterLabel;
