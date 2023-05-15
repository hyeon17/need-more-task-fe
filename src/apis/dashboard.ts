import { IJoin, ILogin, IUpdateProfile, IValidatePassword } from '@/type/authTypes';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { axiosInstance, axiosWithToken } from '@/apis/configs';

export const getTaskProgressAPI = (options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, string[]>) => {
  const queryKey = `/progress`;
  const queryFn = () => axiosWithToken.get(queryKey).then((res) => res.data);

  return useQuery([queryKey], queryFn, { ...options });
};

export const getPerformanceAPI = (options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, string[]>) => {
  const queryKey = `/performance`;
  const queryFn = () => axiosWithToken.get(queryKey).then((res) => res.data);

  return useQuery([queryKey], queryFn, { ...options });
};

export const getLatestProjectsAPI = (options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, string[]>) => {
  const queryKey = `/tasks/latest`;
  const queryFn = () => axiosWithToken.get(queryKey).then((res) => res.data);

  return useQuery([queryKey], queryFn, { ...options });
};
