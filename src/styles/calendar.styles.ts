import styled from '@emotion/styled';
import theme from './theme';

export const Container = styled.div`
  width: 1100px;
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
  .btn {
    background-color: ${({ theme }) => theme.primary};
  }
  .fc .fc-daygrid-day-frame {
    height: 130px;
  }
  .fc {
    --fc-event-bg-color: none;
    --fc-event-border-color: none;
  }
  .fc-daygrid-day-frame {
    cursor: pointer;
  }
`;

export const EventTime = styled.div`
  padding: 0 5px 5px 5px;

`;

export const EventTitle = styled.div`
  padding: 5px 5px 0 5px;
`;

export const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 0 5px 5px;
  width: 99%;
  height: 45px;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 5px;
  border-radius: 7px;
  background-color: ${({ color }) => {
    switch (color) {
      case 'URGENT':
        return theme.errorColor;
      case 'HIGH':
        return theme.warningColor;
      case 'MEDIUM':
        return theme.inputWarningColor;
      case 'LOW':
        return theme.successColor;
      default:
        return theme.primary;
    }
  }};
  color: ${({ theme }) => theme.white};
`;
