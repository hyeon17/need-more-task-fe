import React from 'react';
import * as S from '@/styles/overview.styles';
import { Tabs, TabList } from '@chakra-ui/react';
import { useOverViewState } from '@/store/overViewStore';

function Header({ date, data }: { date: any; data: any }) {
  const allCount = data.length;
  const todoCount = data.filter((event: any) => event.progress === 'TODO').length;
  const inProgressCount = data.filter((event: any) => event.progress === 'IN_PROGRESS').length;
  const doneCount = data.filter((event: any) => event.progress === 'DONE').length;
  const { selectedProgress, setSelectedProgress, setDisplayedData } = useOverViewState();

  const handleTabClick = (progress: string) => {
    setSelectedProgress(progress);
    if (progress === 'All') {
      setDisplayedData(data);
    } else {
      setDisplayedData(data.filter((event: any) => event.progress === progress));
    }
  };

  return (
    <S.OverViewHeader>
      <S.OverViewDate>{date}</S.OverViewDate>
      <S.OverViewSorted>
        <Tabs variant="soft-rounded">
          <TabList>
            <S.OverViewTab onClick={() => handleTabClick('All')} aria-selected={selectedProgress === 'All'}>
              All<S.IndexCount>{allCount}</S.IndexCount>
            </S.OverViewTab>
            <S.OverViewTab onClick={() => handleTabClick('TODO')} aria-selected={selectedProgress === 'TODO'}>
              TODO<S.IndexCount>{todoCount}</S.IndexCount>
            </S.OverViewTab>
            <S.OverViewTab onClick={() => handleTabClick('IN_PROGRESS')} aria-selected={selectedProgress === 'IN_PROGRESS'}>
              IN_PROGRESS<S.IndexCount>{inProgressCount}</S.IndexCount>
            </S.OverViewTab>
            <S.OverViewTab onClick={() => handleTabClick('DONE')} aria-selected={selectedProgress === 'DONE'}>
              DONE<S.IndexCount>{doneCount}</S.IndexCount>
            </S.OverViewTab>
          </TabList>
        </Tabs>
      </S.OverViewSorted>
    </S.OverViewHeader>
  );
}

export default Header;
