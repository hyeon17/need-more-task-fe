import React from 'react';
import * as S from '@/styles/overview.styles';

function Content({ content }: any) {
  return (
    <S.OverViewContent>
      {content.map((event: any) => {
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
          )
        })
      }
    </S.OverViewContent>
  );
}

export default Content;
