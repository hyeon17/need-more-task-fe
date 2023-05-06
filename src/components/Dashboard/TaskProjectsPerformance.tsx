import React from 'react';
import * as D from '@/styles/dashboard.styles';
import PerformanceGraph from '@/components/Dashboard/PerformanceGraph';

function TaskProjectsPerformance() {
  return (
    <D.PerformanceContainer>
      <D.DashboardH5>
        <h5>Projects performance</h5>
      </D.DashboardH5>
      <D.PerformanceBodyWrapper>
        <D.PerformanceBodyHeader>
          <D.FlagWrapper>
            <D.AssignedFlag></D.AssignedFlag>
            <D.FlagTitle>Assigned</D.FlagTitle>
          </D.FlagWrapper>
          <D.FlagWrapper>
            <D.DoneFlag></D.DoneFlag>
            <D.FlagTitle>Done</D.FlagTitle>
          </D.FlagWrapper>
        </D.PerformanceBodyHeader>

        {/* graph */}
        <D.PerformanceGraphWrapper>
          <PerformanceGraph />
        </D.PerformanceGraphWrapper>
      </D.PerformanceBodyWrapper>
    </D.PerformanceContainer>
  );
}

export default TaskProjectsPerformance;
