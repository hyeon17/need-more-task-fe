import React, { useState } from 'react';
import * as A from '@/styles/auth.styles';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import TitleLabel from './TitleLabel';

function Join() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <A.Container>
      <TitleLabel title="Sign in" />
      <A.BodyWrapper>
        <A.InputContainer>
          <label>Email</label>
          <Input
            variant="flushed"
            placeholder="이메일을 입력하세요"
            borderColor="outlineColor"
            focusBorderColor="inputFocusColor"
          />
        </A.InputContainer>

        <A.InputContainer>
          <label>Your password</label>
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
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </A.InputContainer>
      </A.BodyWrapper>
    </A.Container>
  );
}

export default Join;
