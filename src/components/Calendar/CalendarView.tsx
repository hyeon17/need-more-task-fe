import React, { useRef } from 'react';
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
import { useGetCalendarAPI } from '@/apis/calendar';
import { useCalendarState } from '@/store/calendarStore';

function CalendarView() {
  const calendarRef = useRef<FullCalendar>(null);
  const { setYearStore, setMonthStore, setDateStore, getYearStore, getMonthStore } = useCalendarState();

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
    const years: number = Number(dayjs(currentDate).format('YYYY'));
    const months: number = Number(dayjs(currentDate).format('MM'));
    setYearStore(years);
    setMonthStore(months);
  };

  const { data: events, isLoading } = useGetCalendarAPI(getYearStore(), getMonthStore());

  if (events) {
    const datas: EventInput[] = events.data.map((event: any) => {
      const start = event.startAt;
      const end = event.endAt;
      const isAllDay = dayjs(start).format('HH:mm:ss') === '00:00:00' && dayjs(end).format('HH:mm:ss') === '00:00:00';

      return {
        id: event.taskId.toString(),
        title: event.title,
        start: isAllDay ? start : new Date(start),
        end: isAllDay ? dayjs(end).add(1, 'day').toDate() : new Date(end),
        allDay: isAllDay,
        priority: event.priority,
      };
    });
    allEvents.push(...datas);
  }

  const useHandleDateClick = (info: any) => {
    setDateStore(info.dateStr);
    router.push(`/task?date=${info.dateStr}`);
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    const event = allEvents.find((e) => e.id === eventContent.event.id);
    if (!event) return null;

    return (
      <S.EventWrapper key={event.id} color={event.priority}>
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
          dayMaxEventRows={10}
          eventContent={renderEventContent}
          dateClick={useHandleDateClick}
          navLinks={true}
          events={allEvents}
          datesSet={handleDatesSet}
        />
      </S.CalendarWrapper>
    </S.Container>
  );
}

export default CalendarView;
