import React, { useState } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

function Month() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleOnClickNext = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleOnClickPrev = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const calendars = [
    {
      id: '0',
      name: 'Private',
      backgroundColor: '#9e5fff',
      borderColor: '#9e5fff',
    },
  ];

  const initialEvents = [
    {
      id: '1',
      calendarId: 'cal1',
      title: 'Lunch',
      category: 'time',
      start: '2022-06-28T12:00:00',
      end: '2022-06-28T13:30:00',
    },
  ];

  const onAfterRenderEvent = (event: { title: any }) => {
    console.log(event.title);
  };
const onBeforeCreateSchedule = (scheduleData: { start: string | number | Date; }) => {
  const startDate = new Date(scheduleData.start);
  if (startDate.getMonth() !== currentDate.getMonth()) {
    alert('You cannot create a schedule outside the current month.');
    return false;
  }
  return true;
};
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleOnClickPrev}>Prev</button>
        <h2>{currentDate.toLocaleString('default', { year: 'numeric', month: 'long' })}</h2>
        <button onClick={handleOnClickNext}>Next</button>
      </div>
      <Calendar
        view="month"
        month={{
          dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          visibleWeeksCount: 5,
        }}
        calendars={calendars}
        events={initialEvents}
        scheduleView={true}
        timezones={[
          {
            timezoneOffset: -new Date().getTimezoneOffset(),
            displayLabel: 'GMT-07:00',
            tooltip: 'Los Angeles',
          },
        ]}
        useCreationPopup
        useDetailPopup
        onBeforeCreateSchedule={onBeforeCreateSchedule}
      />
    </>
  );
}

export default Month;
