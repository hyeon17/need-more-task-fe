import React from 'react';
import * as D from '@/styles/dashboard.styles';
import EmptyProjects from '@/components/Dashboard/EmptyProjects';
import LatestProjectsList from '@/components/Dashboard/LatestProjectsList';
import { Button } from '@chakra-ui/react';

function LatestProjects() {
  return (
    <D.LatestProjectContainer>
      <D.DashboardH5>
        <div>
          <h5>Latest Projects</h5>
          <Button color="primary" variant="outline">
            모든 Tasks
          </Button>
        </div>
      </D.DashboardH5>

      {/* empty projects lottie */}
      {/* <EmptyProjects /> */}
      <LatestProjectsList />
    </D.LatestProjectContainer>
  );
}

export default LatestProjects;
