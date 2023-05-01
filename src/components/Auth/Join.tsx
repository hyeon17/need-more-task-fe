import React, { useState } from 'react';
import * as A from '@/styles/auth.styles';
import TitleLabel from './TitleLabel';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import PasswordInput from './PasswordInput';
import AuthInput from './AuthInput';

export const inputProps = {
  variant: 'flushed',
  borderColor: 'outlineColor',
  focusBorderColor: 'inputFocusColor',
};

function Join() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <A.Container>
      <TitleLabel title="회원가입" />
      <A.BodyWrapper>
        {/* 이름 */}
        <AuthInput label="이름" placeholder="이름을 입력하세요" inputProps={inputProps} />
        {/* 이메일 */}
        <AuthInput label="이메일" placeholder="이메일을 입력하세요" inputProps={inputProps} />
        {/* 닉네임 */}
        <AuthInput label="닉네임" placeholder="닉네을 입력하세요" inputProps={inputProps} />

        {/* 비밀번호 */}
        <PasswordInput label="비밀번호" show={show} handleClick={handleClick} inputProps={inputProps} />
        {/* 비밀번호 확인 */}
        <PasswordInput label="비밀번호 확인" show={show} handleClick={handleClick} inputProps={inputProps} />

        <A.ConfirmButton colorScheme="teal" size="md">
          회원가입
        </A.ConfirmButton>
      </A.BodyWrapper>
    </A.Container>
  );
}

export default Join;
