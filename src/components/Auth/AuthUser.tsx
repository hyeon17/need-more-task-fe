import { ReactNode, useEffect } from 'react';
import { authMeAPI } from '@/apis/user';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useUserInfo } from '@/store/userInfoStore';

interface AuthUserProps {
  children: ReactNode;
}

const AuthUser = ({ children }: AuthUserProps) => {
  const { userInfo, setUserInfo } = useUserInfo();
  const { getAccessToken } = useAccessTokenStore();
  const accessToken = getAccessToken();

  const { data: authMeData } = accessToken ? authMeAPI(accessToken) : { data: null };

  useEffect(() => {
    if (accessToken && authMeData) {
      setUserInfo(authMeData.data);
    }
  }, [accessToken, authMeData]);

  return <>{children}</>;
};

export default AuthUser;
