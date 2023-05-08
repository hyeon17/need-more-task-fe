import React from 'react';
import * as D from '@/styles/dashboard.styles';
import { IUser } from '@/type/authTypes';
import TaskStatusList from '@/components/Dashboard/TaskStatusList';
import TaskProjectsPerformance from '@/components/Dashboard/TaskProjectsPerformance';
import LatestProjects from '@/components/Dashboard/LatestProjects';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';

interface IDashboardBody {
  userInfo: IUser | null;
}

function DashboardBody({ userInfo }: IDashboardBody) {
  console.log('userInfo>>>', userInfo);

  return (
    <D.BodyContainer>
      <header>
        <div>
          <h1>어서오세요, {userInfo?.fullName} 님</h1>
          {/* admin만 버튼 보이게 */}
          {userInfo?.role === 'ADMIN' && (
            <Link href={'/admin'}>
              <Button>유저 권한 설정</Button>
            </Link>
          )}
        </div>
        <p>최근 Task를 확인해보세요</p>
      </header>
      {/* task status list */}
      <TaskStatusList />
      {/* projects performance */}
      <TaskProjectsPerformance />
      {/* latest projects */}
      <LatestProjects />
    </D.BodyContainer>
  );
}

export default DashboardBody;
