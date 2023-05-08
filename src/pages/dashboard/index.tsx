import React from 'react';
import Layout from '@/components/Layout';
import DashboardBody from '@/components/Dashboard/DashboardBody';
import DashboardFooter from '@/components/Dashboard/DashboardFooter';

import { useUserInfo } from '@/store/userInfoStore';

function DashBoardPage() {
  const { userInfo } = useUserInfo();

  return (
    <Layout hasHeader>
      <DashboardBody userInfo={userInfo} />
      <DashboardFooter />
    </Layout>
  );
}

export default DashBoardPage;
