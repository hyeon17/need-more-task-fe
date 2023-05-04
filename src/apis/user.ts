import { IJoin, ILogin } from '@/type/authTypes';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { axiosInstance } from '@/apis/configs';

export const joinAPI = (options?: UseMutationOptions<AxiosResponse<string>, AxiosError, IJoin>) => {
  const router = useRouter();
  const queryKey = `/join`;
  const queryFn = (data: IJoin) => axiosInstance.post(queryKey, data).then((res) => res.data);

  // const onSuccess = () => router.push('/join/complete');

  return useMutation([queryKey], queryFn, { ...options });
};

export const isDuplicatedEmailAPI = (options?: UseMutationOptions<AxiosResponse<string>, AxiosError, IJoin>) => {
  const queryKey = `/validate/email`;
  const queryFn = (data: IJoin) => axiosInstance.post(queryKey, data).then((res) => res.data);

  // const onSuccess = () => router.push('/join/complete');
  // const onSuccess = (data: any) => {
  //   console.log('response>>>', data);
  // };
  return useMutation([queryKey], queryFn, { ...options });
};

export const loginAPI = (options?: UseMutationOptions<AxiosResponse<string>, AxiosError, ILogin>) => {
  const queryKey = `/login`;
  const queryFn = (data: ILogin) => axiosInstance.post(queryKey, data).then((res) => res.data);

  // const onSuccess = () => router.push('/join/complete');
  // const onSuccess = (data: any) => {
  //   console.log('response>>>', data);
  // };
  return useMutation([queryKey], queryFn, { ...options });
};
