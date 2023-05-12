import React from 'react';
import * as D from '@/styles/dashboard.styles';
import { getTaskProgressAPI } from '@/apis/dashboard';
import CommonSpinner from '@/components/common/CommonSpinner';
import TaskStatus from '@/components/Dashboard/TaskStatus';
import { TaskStatusTitle } from '@/type/enum/TaskStatusEnum';

function TaskStatusList() {
  const { data: taskData, isLoading } = getTaskProgressAPI();
  console.log('taskData>>>', taskData);

  return (
    <D.TaskStatusContainer>
      {taskData && (
        <>
          <TaskStatus
            title={TaskStatusTitle.DONE}
            graph={taskData.data.done.graph}
            totalCount={taskData.data.done.totalCount}
          />
          <TaskStatus
            title={TaskStatusTitle.IN_PROGRESS}
            graph={taskData.data.inProgress.graph}
            totalCount={taskData.data.inProgress.totalCount}
          />
          <TaskStatus
            title={TaskStatusTitle.TODO}
            graph={taskData.data.todo.graph}
            totalCount={taskData.data.todo.totalCount}
          />
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
