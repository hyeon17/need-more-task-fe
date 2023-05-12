import React from 'react';
import Layout from '@/components/Layout';
import { useGetPeriodTasksAPI } from '@/apis/overview';
import Header from '@/components/OverView/Header';
import Content from '@/components/OverView/Content';
import * as S from '@/styles/overview.styles';
import Head from 'next/head';
import { TaskOverviewProps } from '@/type/componentProps';
import { useSideBarState } from '@/store/sideBarStore';

function PeriodOverview() {
  const { getStartAtStore, getEndAtStore } = useSideBarState();
  const allEvents: TaskOverviewProps[] = [];
  const { data: res, isLoading, refetch } = useGetPeriodTasksAPI(getStartAtStore(), getEndAtStore(), 0);

  if (res) {
    const datas: TaskOverviewProps[] = res.data.tasks.map((event: TaskOverviewProps) => ({
      title: event.title,
      progress: event.progress,
      id: event.taskId.toString(),
      assignee: event.assignee,
      start: event.startAt,
      end: event.endAt,
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
          <Header date={[getStartAtStore(), getEndAtStore()]} content={allEvents} isLoading={isLoading} />
          <Content content={allEvents} isLoading={isLoading} totalCount={res?.data?.totalCount} />
        </S.OverviewWrapper>
      </Layout>
    </>
  );
}
export default PeriodOverview;