import React, { useRef, useState } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-calendar/dist/tui-calendar.css';

function Month() {
  const calendars = [{ id: 'cal1', name: 'Personal' }];
  const initialEvents = [
    {
      id: '1',
      calendarId: 'cal1',
      title: 'Lunch',
      category: 'time',
      start: '2023-05-28T12:00:00',
      end: '2023-05-28T13:30:00',
    },
    {
      id: '2',
      calendarId: 'cal1',
      title: 'Coffee Break',
      category: 'time',
      start: '2022-06-28T15:00:00',
      end: '2022-06-28T15:30:00',
    },
  ];

  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const onAfterRenderEvent = (event: { title: string }) => {
    console.log(event.title);
  };

  const onClickNext = () => {
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.next();
    setCurrentMonth(calendarInstance.getDate());
  };

  const onClickPrev = () => {
    const calendarInstance = calendarRef.current.getInstance();
    calendarInstance.prev();
    setCurrentMonth(calendarInstance.getDate());
  };

  return (
    <div>
      <div>{`${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`}</div>
      <button onClick={onClickNext}>다음달</button>
      <button onClick={onClickPrev}>이전달</button>
      <Calendar
        ref={calendarRef}
        view="month"
        month={{
          dayNames: ['일', '월', '화', '수', '목', '금', '토'],
          visibleWeeksCount: 5,
        }}
        calendars={calendars}
        scheduleView
        schedule={initialEvents}
        onAfterRenderEvent={onAfterRenderEvent}
        useCreationPopup={true}
        useDetailPopup={true}
       
      />
    </div>
  );
}

export default Month;
