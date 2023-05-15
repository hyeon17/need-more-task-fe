import React from 'react';
import * as D from '@/styles/dashboard.styles';
import PerformanceGraph from '@/components/Dashboard/PerformanceGraph';
import { getPerformanceAPI } from '@/apis/dashboard';
import CommonSpinner from '@/components/common/CommonSpinner';

function TaskProjectsPerformance() {
  const { data: performanceData, isLoading } = getPerformanceAPI();

  return (
    <D.PerformanceContainer>
      <D.DashboardH5>
        <h5>
          Projects performance <span>최근 14일 동안의 결과를 보여줍니다</span>
        </h5>
      </D.DashboardH5>
      <D.PerformanceBodyWrapper>
        <D.PerformanceBodyHeader>
          <D.FlagWrapper>
            <D.DoneFlag></D.DoneFlag>
            <D.FlagTitle>Done</D.FlagTitle>
          </D.FlagWrapper>
          <D.FlagWrapper>
            <D.AssignedFlag></D.AssignedFlag>
            <D.FlagTitle>Assigned</D.FlagTitle>
          </D.FlagWrapper>
        </D.PerformanceBodyHeader>

        {/* graph */}
        <D.PerformanceGraphWrapper>
          {performanceData && <PerformanceGraph data={performanceData.data} />}
          {isLoading && <CommonSpinner size="lg" />}
        </D.PerformanceGraphWrapper>
      </D.PerformanceBodyWrapper>
    </D.PerformanceContainer>
  );
}

export default TaskProjectsPerformance;
