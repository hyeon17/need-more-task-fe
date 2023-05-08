import React from 'react';
import * as A from '@/styles/auth.styles';
import { FormLabel, Input } from '@chakra-ui/react';

interface IAuthInput {
  label: string;
  placeholder: string;
  value: string;
  inputProps: any;
  props?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  maxLength?: number;
  minLength?: number;
}

// const AuthInput = React.forwardRef<HTMLInputElement, IAuthInput>(({ label, inputProps, ...props }, ref) => {
//   return (
//     <A.InputContainer>
//       <label>{label}</label>
//       <Input ref={ref} {...inputProps} {...props} />
//     </A.InputContainer>
//   );
// });

function AuthInput({ label, inputProps, ...props }: IAuthInput) {
  // console.log(props);

  return (
    <A.InputContainer>
      <FormLabel>{label}</FormLabel>
      <Input {...inputProps} {...props} />
    </A.InputContainer>
  );
}

export default AuthInput;
// // export default AuthInput;
