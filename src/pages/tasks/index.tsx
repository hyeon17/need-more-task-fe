import React from 'react';
import Layout from '@/components/Layout';
import { useCalendarState } from '@/store/calendarStore';
import Header from '@/components/OverView/Header';
import Content from '@/components/OverView/Content';
import * as S from '@/styles/overview.styles';
import Head from 'next/head';
import { TaskOverviewProps } from '@/type/componentProps';
import { useOverViewState } from '@/store/overViewStore';
import { useDailyTasks } from '@/apis/overview';

function DailyOverview() {
  const { currentPage, setCurrentPage } = useOverViewState();
  const { getDateStore } = useCalendarState();
  const allEvents: TaskOverviewProps[] = [];

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, isSuccess, error } = useDailyTasks();

  const handleFetchNextPage = () => {
    setCurrentPage(currentPage + 1);
    if (hasNextPage) {
      fetchNextPage({ pageParam: currentPage + 1 });
    }
  };

  if (data) {
    console.log(data);
    data.pages.forEach((page) => {
      const datas: TaskOverviewProps[] = page.data.tasks.map((event: TaskOverviewProps) => ({
        title: event.title,
        progress: event.progress,
        id: event.taskId.toString(),
        assignee: event.assignee,
        start: event.startAt,
        end: event.endAt,
      }));
      allEvents.push(...datas);
    });
  }

  return (
    <>
      <Head>
        <title>Need More Task · Overview</title>
      </Head>
      <Layout hasHeader>
        <S.OverviewWrapper>
          <Header date={getDateStore()} content={allEvents} isLoading={isLoading} />
          <Content
            content={allEvents}
            isLoading={isLoading}
            isFetching={isFetching}
            fetchNextPage={handleFetchNextPage}
          />
        </S.OverviewWrapper>
      </Layout>
    </>
  );
}

export default DailyOverview;
