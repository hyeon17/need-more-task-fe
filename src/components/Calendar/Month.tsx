import React, { useState, useRef } from 'react';
import { EventApi, DateSelectArg, EventContentArg, EventInput } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import * as S from '@/styles/month.styles';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

function Month() {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const calendarRef = useRef<FullCalendar>(null);

  const headerToolbar = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
    // right: '',
  };
  const plugins=[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]

  let eventGuid:number = 0;
  const todayStr: string = dayjs().format('YYYY-MM-DD');

  const INITIAL_EVENTS: EventInput[] = [
    {
      id: createEventId(),
      title: '일정',
      start: todayStr,
    },
    {
      id: createEventId(),
      title: '테스트1',
      date: todayStr + 'T12:30:00',
      start: todayStr + 'T12:00:00',
      end: todayStr + 'T13:00:00',
    },
    {
      id: createEventId(),
      title: '테스트2',
      start: todayStr + 'T09:00:00',
      end: todayStr + 'T10:00:00',
    },
    {
      id: createEventId(),
      title: '테스트3',
      start: todayStr + 'T20:00:00',
    },
    {
      id: createEventId(),
      title: '테스트4',
      start: todayStr + 'T18:00:00',
    },
    {
      id: createEventId(),
      title: '테스트5',
      start: todayStr + 'T17:00:00',
    },
    {
      id: createEventId(),
      title: '테스트6',
      start: todayStr + 'T16:00:00',
    },
  ];

  function createEventId() {
    return String(eventGuid++);
  }
  
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // const title = prompt('Please enter a new title for your event');

    // if (calendarRef.current && title) {
    //   calendarRef.current.getApi().addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
    // Todo: 일정 상세 페이지 이동
  };

  // const handleEventClick = (clickInfo: EventClickArg) => {
  //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     clickInfo.event.remove();
  //   }
  // };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <S.EventWrapper>
        <S.EventTitle>{eventContent.event.title}</S.EventTitle>
        <S.EventTime>{eventContent.timeText}</S.EventTime>
      </S.EventWrapper>
    );
  };

  return (
    <>
      <S.CalendarWrapper>
        <FullCalendar
          ref={calendarRef}
          plugins={plugins}
          themeSystem="bootstrap5"
          headerToolbar={headerToolbar}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={1}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          // eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed

          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </S.CalendarWrapper>
    </>
  );
}

export default Month;
