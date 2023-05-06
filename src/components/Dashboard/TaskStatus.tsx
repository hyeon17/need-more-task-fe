import React from 'react';
import * as D from '@/styles/dashboard.styles';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import TaskStatusGraph from '@/components/Dashboard/TaskStatusGraph';
import styled from '@emotion/styled';

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
          <D.StatusGraphWrapper>
            <TaskStatusGraph />
          </D.StatusGraphWrapper>
        </D.StatusRight>
      </D.TaskDoneContainer>
      {/*  */}
      <D.TaskDoneContainer>
        <D.StatusLeft>
          <ProfileImage />
        </D.StatusLeft>
        <D.StatusRight>
          <D.StatusNumber>
            <h5>120</h5>
            <span>Tasks Done</span>
          </D.StatusNumber>
          <D.StatusGraphWrapper>
            <TaskStatusGraph />
          </D.StatusGraphWrapper>
        </D.StatusRight>
      </D.TaskDoneContainer>
      {/*  */}
      <D.TaskDoneContainer>
        <D.StatusLeft>
          <ProfileImage />
        </D.StatusLeft>
        <D.StatusRight>
          <D.StatusNumber>
            <h5>120</h5>
            <span>Tasks Done</span>
          </D.StatusNumber>
          <D.StatusGraphWrapper>
            <TaskStatusGraph />
          </D.StatusGraphWrapper>
        </D.StatusRight>
      </D.TaskDoneContainer>
    </D.TaskStatusContainer>
  );
}

export default TaskStatus;
