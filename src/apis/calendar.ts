
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithToken } from '@/apis/configs';

export const useGetCalendarAPI = (
  year: number,
  month: number,
  options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, string[]>,
) => {
  const queryKey = `/calendars?year=${year}&month=${month}`;
  const queryFn = () => axiosWithToken.get(queryKey).then((res) => {
    return res.data;
  });
  
  return useQuery([queryKey], queryFn, {
    ...options,
  });
};