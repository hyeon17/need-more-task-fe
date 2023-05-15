import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { axiosWithToken } from '@/apis/configs';
import { useCalendarState } from '@/store/calendarStore';
import { useOverViewState } from '@/store/overViewStore';
import { useSideBarState } from '@/store/sideBarStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function useDailyTasks() {
  const router = useRouter();
  const routerQuery = router.query;
  console.log(routerQuery);
  const { getDateStore } = useCalendarState();
  const { currentPage, setTotalPage, getTotalPage } = useOverViewState();
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, isSuccess, error } = useInfiniteQuery(
    ['dailyTasks', getDateStore()],
    ({ pageParam = 0 }) =>
      axiosWithToken.get(`/tasks?date=${getDateStore()}&page=${pageParam}`).then((response) => response.data),
    {
      getNextPageParam: (lastPage) => {
        const totalPages = Math.ceil(lastPage?.data?.totalCount / 10);
        return currentPage + 1 === totalPages ? undefined : currentPage + 1;
      },
      cacheTime: 0,
    },
  );

  useEffect(() => {
    if (!getTotalPage() && data && data.pages[0]?.data?.totalCount > 0) {
      setTotalPage(Math.ceil(data.pages[0]?.data?.totalCount / 10));
    }
  }, [data, setTotalPage]);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  };
}

export function useGetPeriodTasks() {
  const { getStartAtStore, getEndAtStore } = useSideBarState();
  const { currentPage, setTotalPage, getTotalPage } = useOverViewState();
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, isSuccess, error } = useInfiniteQuery(
    ['periodTasks', getStartAtStore(), getEndAtStore()],
    ({ pageParam = 0 }) =>
      axiosWithToken
        .get(`/tasks/period?startat=${getStartAtStore()}&endat=${getEndAtStore()}&page=${pageParam}`)
        .then((response) => response.data),
    {
      getNextPageParam: (lastPage) => {
        const totalPages = Math.ceil(lastPage?.data?.totalCount / 10);
        return currentPage + 1 === totalPages ? undefined : currentPage + 1;
      },
      cacheTime: 0,
    },
  );

  useEffect(() => {
    if (!getTotalPage() && data && data.pages[0]?.data?.totalCount > 0) {
      setTotalPage(Math.ceil(data.pages[0]?.data?.totalCount / 10));
    }
  }, [data, setTotalPage]);

  return { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, isSuccess, error };
}
