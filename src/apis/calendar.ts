import { MutationFunction, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from '@/apis/configs';
import { CalendarResponse } from '@/type/componentProps';

// export const useGetCalendarAPI = (
//   year: number,
//   month: number,
//   options?: UseMutationOptions<AxiosResponse<string>, AxiosError, CalendarResponse>,
// ) => {
//   const queryKey = `/calendars?year=${year}&month=${month}`;
//   const queryFn = (data:any) => axiosInstance.get(queryKey, data).then((res) => res.data);
//   return useMutation([queryKey], queryFn, { ...options });
// };

// 수정된 api
// export const getCalendar = async (year:number,month:number, accessToken: string) => {
//   const response = await axiosInstance.get<CalendarResponse>(`/calendars?year=${year}&month=${month}`, {
//     headers: { AAuthorization: `Bearer ${accessToken}` },
//   });
//   console.log(response);
//   return response;
// };


export const getCalendar = async (year:number,month:number) => {
  const response = await axiosInstance.get<CalendarResponse>(`/calendar?year=${year}&month=${month}`, {
    headers: { Authorization: 'Authorization' },
  });
  return response;
};

