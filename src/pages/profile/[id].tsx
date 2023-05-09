import React from 'react';
import Layout from '@/components/Layout';
import * as P from '@/styles/profile.styles';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import { useUserInfo } from '@/store/userInfoStore';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountInfo from '@/components/Profile';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/apis/configs';
import { useRouter } from 'next/router';
import { getUserInfoAPI } from '@/apis/user';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { Box, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';

function ProfilePage({ id }: { id: string }) {
  const router = useRouter();
  const { userInfo: currentLoginUserInfo } = useUserInfo();
  const { getAccessToken } = useAccessTokenStore();
  const accessToken = getAccessToken();
  // console.log('accessToken>>', accessToken);

  // console.log('query', router.query?.id);
  // const userId = router.query?.id;
  // console.log('id>>', id);
  // console.log('currentLoginUserInfo>>>', currentLoginUserInfo);

  const { data: userInfo } = accessToken && id ? getUserInfoAPI(id) : { data: null };
  console.log('userInfo>>', userInfo);

  return (
    <Layout hasHeader>
      <P.Container>
        <P.LeftContainer>
          <P.AsideWrapper>
            {/* Profile info */}
            <P.ProfileWrapper>
              <SkeletonCircle size="100" isLoaded={Boolean(userInfo)} fadeDuration={1}>
                {userInfo && <ProfileImage width={100} height={100} />}
              </SkeletonCircle>

              <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" isLoaded={Boolean(userInfo)}>
                <h3>{userInfo?.data?.fullName}</h3>
                <span>{userInfo?.data?.email}</span>
              </SkeletonText>
            </P.ProfileWrapper>

            {/* NavList */}
            <P.NavWrapper>
              <nav>
                <ul>
                  <li>
                    <AccountCircleOutlinedIcon />
                    <div>
                      <h4>계정 정보</h4>
                      <span>프로필 사진, 이름</span>
                    </div>
                  </li>
                  <li>
                    <AccountCircleOutlinedIcon />
                    <div>
                      <h4>계정 정보</h4>
                      <span>프로필 사진, 이름</span>
                    </div>
                  </li>
                </ul>
              </nav>
            </P.NavWrapper>
          </P.AsideWrapper>
        </P.LeftContainer>

        {/* 개인정보 */}
        <P.RightContainer>
          {userInfo && currentLoginUserInfo && (
            <AccountInfo userInfo={userInfo.data} currentLoginUserInfo={currentLoginUserInfo} />
          )}
        </P.RightContainer>
      </P.Container>
    </Layout>
  );
}

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const queryKey = `/profile/${params?.id}`;
  const queryFn = () => axiosInstance.get(queryKey).then((res) => res.data);

  await queryClient.prefetchQuery([queryKey], queryFn);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: params?.id,
    },
  };
};
