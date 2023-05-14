import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosWithToken } from '@/apis/configs';
import { useCalendarState } from '@/store/calendarStore';
import { useOverViewState } from '@/store/overViewStore';
import { useSideBarState } from '@/store/sideBarStore';

// todo: 마지막 페이지라면 api요청을 막아야 해서 한번은 막지만 그 이후 다시 여러번 누르면 다시 api요청이 가서 해결 해야 함
export function useDailyTasks() {
  const { getDateStore } = useCalendarState();
  const { currentPage } = useOverViewState();
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, isSuccess, error } = useInfiniteQuery(
    ['dailyTasks', getDateStore()],
    ({ pageParam = 0 }) =>
      axiosWithToken.get(`/tasks?date=${getDateStore()}&page=${pageParam}`).then((response) => response.data),
    {
      getNextPageParam: (lastPage) => {
        const lastTaskIndex = lastPage?.data?.tasks?.length;
        const totalPages = Math.ceil(lastPage?.data?.totalCount / 10);
        return lastTaskIndex >= lastPage.data.totalCount || currentPage + 1 === totalPages
          ? undefined
          : currentPage + 1;
      },
    },
  );

  return { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, isSuccess, error };
}

export function useGetPeriodTasks() {
  const { getStartAtStore, getEndAtStore } = useSideBarState();
  const { currentPage } = useOverViewState();
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, isSuccess, error } = useInfiniteQuery(
    ['periodTasks', getStartAtStore(), getEndAtStore()],
    ({ pageParam = 0 }) =>
      axiosWithToken
        .get(`/tasks/period?startat=${getStartAtStore()}&endat=${getEndAtStore()}&page=${pageParam}`)
        .then((response) => response.data),
    {
      getNextPageParam: (lastPage) => {
        const lastTaskIndex = lastPage?.data?.tasks?.length;
        const totalPages = Math.ceil(lastPage?.data?.totalCount / 10);
        return lastTaskIndex >= lastPage.data.totalCount || currentPage + 1 === totalPages
          ? undefined
          : currentPage + 1;
      },
    },
  );

  return { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, isSuccess, error };
}
