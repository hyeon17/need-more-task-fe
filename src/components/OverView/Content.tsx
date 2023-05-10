import React from 'react';
import * as S from '@/styles/overview.styles';
import { useOverViewState } from '@/store/overViewStore';
import { OverViewProps, TaskOverviewProps } from '@/type/componentProps';

function Content({ content, isLoading }: OverViewProps) {
  const { displayedData } = useOverViewState();
  const data = displayedData ? displayedData : content;
  return (
    <S.OverViewContent>
      {isLoading ? (
        <>
          <S.CardSkeleton></S.CardSkeleton>
          <S.CardSkeleton></S.CardSkeleton>
          <S.CardSkeleton></S.CardSkeleton>
          <S.CardSkeleton></S.CardSkeleton>
          <S.CardSkeleton></S.CardSkeleton>
        </>
      ) : (
        <>
          {data.map((event: TaskOverviewProps) => {
            return (
              <S.Cards variant={'outline'} key={event.id}>
                <S.CardWrapper>
                  <S.CardTitle>{event.title}</S.CardTitle>
                  <S.AvatarWrapper>
                    <S.CardAvatar size="md" assignee={event.assignee} />
                  </S.AvatarWrapper>
                  <S.CardBadge color={event.progress}>{event.progress}</S.CardBadge>
                </S.CardWrapper>
              </S.Cards>
            );
          })}
        </>
      )}
    </S.OverViewContent>
  );
}

export default Content;
