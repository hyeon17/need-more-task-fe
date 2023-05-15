import React, { useState, useEffect } from 'react';
import * as S from '@/styles/overview.styles';
import { Tabs, TabList } from '@chakra-ui/react';
import { useOverViewState } from '@/store/overViewStore';
import { OverViewProps, TaskOverviewProps } from '@/type/componentProps';
import { TabSkeletons, DateSkeletons } from '@/components/Skeleton';

function Header({ date, content, isLoading }: OverViewProps) {
  const {
    setDisplayedData,
  } = useOverViewState();
  const [allCount, setAllCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [selectedProgress, setSelectedProgress] = useState('All');

  useEffect(() => {
    setAllCount(content.length);
    setTodoCount(getCountByProgress('TODO'));
    setInProgressCount(getCountByProgress('IN_PROGRESS'));
    setDoneCount(getCountByProgress('DONE'));
    return () => {
      setAllCount(0);
      setTodoCount(0);
      setInProgressCount(0);
      setDoneCount(0);
    };
  }, [content]);

  function getCountByProgress(progress: string) {
    return content.filter((event: TaskOverviewProps) => event.progress === progress).length;
  }

  const handleTabClick = (progress: string) => {
    setSelectedProgress(progress);
    const filteredData =
      progress === 'All' ? content : content.filter((event: TaskOverviewProps) => event.progress === progress);
    setDisplayedData(filteredData);
  };

  return (
    <S.OverViewHeader>
      <S.OverViewDate>
        {isLoading ? <DateSkeletons /> : <>{Array.isArray(date) ? `${date[0]} ~ ${date[1]}` : date}</>}
      </S.OverViewDate>
      <S.OverViewSorted>
        <Tabs variant="soft-rounded">
          <TabList>
            {isLoading ? (
              <TabSkeletons />
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
