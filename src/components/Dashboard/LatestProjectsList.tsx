import React from 'react';
import * as D from '@/styles/dashboard.styles';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
import CommonAvatar from '@/components/CommonAvatar/CommonAvatar';
import { getLatestProjectsAPI } from '@/apis/dashboard';
import EmptyProjects from '@/components/Dashboard/EmptyProjects';
import CommonSpinner from '@/components/common/CommonSpinner';
import { formattedDate } from '@/utils';

function LatestProjectsList() {
  const { data: latestProjectsData, isLoading } = getLatestProjectsAPI();

  return (
    <D.LatestProjectsListContainer>
      {isLoading && <CommonSpinner size="lg" />}
      {/*  */}
      {latestProjectsData?.data.length === 0 && <EmptyProjects />}
      {latestProjectsData && latestProjectsData.data.length > 0
        ? latestProjectsData.data.map((data: any) => {
            // console.log('data>>', data);

            const { taskId, taskOwner, createdAt, startAt, endAt, title, desc, assignee, priority, progress } = data;
            // console.log('assignee>>', assignee);

            return (
              <D.LatestProjectsListWrapper key={`latestProject${taskId}`}>
                <D.ProjectsListBodyWrapper>
                  <D.ProjectsListBodyHeader>
                    <CommonAvatar assignee={assignee} />
                  </D.ProjectsListBodyHeader>
                  {/* body */}
                  <D.ProjectsListBody>
                    <D.ProjectsImageDiv></D.ProjectsImageDiv>
                    <D.ProjectTitleWrapper>
                      <h5>{title}</h5>
                      <span>{desc}</span>
                    </D.ProjectTitleWrapper>
                  </D.ProjectsListBody>
                </D.ProjectsListBodyWrapper>
                {/* footer */}
                <D.ProjectListFooterWrapper>
                  <footer>
                    <span>Assignee {assignee?.length}</span>
                    <span>{formattedDate(createdAt)}</span>
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
