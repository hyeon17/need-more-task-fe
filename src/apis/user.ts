import { IJoin, ILogin } from '@/type/authTypes';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { axiosInstance } from '@/apis/configs';
import { useToast } from '@chakra-ui/react';

export const joinAPI = (options?: UseMutationOptions<AxiosResponse<string>, AxiosError, IJoin>) => {
  const router = useRouter();
  const queryKey = `/join`;
  const queryFn = (data: IJoin) => axiosInstance.post(queryKey, data).then((res) => res.data);

  // const onSuccess = () => router.push('/join/complete');

  return useMutation([queryKey], queryFn, { ...options });
};

export const isDuplicatedEmailAPI = (options?: UseMutationOptions<AxiosResponse<string>, AxiosError, IJoin>) => {
  const queryKey = `/email/validate`;
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

export const authMeAPI = (
  accessToken: string,
  options?: UseQueryOptions<AxiosResponse<any[]>, AxiosError, any, string[]>,
) => {
  const queryKey = `/auth/me`;
  const queryFn = () =>
    axiosInstance
      .get(queryKey, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

  const toast = useToast();

  const onError = () => {
    toast({
      title: '유저정보 가져오기 실패.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };
  // const onSuccess = (data: any) => useSetUserInfo()(data);
  // onSuccess,
  return useQuery([queryKey], queryFn, {
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 30, // 30분
    onError,
    ...options,
  });
};

export const getUserInfoAPI = (
  accessToken?: string,
  id?: string,
  options?: UseQueryOptions<AxiosResponse<any[]>, AxiosError, any, string[]>,
) => {
  const queryKey = `/user/${id}`;
  const queryFn = () =>
    axiosInstance
      .get(queryKey, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);

  // const onSuccess = (data: any) => {
  //   if (data.error) {
  //     return message.error(`${data.error} 다른 유저를 찾아보세요`);
  //   }
  // };

  return useQuery([queryKey], queryFn, {
    staleTime: 600000,
    ...options,
  });
};
