import React, { useRef, useEffect } from 'react';
import * as S from '@/styles/overview.styles';
import { useOverViewState } from '@/store/overViewStore';
import { OverViewProps, TaskOverviewProps } from '@/type/componentProps';
import { useRouter } from 'next/router';
import { CardSkeletons } from '@/components/Skeleton';
import { useModalState } from '@/store/modalStore';

function Content({ content, isLoading, isFetching, fetchNextPage }: OverViewProps) {
  const { displayedData } = useOverViewState();
  const data = displayedData ? displayedData : content;
  const router = useRouter();
  const { onSetModalId, onOpenOverView } = useModalState();
  // 무한 스크롤
  const bottom = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    );

    if (bottom.current) {
      observer.observe(bottom.current);
    }

    return () => {
      if (bottom.current) {
        observer.unobserve(bottom.current);
      }
    };
  }, [bottom.current, isFetching, fetchNextPage]);

  const handleMoveTask = () => {
    router.push(`/kanban`);
  };

  const handleOpenTaskOverview = (taskId: string) => {
    onSetModalId(taskId);
    onOpenOverView();
  };


  return (
    <S.OverViewContent>
      {isLoading ? (
        <CardSkeletons />
      ) : (
        <>
          {data ? (
            data.map((event: TaskOverviewProps) => (
              <S.Cards variant={'outline'} key={event.id} onClick={() => handleOpenTaskOverview(event.id.toString())}>
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
          <div ref={bottom} />
        </>
      )}
    </S.OverViewContent>
  );
}

export default Content;
