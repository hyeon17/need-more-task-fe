import React from 'react';
import * as S from '@/styles/overview.styles';
import { useOverViewState } from '@/store/overViewStore';

function Content({ content }: any) {
  const { displayedData } = useOverViewState();
  const data = displayedData ? displayedData : content;
  return (
    <S.OverViewContent>
      {data.map((event: any) => {
        return (
          <S.Cards variant={'outline'} key={event.id}>
            <S.CardWrapper>
              <S.CardTitle>{event.title}</S.CardTitle>
              <S.AvatarWrapper>
                <S.CardAvatar assignee={event.assignee} />
              </S.AvatarWrapper>
              <S.CardBadge color={event.progress}>{event.progress}</S.CardBadge>
            </S.CardWrapper>
          </S.Cards>
        );
      })}
    </S.OverViewContent>
  );
}

export default Content;
