import React from 'react';
import Layout from '@/components/Layout';
import { useCalendarState } from '@/store/calendarStore';
import { useGetDailyTasksAPI } from '@/apis/overview';
import Header from '@/components/OverView/Header';
import Content from '@/components/OverView/Content';
import * as S from '@/styles/overview.styles';

function DailyOverview() {
  const { getDateStore } = useCalendarState();
  const allEvents: any = [];

  const { data: tasks, isLoading } = useGetDailyTasksAPI(getDateStore());

  if (tasks) {
    const datas = tasks.data.map((event: any) => ({
      title: event.title,
      progress: event.progress,
      id: event.taskId.toString(),
      assignee: event.assignee,
    }));
    allEvents.push(...datas);
  }

  return (
    <Layout hasHeader>
      <S.OverviewWrapper>
        <Header date={getDateStore()} data={allEvents} />
        <Content content={allEvents} />
      </S.OverviewWrapper>
    </Layout>
  );
}

export default DailyOverview;
