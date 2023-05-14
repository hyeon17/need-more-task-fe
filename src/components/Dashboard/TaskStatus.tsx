import React from 'react';
import * as D from '@/styles/dashboard.styles';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import TaskStatusGraph from '@/components/Dashboard/TaskStatusGraph';
import { ITaskStatus } from '@/type/dashBoardTypes';

function TaskStatus({ title, graph, totalCount }: ITaskStatus) {
  return (
    <D.TaskDoneContainer>
      <D.StatusLeft>
        <ProfileImage />
      </D.StatusLeft>
      <D.StatusRight>
        <D.StatusNumber>
          <h5>{totalCount}</h5>
          <span>{title}</span>
        </D.StatusNumber>
        {/* Task Status Graph */}
        <TaskStatusGraph data={graph} />
      </D.StatusRight>
    </D.TaskDoneContainer>
  );
}

export default TaskStatus;
