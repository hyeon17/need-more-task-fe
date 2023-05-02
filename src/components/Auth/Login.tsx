import React, { useState } from 'react';
import * as A from '@/styles/auth.styles';
import TitleLabel from './TitleLabel';
import FooterLabel from './FooterLabel';
import PasswordInput from './PasswordInput';
import { inputProps } from '@/components/Auth/Join';
import AuthInput from './AuthInput';

function Join() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <A.Container>
      <TitleLabel title="로그인" />
      <A.BodyWrapper>
        {/* 이메일 */}
        <AuthInput label="이메일" placeholder="이메일을 입력하세요" inputProps={inputProps} />
        {/* 비밀번호 */}
        <PasswordInput label="비밀번호" show={show} handleClick={handleClick} inputProps={inputProps} />

        <A.ConfirmButton colorScheme="teal" size="md">
          로그인
        </A.ConfirmButton>
      </A.BodyWrapper>
      <FooterLabel />
    </A.Container>
  );
}

export default Join;
