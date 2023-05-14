import React,{ useState } from 'react';
import * as S from '@/styles/overview.styles';
import { useOverViewState } from '@/store/overViewStore';
import { OverViewProps, TaskOverviewProps } from '@/type/componentProps';
import { useRouter } from 'next/router';
import { CardSkeletons } from '@/components/Skeleton';

function Content({ content, isLoading, totalCount }: OverViewProps) {
  const { displayedData } = useOverViewState();
  const data = displayedData ? displayedData : content;
  const router = useRouter();
  console.log(totalCount, content);

  const handleMoveTask = () => {
    router.push(`/kanban`);
  };

  return (
    <S.OverViewContent>
      {isLoading ? (
        <CardSkeletons />
      ) : (
        <>
          {data ? (
            data.map((event: TaskOverviewProps) => (
              <S.Cards variant={'outline'} key={event.id}>
                <S.CardWrapper>
                  <S.CardTitle>{event.title}</S.CardTitle>
                  <S.AvatarWrapper>
                    <S.CardAvatar size="md" assignee={event.assignee} />
                  </S.AvatarWrapper>
                  <S.CardBadge color={event.progress}>{event.progress}</S.CardBadge>
                </S.CardWrapper>
              </S.Cards>
            ))
          ) : (
            <S.NoneWrapper>
              <div>
                일정이 존재하지 않습니다. 일정을 <S.SpanWord>추가</S.SpanWord>해주세요
              </div>
              <S.NoneButton onClick={handleMoveTask}>일정 추가하러 가기</S.NoneButton>
            </S.NoneWrapper>
          )}
        </>
      )}
    </S.OverViewContent>
  );
}

export default Content;
