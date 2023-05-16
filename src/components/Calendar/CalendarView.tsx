import React, { useRef } from 'react';
import { EventContentArg, EventInput, DatesSetArg } from '@fullcalendar/core';
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
import { useOverViewState } from '@/store/overViewStore';

function CalendarView() {
  const calendarRef = useRef<FullCalendar>(null);
  const { setDateStore, getYearStore, getMonthStore, setYearStore, setMonthStore } = useCalendarState();
  const { setCurrentPage, setTotalPage } = useOverViewState();
  const router = useRouter();
  const headerToolbar = {
    left: 'dayGridMonth,timeGridWeek,timeGridDay',
    center: 'title',
    right: 'prev,next today',
  };
  const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin];
  const allEvents: EventInput[] = [];
  const { data: events, isLoading } = useGetCalendarAPI(getYearStore(), getMonthStore());

  // 이전, 다음 버튼 클릭시 year, month 저장
  const handleDatesSet = (eventInfo: DatesSetArg) => {
    const calendarApi = eventInfo.view.calendar;
    const currentDate = calendarApi.getDate();
    const years: number = Number(dayjs(currentDate).format('YYYY'));
    const months: number = Number(dayjs(currentDate).format('MM'));
    setYearStore(years);
    setMonthStore(months);
  };

  // 선택된 year, month에 대한 데이터 allEvents에 가공하여 저장
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

  // 라우팅 및 페이지 수 초기화
  const useHandleDateClick = (info: any) => {
    setDateStore(info.dateStr);
    setTotalPage(0);
    setCurrentPage(0);
    router.push(`/tasks?date=${info.dateStr}&page=0`);
  };

  // 일정 렌더링
  const renderEventContent = (eventContent: EventContentArg) => {
    const event = allEvents.find((e) => e.id === eventContent.event.id);
    if (!event) return null;

    const handleEventClick = () => {
      alert(`${eventContent.event.title}의 상세보기는 보고싶은 날의 빈 공간을 클릭하여 확인할 수 있습니다`);
    };

    return (
      <S.EventWrapper key={event.id} color={event.priority} onClick={handleEventClick}>
        <S.EventTitle>{eventContent.event.title}</S.EventTitle>
        <S.EventTime>{eventContent.timeText}</S.EventTime>
      </S.EventWrapper>
    );
  };

  return (
    <S.Container>
      {isLoading && !getYearStore() && !getMonthStore() ? (
        <S.SkeletonWrapper></S.SkeletonWrapper>
      ) : (
        <S.CalendarWrapper>
          <FullCalendar
            height="1100px"
            ref={calendarRef}
            plugins={plugins}
            themeSystem="bootstrap5"
            headerToolbar={headerToolbar}
            initialView="dayGridMonth"
            selectable={true}
            selectMirror={true}
            dayMaxEvents={3}
            dayMaxEventRows={10}
            eventContent={renderEventContent}
            dateClick={useHandleDateClick}
            navLinks={true}
            events={allEvents}
            datesSet={handleDatesSet}
          />
        </S.CalendarWrapper>
      )}
    </S.Container>
  );
}

export default CalendarView;
