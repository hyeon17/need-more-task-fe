import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithToken } from '@/apis/configs';

export const useGetDailyTasksAPI = (
  date: any,
  page?:number,
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