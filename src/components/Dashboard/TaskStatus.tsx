import React from 'react';
import * as D from '@/styles/dashboard.styles';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import TaskStatusGraph from '@/components/Dashboard/TaskStatusGraph';
import { ITaskStatus } from '@/type/dashBoardTypes';
import { TaskStatusTitle } from '@/type/enum/TaskStatusEnum';

function TaskStatus({ title, graph, totalCount }: ITaskStatus) {
  const subTitle = (title: string) => {
    switch (title) {
      case TaskStatusTitle.DONE:
        return '최근 7일 동안 끝낸 Tasks 수 입니다.';
      case TaskStatusTitle.IN_PROGRESS:
        return '최근 7일 동안 진행중인 Tasks 수 입니다.';
      case TaskStatusTitle.TODO:
        return '최근 7일 동안 생성된 Tasks 수 입니다..';
      default:
        return '';
    }
  };

  return (
    <D.TaskDoneContainer>
      {/* <D.StatusLeft><ProfileImage /></D.StatusLeft> */}
      <D.StatusRight>
        <D.StatusNumber>
          <h5>{totalCount}</h5>
          <span>{title}</span>
          <span>{subTitle(title)}</span>
        </D.StatusNumber>
        {/* Task Status Graph */}
        <TaskStatusGraph data={graph} />
      </D.StatusRight>
    </D.TaskDoneContainer>
  );
}

export default TaskStatus;
