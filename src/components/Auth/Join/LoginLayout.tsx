import React from 'react';
import * as A from '@/styles/auth.styles';
import TitleLabel from '../TitleLabel';

interface ILoginLayout {
  children: React.ReactElement;
}

function LoginLayout({ children }: ILoginLayout) {
  return (
    <A.Container>
      <TitleLabel title="로그인" />
      <A.BodyWrapper>
        <h2>어서오세요</h2>
        <main>{children}</main>
      </A.BodyWrapper>
    </A.Container>
  );
}

export default LoginLayout;
