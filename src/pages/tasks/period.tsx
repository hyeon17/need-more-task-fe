import React from 'react';
import Layout from '@/components/Layout';
import { useGetPeriodTasks } from '@/apis/overview';
import Header from '@/components/OverView/Header';
import Content from '@/components/OverView/Content';
import * as S from '@/styles/overview.styles';
import Head from 'next/head';
import { TaskOverviewProps } from '@/type/componentProps';
import { useSideBarState } from '@/store/sideBarStore';
import { useOverViewState } from '@/store/overViewStore';

function PeriodOverview() {
  const { getStartAtStore, getEndAtStore } = useSideBarState();
  const { currentPage, setCurrentPage } = useOverViewState();
  const allEvents: TaskOverviewProps[] = [];

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, isSuccess, error } = useGetPeriodTasks();
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
          <Header date={[getStartAtStore(), getEndAtStore()]} content={allEvents} isLoading={isLoading} />
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
export default PeriodOverview;
