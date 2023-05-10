import React from 'react';
import Layout from '@/components/Layout';
import { useCalendarState } from '@/store/calendarStore';
import { useGetDailyTasksAPI } from '@/apis/overview';
import Header from '@/components/OverView/Header';
import Content from '@/components/OverView/Content';
import * as S from '@/styles/overview.styles';
import Head from 'next/head';
import { TaskOverviewProps } from '@/type/componentProps';

function DailyOverview() {
  const { getDateStore } = useCalendarState();
  const allEvents: TaskOverviewProps[] = [];

  const { data: tasks, isLoading } = useGetDailyTasksAPI(getDateStore());

  if (tasks) {
    const datas: TaskOverviewProps[] = tasks.data.map((event: TaskOverviewProps) => ({
      title: event.title,
      progress: event.progress,
      id: event.taskId.toString(),
      assignee: event.assignee,
    }));
    allEvents.push(...datas);
  }

  return (
    <>
      <Head>
        <title>Need More Task · Overview</title>
      </Head>
      <Layout hasHeader>
        <S.OverviewWrapper>
          <Header date={getDateStore()} content={allEvents} isLoading={isLoading} />
          <Content content={allEvents} isLoading={isLoading} />
        </S.OverviewWrapper>
      </Layout>
    </>
  );
}

export default DailyOverview;
