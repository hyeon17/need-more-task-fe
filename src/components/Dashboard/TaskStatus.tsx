import React from 'react';
import * as D from '@/styles/dashboard.styles';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import TaskStatusGraph from '@/components/Dashboard/TaskStatusGraph';
import { getTaskProgressAPI } from '@/apis/dashboard';
import { Spinner } from '@chakra-ui/react';
import CommonSpinner from '@/components/common/CommonSpinner';

function TaskStatus() {
  const { data: taskData, isLoading } = getTaskProgressAPI();
  // console.log('data>>>', taskData.data.DONE);

  return (
    <D.TaskStatusContainer>
      {/* Task DONE */}
      <D.TaskDoneContainer>
        <D.StatusLeft>
          <ProfileImage />
        </D.StatusLeft>
        <D.StatusRight>
          {taskData ? (
            <>
              <D.StatusNumber>
                <h5>{taskData.data.DONE.totalCount}</h5>
                <span>Tasks Done</span>
              </D.StatusNumber>
              <D.StatusGraphWrapper>
                <TaskStatusGraph data={taskData.data.DONE.graph} />
              </D.StatusGraphWrapper>
            </>
          ) : (
            <D.SpinnerWrapper>
              <CommonSpinner size="lg" />
            </D.SpinnerWrapper>
          )}
        </D.StatusRight>
      </D.TaskDoneContainer>
      {/* Task IN_PROGRESS */}
      <D.TaskDoneContainer>
        <D.StatusLeft>
          <ProfileImage />
        </D.StatusLeft>
        <D.StatusRight>
          {taskData ? (
            <>
              <D.StatusNumber>
                <h5>{taskData.data.IN_PROGRESS.totalCount}</h5>
                <span>Tasks Done</span>
              </D.StatusNumber>
              <D.StatusGraphWrapper>
                <TaskStatusGraph data={taskData.data.IN_PROGRESS.graph} />
              </D.StatusGraphWrapper>
            </>
          ) : (
            <D.SpinnerWrapper>
              <CommonSpinner size="lg" />
            </D.SpinnerWrapper>
          )}
        </D.StatusRight>
      </D.TaskDoneContainer>

      {/* Task TODO */}
      <D.TaskDoneContainer>
        <D.StatusLeft>
          <ProfileImage />
        </D.StatusLeft>
        <D.StatusRight>
          {taskData ? (
            <>
              <D.StatusNumber>
                <h5>{taskData.data.TODO.totalCount}</h5>
                <span>Tasks Done</span>
              </D.StatusNumber>
              <D.StatusGraphWrapper>
                <TaskStatusGraph data={taskData.data.TODO.graph} />
              </D.StatusGraphWrapper>
            </>
          ) : (
            <D.SpinnerWrapper>
              <CommonSpinner size="lg" />
            </D.SpinnerWrapper>
          )}
        </D.StatusRight>
      </D.TaskDoneContainer>
    </D.TaskStatusContainer>
  );
}

export default TaskStatus;
