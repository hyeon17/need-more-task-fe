import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/OverView/Header';
import Content from '@/components/OverView/Content';
import Head from 'next/head';
import { TaskOverviewProps } from '@/type/componentProps';
import { useOverViewState } from '@/store/overViewStore';
import { useRouter } from 'next/router';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useToast } from '@chakra-ui/react';
import Sidebar from '@/components/Drawer';
import * as S from '@/styles/overview.styles';

function OverView({ api, store }: any) {
  const { currentPage, setCurrentPage, getTotalPage, setTotalPage } = useOverViewState();
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, isSuccess, error } = api;
  const allEvents: TaskOverviewProps[] = [];

  const router = useRouter();
  const { getAccessToken } = useAccessTokenStore();
  const accessToken = getAccessToken();
  const toast = useToast();
  useEffect(() => {
    if (!accessToken) {
      toast({
        title: '인증되지 않은 사용자는 접근할 수 없습니다.',
        description: '로그인 페이지로 이동합니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      router.push('/login');
    }
  }, [accessToken]);

  const handleFetchNextPage = () => {
    if (hasNextPage && currentPage !== getTotalPage()) {
      setCurrentPage(currentPage + 1);
      fetchNextPage({ pageParam: currentPage + 1 });
    }
  };

  const handleBack = () => {
    setTotalPage(0);
    setCurrentPage(0);
  };
  useEffect(() => {
    const handleRouteChange = (shallow: any) => {
      if (!shallow) {
        handleBack();
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  if (data) {
    data.pages.forEach((page:any) => {
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
          <Header
            date={store}
            content={allEvents}
            isLoading={isLoading}
            totalCount={data?.pages[0]?.data.totalCount}
            todoCount={data?.pages[0]?.data.todoCount}
            inProgressCount={data?.pages[0]?.data.inProgressCount}
            doneCount={data?.pages[0]?.data.doneCount}
          />
          <Content
            content={allEvents}
            isLoading={isLoading}
            isFetching={isFetching}
            fetchNextPage={handleFetchNextPage}
          />
        </S.OverviewWrapper>
        <Sidebar />
      </Layout>
    </>
  );
}

export default OverView;
