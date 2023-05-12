import { useQuery, UseQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithToken } from '@/apis/configs';

export const useGetDailyTasksAPI = (
  date: any,
  page:number,
  options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, string[]>,
) => {
  const queryKey = `/tasks?date=${date}&page=${page}`;
  const queryFn = () =>
    axiosWithToken.get(queryKey).then((res) => {
      return res.data;
    });

  return useQuery([queryKey], queryFn, {
    ...options,
  });
};

// export const useGetDailyTasksAPI = (
//   date: any,
//   page: number,
//   options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, string[]>,
// ) => {
//   const queryKey = [`/tasks?date=${date}`, { page }];
//   const queryFn = ({ pageParam = 0 }) =>
//     axiosWithToken.get(`/tasks?date=${date}&page=${pageParam}`).then((res) => {
//       return res.data;
//     });

//   return useInfiniteQuery(queryKey, queryFn, {
//     getNextPageParam: (lastPage) => {
//       if (lastPage.page < lastPage.totalPage) {
//         return lastPage.page + 1;
//       }
//     },
//     ...options,
//   });
// };


export const useGetPeriodTasksAPI = (
  startAt: any,
  endAt: any,
  page?: number,
  options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, string[]>,
) => {
  const queryKey = `/tasks/period?startat=${startAt}&endat=${endAt}&page=${page}`;
  const queryFn = () =>
    axiosWithToken.get(queryKey).then((res) => {
      return res.data;
    });

  return useQuery([queryKey], queryFn, {
    ...options,
  });
};