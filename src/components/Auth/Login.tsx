import React, { useState } from 'react';
import * as A from '@/styles/auth.styles';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import TitleLabel from './TitleLabel';
import FooterLabel from './FooterLabel';

function Join() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <A.Container>
      <TitleLabel title="로그인" />
      <A.BodyWrapper>
        <A.InputContainer>
          <label>이메일</label>
          <Input
            variant="flushed"
            placeholder="이메일을 입력하세요"
            borderColor="outlineColor"
            focusBorderColor="inputFocusColor"
          />
        </A.InputContainer>

        <A.InputContainer>
          <label>비밀번호</label>
          <InputGroup size="md" variant="flushed">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? '보기' : '숨기기'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* isLoading   loadingText='로그인 중' isDisabled={true}*/}
        </A.InputContainer>
        <A.ConfirmButton colorScheme="teal" size="md">
          로그인
        </A.ConfirmButton>
      </A.BodyWrapper>
      <FooterLabel />
    </A.Container>
  );
}

export default Join;
