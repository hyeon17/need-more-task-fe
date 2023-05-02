import React from 'react';
import * as A from '@/styles/auth.styles';
import { useRouter } from 'next/router';

function FooterLabel() {
  const router = useRouter();

  return (
    <A.FooterWrapper>
      <span>처음이신가요?</span>
      <button onClick={() => router.push('/join')}>회원가입 하기</button>
    </A.FooterWrapper>
  );
}

export default FooterLabel;
