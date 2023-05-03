import React from 'react';
import Month from './Month';
import Pagination from './Pagination';
import * as S from '@/styles/month.styles';
import Test from './test';

function Calendar() {
  return (
    <S.Container>
      {/* <Pagination /> */}
      <Month />
      {/* <Test/> */}
    </S.Container>
  );
}

export default Calendar;
