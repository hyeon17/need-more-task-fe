import axios, { AxiosInstance } from 'axios';

export const baseURL = `${process.env.NEXT_PUBLIC_MOCK_SERVER_BASE_URL}`;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false,
});
