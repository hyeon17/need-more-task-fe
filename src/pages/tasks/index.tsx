import React from 'react';
import Layout from '@/components/Layout';
import { useCalendarState } from '@/store/calendarStore';
import { useGetDailyTasksAPI } from '@/apis/overview';
import Header from '@/components/OverView/Header';
import Content from '@/components/OverView/Content';
import * as S from '@/styles/overview.styles';
import Head from 'next/head';
import { TaskOverviewProps } from '@/type/componentProps';
import { useQuery, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';

function DailyOverview() {
  const { getDateStore } = useCalendarState();
  const allEvents: TaskOverviewProps[] = [];
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
    [`/tasks?date=${getDateStore()}&page=${0}`],
    useGetDailyTasksAPI,
    {
      getNextPageParam: (lastPage) => {
        const { next } = lastPage;
        if (!next) return false;

        const offset = new URL(next).searchParams.get('page');
        return Number(offset);
      },
    },
  );

  if (data) {
    const pages = data.pages;
    pages.forEach((page) => {
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
          <Header date={getDateStore()} content={allEvents} isLoading={isFetching || isFetchingNextPage} />
          <Content
            content={allEvents}
            isLoading={isFetching || isFetchingNextPage}
            totalCount={data?.pages[0]?.data?.totalCount}
          />
        </S.OverviewWrapper>
      </Layout>
    </>
  );
}
export default DailyOverview;
