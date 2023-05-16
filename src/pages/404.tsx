import React, { useEffect } from 'react';
import * as S from '../styles/notFound.styles';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Head from 'next/head';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useToast } from '@chakra-ui/react';

function NotFound() {
  const router = useRouter();
  const { getAccessToken } = useAccessTokenStore();
  const accessToken = getAccessToken();
  const toast = useToast();

  useEffect(() => {
    if (!accessToken) {
      toast({
        title: '인증되지 않은 사용자는 접근할 수 없습니다.',
        description: '로그인 페이지로 이동합니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      router.push('/login');
    }
  }, [accessToken]);

  const homeButtonHandler = () => {
    router.push('/');
  };

  return (
    <Layout hasHeader>
      <Head>
        <title>Need More Task · NotFound</title>
      </Head>
      <S.NotFoundContainer>
        <S.Title>
          요청하신 페이지가 <S.SpanWord>존재</S.SpanWord>하지 않습니다.
        </S.Title>
        <S.Image src="/png/sad.png" alt="sad" />
        <S.HomeButton onClick={homeButtonHandler}>홈으로 돌아가기</S.HomeButton>
      </S.NotFoundContainer>
    </Layout>
  );
}

export default NotFound;
