import React from 'react';
import * as D from '@/styles/dashboard.styles';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import TaskStatusGraph from '@/components/Dashboard/TaskStatusGraph';
import { getTaskProgressAPI } from '@/apis/dashboard';
import { Spinner } from '@chakra-ui/react';
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
            title="Task Done"
            graph={taskData.data.IN_PROGRESS.graph}
            totalCount={taskData.data.IN_PROGRESS.totalCount}
          />

          <TaskStatus title="Task Done" graph={taskData.data.TODO.graph} totalCount={taskData.data.TODO.totalCount} />
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
