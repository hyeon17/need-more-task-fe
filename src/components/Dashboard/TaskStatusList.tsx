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
          <TaskStatus title="Task Done" graph={taskData.data.done.graph} totalCount={taskData.data.done.totalCount} />

          <TaskStatus
            title="Avg. Progress"
            graph={taskData.data.inProgress.graph}
            totalCount={taskData.data.inProgress.totalCount}
          />

          <TaskStatus title="Todo" graph={taskData.data.todo.graph} totalCount={taskData.data.todo.totalCount} />
        </>
      )}

      {isLoading && (
        <D.SpinnerWrapper>
          <CommonSpinner size="lg" />
        </D.SpinnerWrapper>
      )}
    </D.TaskStatusContainer>
  );
}

export default TaskStatusList;
