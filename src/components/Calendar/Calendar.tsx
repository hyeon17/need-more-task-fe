import React from 'react';
import Month from './Month';
import Pagination from './Pagination';
import * as S from '@/styles/month.styles';

function Calendar() {
  return (
    <S.Container>
      {/* <Pagination /> */}
      <Month />
    </S.Container>
  );
}

export default Calendar;
