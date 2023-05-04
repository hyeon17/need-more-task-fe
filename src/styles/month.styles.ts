import styled from '@emotion/styled';

export const Container = styled.div`
  width: 1000px;
`;

export const CalendarWrapper = styled.div`
  /* 일요일 날짜 빨간색 */
  .fc-day-sun a {
    color: red;
    text-decoration: none;
  }
  /* 토요일 날짜 파란색 */
  .fc-day-sat a {
    color: blue;
    text-decoration: none;
  }
  /* 버튼  */
  /* .fc-button {
    background-color: ${({ theme }) => theme.primary};
    &:active,
    &:hover {
      background-color: ${({ theme }) => theme.successColor};
      box-shadow: none;
    }
    &:focus {
      box-shadow:none;
    }
  } */
  .btn{
    background-color: ${({ theme }) => theme.primary};
  }
  .fc .fc-daygrid-day-frame{
    height:100px;
  }
`;

export const EventTime = styled.div``;

export const EventTitle = styled.div``;

export const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 5px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
`;
