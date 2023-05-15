import React from 'react';
import * as D from '@/styles/dashboard.styles';
import LatestProjectsList from '@/components/Dashboard/LatestProjectsList';
import { Button } from '@chakra-ui/react';
import { useModalState } from '@/store/modalStore';
import { useRouter } from 'next/router';
import { getTaskProgressAPI } from '@/apis/dashboard';

function LatestProjects() {
  const router = useRouter();
  const { onOpenCreate } = useModalState();

  return (
    <D.LatestProjectContainer>
      <D.DashboardH5>
        <div>
          <h5>
            Latest Projects <span>최근 생성된 7개의 Tasks를 보여줍니다</span>
          </h5>

          <D.LatestProjectButtonWrapper>
            <Button color="successColor" variant="outline" onClick={() => router.push('/tasks')}>
              모든 Tasks
            </Button>
            <Button color="primary" variant="outline" onClick={() => onOpenCreate()}>
              Task 생성
            </Button>
          </D.LatestProjectButtonWrapper>
        </div>
      </D.DashboardH5>

      {/*  */}
      <LatestProjectsList />
    </D.LatestProjectContainer>
  );
}

export default LatestProjects;
