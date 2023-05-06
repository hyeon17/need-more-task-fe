import React from 'react';
import * as D from '@/styles/dashboard.styles';
import ProfileImage from '@/components/CommonHeader/ProfileImage';

function TaskStatus() {
  return (
    <D.TaskStatusContainer>
      <D.TaskDoneContainer>
        <D.StatusLeft>
          <ProfileImage />
        </D.StatusLeft>
        <D.StatusRight>
          <D.StatusNumber>
            <h5>120</h5>
            <span>Tasks Done</span>
          </D.StatusNumber>
          <D.StatusGraph>그래프</D.StatusGraph>
        </D.StatusRight>
      </D.TaskDoneContainer>
      <D.TaskDoneContainer>asd</D.TaskDoneContainer>
      <D.TaskDoneContainer>asd</D.TaskDoneContainer>
    </D.TaskStatusContainer>
  );
}

export default TaskStatus;
