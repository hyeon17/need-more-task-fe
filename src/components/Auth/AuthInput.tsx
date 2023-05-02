import React from 'react';
import * as A from '@/styles/auth.styles';
import { Input } from '@chakra-ui/react';

interface IAuthInput {
  label: string;
  placeholder: string;
  inputProps: any;
  props?: any;
}

function AuthInput({ label, inputProps, ...props }: IAuthInput) {
  return (
    <A.InputContainer>
      <label>{label}</label>
      <Input {...inputProps} {...props} />
    </A.InputContainer>
  );
}

export default AuthInput;
