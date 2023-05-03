import React, { useMemo, useRef, useState } from 'react';
import * as A from '@/styles/auth.styles';
import { useRouter } from 'next/router';
import { useUserJoinStore } from '@/store/userJoinStore';
import AuthInput from '../AuthInput';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import useInput from '@/hooks/useInput';
import PasswordInput from '../PasswordInput';
import { useForm } from 'react-hook-form';

export const inputProps = {
  variant: 'flushed',
  borderColor: 'outlineColor',
  focusBorderColor: 'inputFocusColor',
};

function StepTwo() {
  const router = useRouter();
  const { me, onSaveSignup } = useUserJoinStore();

  const [fullname, onChangeFullname] = useInput(me?.fullname ?? '');
  const [email, onChangeEmail] = useInput(me?.email ?? '');
  const [password, onChangePassword] = useInput(me?.password ?? '');
  const [confirmPassword, onChangeConfirmPassword] = useInput(me?.confirmPassword ?? '');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleIsDuplicated = () => {
    console.log('중복확인');
  };

  console.log(fullname, email);
  console.log(password, confirmPassword);

  const isDisabled = useMemo(
    () => Boolean(!fullname || !email || !password || !confirmPassword),
    [fullname, email, password, confirmPassword],
  );

  interface IFormInput {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const onClickNext = (data: IFormInput) => {
    if (Object.keys(errors).length === 0) {
      const { confirmPassword, ...rest } = data;

      onSaveSignup({ ...me, ...rest });
      router.push('/join/3');
    }
  };

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>();
  console.log('errors>>', errors);

  return (
    <form onSubmit={handleSubmit(onClickNext)}>
      {/* 이름 */}
      <A.InputContainer>
        <FormControl isInvalid={Boolean(errors.fullname)}>
          <FormLabel htmlFor="fullname">이름</FormLabel>
          <Input
            id="fullname"
            placeholder="이름을 입력하세요"
            variant="flushed"
            borderColor="outlineColor"
            focusBorderColor="inputFocusColor"
            {...register('fullname', {
              required: '이름은 필수 입력사항 입니다.',
              maxLength: {
                value: 20,
                message: '이름이 20자가 넘으시나요? 관리자에게 연락하세요.',
              },
            })}
          />
          <FormErrorMessage>{errors.fullname && errors.fullname?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </A.InputContainer>

      {/* 이메일 */}
      <A.InputContainer>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <InputGroup size="md" variant="flushed">
            <Input
              id="email"
              placeholder="이메일을 입력하세요"
              pr="4.5rem"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              {...register('email', {
                required: '이메일은 필수 입력사항입니다.',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '유효한 이메일 주소를 입력하세요.',
                },
                maxLength: {
                  value: 50,
                  message: '이메일 주소가 너무 깁니다.',
                },
              })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleIsDuplicated}>
                중복 확인
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.email && errors.email?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </A.InputContainer>

      <A.InputContainer>
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <InputGroup size="md" variant="flushed">
            <Input
              id="password"
              placeholder="비밀번호을 입력하세요"
              pr="4.5rem"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: '필수 입력사항 입니다.',
                pattern: {
                  value: /^[a-zA-Z0-9.\-]{6,16}$/,
                  message: '영어 소문자 6자~16자, (특수문자 . - 만 허용)',
                },
              })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                {showPassword ? '보기' : '숨기기'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password && errors.password?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </A.InputContainer>

      <A.InputContainer>
        <FormControl isInvalid={Boolean(errors.confirmPassword)}>
          <FormLabel htmlFor="confirmPassword">비밀번호 확인</FormLabel>
          <InputGroup size="md" variant="flushed">
            <Input
              id="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
              pr="4.5rem"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: '필수 입력사항 입니다.',
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return '입력하신 비밀번호/비밀번호 확인이 일치하지 않습니다.';
                  }
                },
              })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowConfirmPassword}>
                {showConfirmPassword ? '보기' : '숨기기'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </A.InputContainer>

      {/* onClick={onClickNext} */}
      {/* isDisabled={isDisabled} */}
      <A.ConfirmButton colorScheme="teal" size="md" type="submit">
        다음
      </A.ConfirmButton>
    </form>
  );
}

export default StepTwo;
