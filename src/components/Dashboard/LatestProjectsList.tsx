import React, { useEffect, useRef, useState } from 'react';
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

  const [isAtLeftEnd, setIsAtLeftEnd] = useState(true);
  const [isAtRightEnd, setIsAtRightEnd] = useState(false);

  const handleOpenTaskOverview = (taskId: string) => {
    onSetModalId(taskId);
    onOpenOverView();
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 600,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 600,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const element = scrollContainerRef.current;

    const checkScrollPosition = () => {
      if (element) {
        setIsAtLeftEnd(element.scrollLeft === 0);
        setIsAtRightEnd(element.scrollLeft + element.offsetWidth === element.scrollWidth);
      }
    };

    element?.addEventListener('scroll', checkScrollPosition);

    return () => {
      element?.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    <D.LatestProjectsListContainerWithButton>
      <D.ScrollLeftButton isDisabled={isAtLeftEnd} onClick={scrollLeft}>
        {'<'}
      </D.ScrollLeftButton>
      <D.ScrollRightButton isDisabled={isAtRightEnd} onClick={scrollRight}>
        {'>'}
      </D.ScrollRightButton>
      <D.LatestProjectsListContainer ref={scrollContainerRef}>
        {isLoading && <CommonSpinner size="lg" />}
        {/*  */}
        {latestProjectsData?.data.length === 0 && <CommonEmptyProjects />}
        {latestProjectsData && latestProjectsData.data.length > 0
          ? latestProjectsData.data.map((data: any) => {
              const { taskId, taskOwner, createdAt, startAt, endAt, title, assignee, priority, progress } = data;
              // console.log('data>>>', data);

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
                    <D.ProjectsListBody onClick={() => handleOpenTaskOverview(taskId)}>
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
    </D.LatestProjectsListContainerWithButton>
  );
}

export default LatestProjectsList;
