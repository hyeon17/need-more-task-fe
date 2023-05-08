import React from 'react';
import * as D from '@/styles/dashboard.styles';
import { getTaskProgressAPI } from '@/apis/dashboard';
import CommonSpinner from '@/components/common/CommonSpinner';
import TaskStatus from '@/components/Dashboard/TaskStatus';

function TaskStatusList() {
  const { data: taskData, isLoading } = getTaskProgressAPI();

  return (
    <D.TaskStatusContainer>
      {taskData && (
        <>
          <TaskStatus title="Task Done" graph={taskData.data.DONE.graph} totalCount={taskData.data.DONE.totalCount} />

          <TaskStatus
            title="Avg. Progress"
            graph={taskData.data.IN_PROGRESS.graph}
            totalCount={taskData.data.IN_PROGRESS.totalCount}
          />

          <TaskStatus title="Todo" graph={taskData.data.TODO.graph} totalCount={taskData.data.TODO.totalCount} />
        </>
      )}

      {!taskData && (
        <D.SpinnerWrapper>
          <CommonSpinner size="lg" />
        </D.SpinnerWrapper>
      )}
    </D.TaskStatusContainer>
  );
}

export default TaskStatusList;
