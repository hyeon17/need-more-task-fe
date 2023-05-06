import React from 'react';
import * as D from '@/styles/dashboard.styles';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import CommonSpinner from '@/components/common/CommonSpinner';
import TaskStatusGraph from '@/components/Dashboard/TaskStatusGraph';

function TaskStatus({ title, graph, totalCount }: any) {
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
        <D.StatusGraphWrapper>
          <TaskStatusGraph data={graph} />
        </D.StatusGraphWrapper>
      </D.StatusRight>
    </D.TaskDoneContainer>
  );
}

export default TaskStatus;
