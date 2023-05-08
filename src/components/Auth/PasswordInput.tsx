import React from 'react';
import * as A from '@/styles/auth.styles';
import { Button, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

function PasswordInput({ label, inputProps, handleClick, show, props, onChange }: any) {
  return (
    <A.InputContainer>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="md" variant="flushed">
        <Input
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder="비밀번호를 입력하세요"
          {...inputProps}
          {...props}
          onChange={onChange}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? '보기' : '숨기기'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </A.InputContainer>
  );
}

export default PasswordInput;
