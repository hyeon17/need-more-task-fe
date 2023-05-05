import React, { useState, useRef, useEffect } from 'react';
import { EventContentArg, EventInput, EventClickArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
import * as S from '@/styles/calendar.styles';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { useRouter } from 'next/router';
import { getCalendar } from '@/apis/calendar';
import { useQuery } from '@tanstack/react-query';
import { CalendarResponse } from '@/type/componentProps';
import { useCalendarState } from '@/store/calendarStore';

function CalendarView() {
  const [currentEvents, setCurrentEvents] = useState<CalendarResponse[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const [year, setYear] = useState<number>(Number(dayjs().format('YYYY')));
  const [month, setMonth] = useState<number>(Number(dayjs().format('MM')));
  const { setYearStore, setMonthStore } = useCalendarState();

  const headerToolbar = {
    left: 'dayGridMonth,timeGridWeek,timeGridDay',
    center: 'title',
    right: 'prev,next today',
  };
  const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin];
  const router = useRouter();
  const allEvents: EventInput[] = [];

  const handleDatesSet = (eventInfo: EventClickArg) => {
    const calendarApi = eventInfo.view.calendar;
    const currentDate = calendarApi.getDate();
    const year: number = Number(dayjs(currentDate).format('YYYY'));
    const month: number = Number(dayjs(currentDate).format('MM'));
    setYear(year);
    setYearStore(year);
    setMonth(month);
    setMonthStore(month);
    router.push(`/calendar?year=${year}&month=${month}`);
  };

  useEffect(() => {
    getCalendar(year, month).then((res) => {
      console.log(res);
      setCurrentEvents([res.data]);
    });
  }, [year, month]);

  const data = currentEvents.map((event) => event.data);
  if (data && data[0]) {
    const events: EventInput[] = data[0].map((event) => ({
      id: event.taskId.toString(),
      title: event.title,
      start: event.startAt,
      end: event.endAt,
      priority: event.priority,
    }));
    allEvents.push(...events);
  }

  const renderEventContent = (eventContent: EventContentArg) => {
    const handleEventClick = () => {
      router.push(`/kanban`);
    };

    const event = allEvents.find((e) => e.id === eventContent.event.id);
    if (!event) return null;

    return (
      <S.EventWrapper key={event.id} onClick={handleEventClick} color={event.priority}>
        <S.EventTitle>{eventContent.event.title}</S.EventTitle>
        <S.EventTime>{eventContent.timeText}</S.EventTime>
      </S.EventWrapper>
    );
  };

  return (
    <S.Container>
      <S.CalendarWrapper>
        <FullCalendar
          ref={calendarRef}
          plugins={plugins}
          themeSystem="bootstrap5"
          headerToolbar={headerToolbar}
          initialView="dayGridMonth"
          selectable={true}
          selectMirror={true}
          dayMaxEvents={1}
          eventContent={renderEventContent} // custom render function
          navLinks={true}
          events={allEvents}
          datesSet={handleDatesSet}
        />
      </S.CalendarWrapper>
    </S.Container>
  );
}

export default CalendarView;
