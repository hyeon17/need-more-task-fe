import React from 'react';
import Layout from '@/components/Layout';
import * as P from '@/styles/profile.styles';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import { useUserInfo } from '@/store/userInfoStore';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountInfo from '@/components/Profile';

function ProfilePage() {
  const { userInfo } = useUserInfo();
  console.log('userInfo>>', userInfo);

  return (
    <Layout hasHeader>
      <P.Container>
        <P.LeftContainer>
          <P.AsideWrapper>
            {/* 프로필 */}
            <P.ProfileWrapper>
              <ProfileImage width={100} height={100} />
              <h3>{userInfo?.fullName}</h3>
              <span>{userInfo?.email}</span>
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
        {/*  */}
        <P.RightContainer>{userInfo && <AccountInfo userInfo={userInfo} />}</P.RightContainer>
      </P.Container>
    </Layout>
  );
}

export default ProfilePage;
