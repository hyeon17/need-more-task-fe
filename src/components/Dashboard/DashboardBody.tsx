import React from 'react';
import * as D from '@/styles/dashboard.styles';
import { IUser } from '@/type/authTypes';

interface IDashboardBody {
  userInfo: IUser | null;
}

function DashboardBody({ userInfo }: IDashboardBody) {
  return (
    <D.BodyContainer>
      <header>
        <h1>어서오세요, {userInfo?.fullName} 님</h1>
        <p>최근 Task를 확인해보세요</p>
      </header>
    </D.BodyContainer>
  );
}

export default DashboardBody;
