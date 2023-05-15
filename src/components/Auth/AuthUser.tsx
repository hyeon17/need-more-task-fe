import { ReactNode, useEffect } from 'react';
import { authMeAPI } from '@/apis/user';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useUserInfo } from '@/store/userInfoStore';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

interface AuthUserProps {
  children: ReactNode;
}

const AuthUser = ({ children }: AuthUserProps) => {
  const { setUserInfo } = useUserInfo();
  const { getAccessToken } = useAccessTokenStore();
  const accessToken = getAccessToken();

  const { data: authMeData } = authMeAPI();

  useEffect(() => {
    if (accessToken && authMeData) {
      setUserInfo(authMeData.data);
    }
  }, [accessToken, authMeData]);

  return <>{children}</>;
};

export default AuthUser;
