import React from 'react'
import * as S from '@/styles/overview.styles';

function Content(content : any) {
  return (
    <S.OverViewContent>
      {Object.values(content).map((event: any) => {
        const { title, progress, id, assignee } = event;
        return (
          <S.Cards variant={'outline'} key={id}>
            <S.CardWrapper>
              <S.CardTitle>{title}</S.CardTitle>
              <S.AvatarWrapper>
                <S.CardAvatar assignee={assignee} />
              </S.AvatarWrapper>
              <S.CardBadge>{progress}</S.CardBadge>
            </S.CardWrapper>
          </S.Cards>
        );
      })}
    </S.OverViewContent>
  );
}

export default Content