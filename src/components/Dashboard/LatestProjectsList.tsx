import React from 'react';
import * as D from '@/styles/dashboard.styles';
import CommonAvatar from '@/components/CommonAvatar/CommonAvatar';
import { getLatestProjectsAPI } from '@/apis/dashboard';
import CommonEmptyProjects from '@/components/common/CommonEmptyProjects';
import CommonSpinner from '@/components/common/CommonSpinner';
import { formattedDate, setTagColor, taskTitle } from '@/utils';
import { Tag } from '@chakra-ui/react';
import ProfileImage from '../CommonHeader/ProfileImage';
import { useModalState } from '@/store/modalStore';

function LatestProjectsList() {
  const { data: latestProjectsData, isLoading } = getLatestProjectsAPI();
  const { onSetModalId, onOpenOverView } = useModalState();

  const handleOpenTaskOverview = (taskId: string) => {
    onSetModalId(taskId);
    onOpenOverView();
  };

  return (
    <D.LatestProjectsListContainer>
      {isLoading && <CommonSpinner size="lg" />}
      {/*  */}
      {latestProjectsData?.data.length === 0 && <CommonEmptyProjects />}
      {latestProjectsData && latestProjectsData.data.length > 0
        ? latestProjectsData.data.map((data: any) => {
            const { taskId, taskOwner, createdAt, startAt, endAt, title, assignee, priority, progress } = data;
            // console.log('data>>>', data);

            return (
              <D.LatestProjectsListWrapper key={`latestProject${taskId}`}>
                <D.ProjectsListBodyWrapper onClick={() => handleOpenTaskOverview(taskId)}>
                  <D.ProjectsListBodyHeader>
                    <span>
                      프로젝트 담당자: <strong>{taskOwner.fullname}</strong>
                    </span>
                    <CommonAvatar assignee={assignee} />
                  </D.ProjectsListBodyHeader>
                  {/* body */}
                  <D.ProjectsListBody>
                    <ProfileImage width={54} height={54} src={taskOwner.profileImageUrl} />
                    {/* <D.ProjectsImageDiv></D.ProjectsImageDiv> */}
                    <D.ProjectTitleWrapper>
                      <h5>{taskTitle(title)}</h5>
                      <span>
                        <Tag size="sm" backgroundColor={setTagColor(priority)} color="white">
                          {priority}
                        </Tag>
                        <Tag size="sm" backgroundColor={setTagColor(progress)} color="white">
                          {progress}
                        </Tag>
                      </span>
                    </D.ProjectTitleWrapper>
                  </D.ProjectsListBody>
                </D.ProjectsListBodyWrapper>
                {/* footer */}
                <D.ProjectListFooterWrapper>
                  <footer>
                    {/* <span>Assignee: {assignee?.length}명</span> */}
                    <span>생성 날짜: {formattedDate(createdAt)}</span>
                  </footer>
                </D.ProjectListFooterWrapper>
              </D.LatestProjectsListWrapper>
            );
          })
        : ''}
    </D.LatestProjectsListContainer>
  );
}

export default LatestProjectsList;
