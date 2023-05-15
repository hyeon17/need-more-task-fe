import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useCalendarState } from '@/store/calendarStore';
import Header from '@/components/OverView/Header';
import Content from '@/components/OverView/Content';
import * as S from '@/styles/overview.styles';
import Head from 'next/head';
import { TaskOverviewProps } from '@/type/componentProps';
import { useOverViewState } from '@/store/overViewStore';
import { useDailyTasks } from '@/apis/overview';
import { useRouter } from 'next/router';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useToast } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { axiosInstance, axiosWithToken } from '@/apis/configs';

function DailyOverview({ date }: any) {
  console.log(date);
  const { currentPage, setCurrentPage, getTotalPage } = useOverViewState();
  const { getDateStore } = useCalendarState();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useDailyTasks();

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

  if (data) {
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { getDateStore } = useCalendarState();
  const queryClient = new QueryClient();
  const queryKey = `/tasks?date=2023-05-04&page=0`;
  const queryFn = () => axiosWithToken.get(queryKey).then((res) => res.data);

  await queryClient.prefetchQuery([queryKey], queryFn);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      date: "2023-05-04",
    },
  };
};