import React from 'react';
import * as A from '@/styles/auth.styles';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';

interface IJoinBackButton {
  step: number;
}

function JoinBackButton({ step }: IJoinBackButton) {
  return (
    <A.BackButtonWrapper>
      <span>잘못 입력하신 정보가 있나요?</span>
      <Link href={`/join/${step}`}>
        <Button color="warningColor">뒤로 가기</Button>
      </Link>
    </A.BackButtonWrapper>
  );
}

export default JoinBackButton;
