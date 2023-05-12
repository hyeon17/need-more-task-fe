import { GetServerSideProps } from 'next';
import { axiosInstance } from '@/apis/configs';

export const serverSideAuth: GetServerSideProps = async ({ req, res }) => {
  try {
    const token = req.headers.authorization;

    // 토큰이 없으면 에러를 전송
    if (!token) throw new Error('Missing auth token');

    // 토큰을 이용해서 백엔드에서 인증 처리
    await axiosInstance.get(`/auth/me`, {
      headers: { Authorization: token },
    });

    return { props: {} };
  } catch (error) {
    // 인증 처리 실패 시, /login 페이지로 이동
    res.writeHead(307, { Location: '/login' }).end();

    return { props: {} };
  }
};
