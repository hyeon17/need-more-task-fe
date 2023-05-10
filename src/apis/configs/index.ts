import axios, { AxiosInstance } from 'axios';

export const baseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api`;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
});

export const axiosWithToken: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
});

// axiosWithToken.interceptors.request.use((config: any) => {
//   const accessToken = JSON.parse(localStorage.getItem('needMoreTaskToken')) || '';

//   return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
// });

axiosWithToken.interceptors.request.use((config: any) => {
  // const accessToken = JSON.parse(localStorage.getItem('needMoreTaskToken') || 'null');
  //
  // if (accessToken === null) {
  //   return config;
  // }

  return {
    ...config,
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3RzdHVkeSIsInJvbGUiOiJVU0VSIiwiaWQiOjIsImV4cCI6MTY4MzY5NDk2OH0.pplsZC9hoCZ4NYskoiPfRWBQFqlz8ZZTATxEB1I_GRCNy2TFQg4IuQhmOw3J9YCDtwcJuUO6Cle9DCFRHxIoYA`,
    },
  };
});
