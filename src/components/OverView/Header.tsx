import React from 'react';
import * as S from '@/styles/overview.styles';
import { Tabs, TabList } from '@chakra-ui/react';
import { TaskProgress } from '@/apis/kanban';

function Header({ date, data }: { date: any; data: any }) {
  const Progress: TaskProgress[] = ['TODO', 'IN_PROGRESS', 'DONE'];
  const allCount: number = Object.values(data).length;
  const length: number[] = Progress.map((status: TaskProgress) => {
    return Object.values(data).filter((item: any) => item.progress === status).length;
  });
  const todoCount: number = length[0] || 0;
  const inProgressCount: number = length[1] || 0;
  const doneCount: number = length[2] || 0;

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
