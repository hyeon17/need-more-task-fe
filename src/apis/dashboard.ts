import { IJoin, ILogin, IUpdateProfile, IValidatePassword } from '@/type/authTypes';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { axiosInstance, axiosWithToken } from '@/apis/configs';

// export const updateUserInfoAPI = (
//   userId: string,
//   options?: UseMutationOptions<AxiosResponse<string>, AxiosError, IUpdateProfile>,
// ) => {
//   const queryKey = `/user/${userId}`;
//   const queryFn = (data: IUpdateProfile) => axiosWithToken.put(queryKey, data).then((res) => res.data);

//   return useMutation([queryKey], queryFn, { ...options });
// };

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
