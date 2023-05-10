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
  // const { getAccessToken, onSaveAccessToken } = useAccessTokenStore();
  // console.log('getAccessToken>>', getAccessToken());

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
      // description: '알 수 없는 오류가 발생했습니다.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const onSuccess = (data: any) => {
    // console.log('success data>>', data);
    // console.log('data>>', data.accessToken);

    toast({
      title: '로그인 성공!',
      // description: '알 수 없는 오류가 발생했습니다.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    onSaveAccessToken(data);
    // router.replace('/kanban');
    window.location.href = '/kanban';
  };

  const { mutate, isLoading } = loginAPI({ onSuccess, onError });
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onClickLogin = (data: any) => {
    if (Object.keys(errors).length === 0) {
      console.log('로그인 성공');
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
