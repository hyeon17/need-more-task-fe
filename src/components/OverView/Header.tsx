import React from 'react';
import * as S from '@/styles/overview.styles';
import { Tabs, TabList } from '@chakra-ui/react';
import { useOverViewState } from '@/store/overViewStore';
import { OverViewProps, TaskOverviewProps } from '@/type/componentProps';

function Header({ date, content, isLoading }: OverViewProps) {
  const allCount:number = content.length;
  const todoCount:number = getCountByProgress('TODO');
  const inProgressCount:number = getCountByProgress('IN_PROGRESS');
  const doneCount:number = getCountByProgress('DONE');

  function getCountByProgress(progress: string) {
    return content.filter((event: TaskOverviewProps) => event.progress === progress).length;
  }
  const { selectedProgress, setSelectedProgress, setDisplayedData } = useOverViewState();

  const handleTabClick = (progress: string) => {
    setSelectedProgress(progress);
    const filteredData = progress === 'All' ? content : content.filter((event: TaskOverviewProps) => event.progress === progress);
    setDisplayedData(filteredData);
  };

  return (
    <S.OverViewHeader>
      <S.OverViewDate>
        {isLoading ? (
          <>
            <S.DateSkeleton></S.DateSkeleton>
          </>
        ) : (
          <>{Array.isArray(date) ? `${date[0]} ~ ${date[1]}` : date}</>
        )}
      </S.OverViewDate>
      <S.OverViewSorted>
        <Tabs variant="soft-rounded">
          <TabList>
            {isLoading ? (
              <>
                <S.TabSkeleton></S.TabSkeleton>
                <S.TabSkeleton></S.TabSkeleton>
                <S.TabSkeleton></S.TabSkeleton>
                <S.TabSkeleton></S.TabSkeleton>
              </>
            ) : (
              <>
                {['All', 'TODO', 'IN_PROGRESS', 'DONE'].map((progress) => (
                  <S.OverViewTab
                    key={progress}
                    onClick={() => handleTabClick(progress)}
                    aria-selected={selectedProgress === progress}
                  >
                    {progress}
                    <S.IndexCount>
                      {progress === 'All'
                        ? allCount
                        : progress === 'TODO'
                        ? todoCount
                        : progress === 'IN_PROGRESS'
                        ? inProgressCount
                        : doneCount}
                    </S.IndexCount>
                  </S.OverViewTab>
                ))}
              </>
            )}
          </TabList>
        </Tabs>
      </S.OverViewSorted>
    </S.OverViewHeader>
  );
}

export default Header;
