import React from 'react';
import * as D from '@/styles/dashboard.styles';
import PerformanceGraph from '@/components/Dashboard/PerformanceGraph';

const data = [
  {
    date: '2023-04-29',
    taskCount: 10,
    doneCount: 9,
  },
  {
    date: '2023-04-30',
    taskCount: 15,
    doneCount: 10,
  },
  {
    date: '2023-05-01',
    taskCount: 18,
    doneCount: 8,
  },
  {
    date: '2023-05-02',
    taskCount: 16,
    doneCount: 12,
  },
  {
    date: '2023-05-03',
    taskCount: 2,
    doneCount: 1,
  },
  {
    date: '2023-05-04',
    taskCount: 1,
    doneCount: 0,
  },
  {
    date: '2023-05-05',
    taskCount: 25,
    doneCount: 24,
  },
  {
    date: '2023-05-06',
    taskCount: 10,
    doneCount: 4,
  },
  {
    date: '2023-05-07',
    taskCount: 2,
    doneCount: 2,
  },
  {
    date: '2023-05-08',
    taskCount: 23,
    doneCount: 23,
  },
  {
    date: '2023-05-09',
    taskCount: 20,
    doneCount: 18,
  },
  {
    date: '2023-05-10',
    taskCount: 22,
    doneCount: 22,
  },
  {
    date: '2023-05-11',
    taskCount: 16,
    doneCount: 16,
  },
  {
    date: '2023-05-12',
    taskCount: 0,
    doneCount: 0,
  },
  {
    date: '2023-05-13',
    taskCount: 34,
    doneCount: 24,
  },
];

function TaskProjectsPerformance() {
  return (
    <D.PerformanceContainer>
      <D.DashboardH5>
        <h5>Projects performance</h5>
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
        <PerformanceGraph data={data} />
      </D.PerformanceBodyWrapper>
    </D.PerformanceContainer>
  );
}

export default TaskProjectsPerformance;
