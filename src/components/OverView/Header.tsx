import React from 'react';
import * as S from '@/styles/overview.styles';
import { Tabs, TabList } from '@chakra-ui/react';
import { useOverViewState } from '@/store/overViewStore';

function Header({ date, data }: { date: any; data: any }) {
  const allCount = data.length;
  const todoCount = data.filter((event: any) => event.progress === 'TODO').length;
  const inProgressCount = data.filter((event: any) => event.progress === 'IN_PROGRESS').length;
  const doneCount = data.filter((event: any) => event.progress === 'DONE').length;
  // const { getTODOStore, getIN_PROGRESSStore, getDONEStore } = useOverViewState();

  return (
    <S.OverViewHeader>
      <S.OverViewDate>{date}</S.OverViewDate>
      <S.OverViewSorted>
        <Tabs variant="soft-rounded">
          <TabList>
            <S.OverViewTab>
              All<S.IndexCount>{allCount}</S.IndexCount>
            </S.OverViewTab>
            <S.OverViewTab>
              TODO<S.IndexCount>{todoCount}</S.IndexCount>
            </S.OverViewTab>
            <S.OverViewTab>
              IN_PROGRESS<S.IndexCount>{inProgressCount}</S.IndexCount>
            </S.OverViewTab>
            <S.OverViewTab>
              DONE<S.IndexCount>{doneCount}</S.IndexCount>
            </S.OverViewTab>
          </TabList>
        </Tabs>
      </S.OverViewSorted>
    </S.OverViewHeader>
  );
}

export default Header;
