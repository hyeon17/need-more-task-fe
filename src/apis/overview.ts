import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { axiosInstance, axiosWithToken } from '@/apis/configs';

export const useGetDailyTasksAPI = (
  date: any,
  options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, string[]>,
) => {
  const queryKey = `/tasks?date=${date}`;
  const queryFn = () =>
    axiosWithToken.get(queryKey).then((res) => {
      return res.data;
    });

  return useQuery([queryKey], queryFn, {
    ...options,
  });
};
