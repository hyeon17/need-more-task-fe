import React from 'react';
import * as D from '@/styles/dashboard.styles';
import CommonAvatar from '@/components/CommonAvatar/CommonAvatar';
import { getLatestProjectsAPI } from '@/apis/dashboard';
import EmptyProjects from '@/components/Dashboard/EmptyProjects';
import CommonSpinner from '@/components/common/CommonSpinner';
import { formattedDate, setTagColor } from '@/utils';
import { Tag } from '@chakra-ui/react';

function LatestProjectsList() {
  const { data: latestProjectsData, isLoading } = getLatestProjectsAPI();

  return (
    <D.LatestProjectsListContainer>
      {isLoading && <CommonSpinner size="lg" />}
      {/*  */}
      {latestProjectsData?.data.length === 0 && <EmptyProjects />}
      {latestProjectsData && latestProjectsData.data.length > 0
        ? latestProjectsData.data.map((data: any) => {
            const { taskId, taskOwner, createdAt, startAt, endAt, title, assignee, priority, progress } = data;

            return (
              <D.LatestProjectsListWrapper key={`latestProject${taskId}`}>
                <D.ProjectsListBodyWrapper>
                  <D.ProjectsListBodyHeader>
                    <span>
                      프로젝트 담당자: <strong>{taskOwner.fullname}</strong>
                    </span>
                    <CommonAvatar assignee={assignee} />
                  </D.ProjectsListBodyHeader>
                  {/* body */}
                  <D.ProjectsListBody>
                    <D.ProjectsImageDiv></D.ProjectsImageDiv>
                    <D.ProjectTitleWrapper>
                      <h5>{title}</h5>
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
