import { useQuery, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithToken } from '@/apis/configs';

// export const useGetDailyTasksAPI = (
//   date: any,
//   page: number,
//   options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, string[]>,
// ) => {
//   const queryKey = `/tasks?date=${date}&page=${page}`;
//   const queryFn = () =>
//     axiosWithToken.get(queryKey).then((res) => {
//       return res.data;
//     });

//   return useQuery([queryKey], queryFn, {
//     ...options,
//   });
// };

export const useGetDailyTasksAPI = async (date: any,page: number) => {
  const response = await axiosWithToken.get(`/tasks?date=${date}&page=${page}`);
  return response.data;
};

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

// export const useGetDailyTasksAPI = (
//   date: any,
//   page: number,
//   options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, string[]>,
// ) => {
//   const queryKey = `/tasks?date=${date}&page=${page}`;
//   const queryFn = () =>
//     axiosWithToken.get(queryKey).then((res) => {
//       return res.data;
//     });

//   return useInfiniteQuery([queryKey], queryFn, {
//     getNextPageParam: (lastPage) => {
//       const { next } = lastPage;
//       if (!next) return false;

//       const offset = new URL(next).searchParams.get('page');
//       return Number(offset);
//     },
//     ...options,
//   });
// };
