import React from 'react';
import * as S from '@/styles/overview.styles';

export function TabSkeletons() {
  return (
    <>
      <S.TabSkeleton></S.TabSkeleton>
      <S.TabSkeleton></S.TabSkeleton>
      <S.TabSkeleton></S.TabSkeleton>
      <S.TabSkeleton></S.TabSkeleton>
    </>
  );
}

export function CardSkeletons() {
  return (
    <>
      <S.CardSkeleton></S.CardSkeleton>
      <S.CardSkeleton></S.CardSkeleton>
      <S.CardSkeleton></S.CardSkeleton>
      <S.CardSkeleton></S.CardSkeleton>
      <S.CardSkeleton></S.CardSkeleton>
    </>
  );
}

export function DateSkeletons() {
  return (
    <>
      <S.DateSkeleton></S.DateSkeleton>
    </>
  );
}
