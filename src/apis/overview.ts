import { MutationFunction, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from '@/apis/configs';

export const getDailyTasks = async (date:any) => {
  const response = await axiosInstance.get(`/tasks?date=${date}`);
  return response;
};
