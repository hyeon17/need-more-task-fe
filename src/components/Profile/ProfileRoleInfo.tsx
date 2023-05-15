import React from 'react';
import { IUser } from '@/type/authTypes';
import * as P from '@/styles/profile.styles';
import * as AD from '@/styles/admin.styles';
import Admin from '@/components/Admin/Admin';

interface IProfileRole {
  userInfo: IUser;
  currentLoginUserInfo: IUser;
}

function ProfileRoleInfo({ userInfo, currentLoginUserInfo }: IProfileRole) {
  return (
    <P.AccountWrapper>
      <AD.Container>
        <Admin userInfo={userInfo} />
      </AD.Container>
    </P.AccountWrapper>
  );
}

export default ProfileRoleInfo;
