import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useCalendarState } from '@/store/calendarStore';
import { getDailyTasks } from '@/apis/overview';
import { KanbanBoardDataInterface, TaskData, Assignee } from '@/apis/kanban';
import Header from '@/components/OverView/Header';
import Content from '@/components/OverView/Content';
import * as S from '@/styles/overview.styles';

function DailyOverview() {
  const [currentEvents, setCurrentEvents] = useState<KanbanBoardDataInterface>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { getDateStore } = useCalendarState();
  const allEvents:any = [];

  useEffect(() => {
    getDailyTasks(getDateStore()).then((res) => {
      setCurrentEvents(res.data);
    });
  }, [getDateStore()]);

  // todo: 데이터 넘기는거 다시 해보자 
  useEffect(() => {
    if (currentEvents && currentEvents.data && currentEvents.data.length > 0) {
      const events = currentEvents.data.map((event: TaskData) => ({
        title: event.title,
        progress: event.progress,
        id: event.taskId.toString(),
        assignee: event.assignee,
      }));
      console.log(events);
      allEvents.push(...events); 
    }
  }, [currentEvents]);

  return (
    <Layout hasHeader>
      <S.OverviewWrapper>
        <Header date={getDateStore()} data={0} />
        <Content data={allEvents} />
      </S.OverviewWrapper>
    </Layout>
  );
}

export default DailyOverview;
