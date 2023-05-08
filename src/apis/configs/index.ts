import axios, { AxiosInstance } from 'axios';

export const baseURL = `${process.env.NEXT_PUBLIC_MOCK_SERVER_BASE_URL}`;

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
  const accessToken = JSON.parse(localStorage.getItem('needMoreTaskToken') || 'null');

  if (accessToken === null) {
    return config;
  }

  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
});
