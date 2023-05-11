import React, { useState } from 'react';
import * as A from '@/styles/auth.styles';
import FooterLabel from './FooterLabel';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { loginAPI } from '@/apis/user';
import { useAccessTokenStore } from '@/store/acceessTokenStore';

function Login() {
  const router = useRouter();
  const { onSaveAccessToken } = useAccessTokenStore();

  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>();

  const toast = useToast();

  const onError = (error: AxiosError) => {
    console.error('error>>', error);

    toast({
      title: '로그인에 실패하였습니다.',
      description: '이메일과 비밀번호를 다시 한 번 확인해 주세요.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const onSuccess = (data: any) => {
    toast({
      title: '로그인 성공!',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    onSaveAccessToken(data.headers.authorization);
    router.replace('/kanban');
  };

  const { mutate, isLoading } = loginAPI({ onSuccess, onError });
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onClickLogin = () => {
    if (Object.keys(errors).length === 0) {
      mutate({ email: emailValue, password: passwordValue });
    }
  };

  return (
    <form onSubmit={handleSubmit(onClickLogin)}>
      {/* 이메일 */}
      <A.InputContainer>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <Input
            id="email"
            placeholder="이메일을 입력하세요"
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
          <FormErrorMessage>{errors.email && errors.email?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </A.InputContainer>

      {/* 비밀번호 */}
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

      {/*  */}
      <A.ConfirmButton colorScheme="teal" size="md" type="submit" isLoading={isLoading}>
        로그인
      </A.ConfirmButton>
      <FooterLabel isJoined={true} />
    </form>
  );
}

export default Login;
