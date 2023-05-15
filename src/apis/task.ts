import { axiosWithToken } from '@/apis/configs';

export interface TaskDetailResponse {
  status: number;
  msg: string;
  data: Data;
}

export interface Data {
  taskOwner: TaskOwner;
  createdAt: Date;
  updatedAt: Date;
  startAt: Date;
  endAt: Date;
  title: string;
  desc: string;
  assignee: Assignee[];
  priority: string;
  progress: string;
}

export interface Assignee {
  fullName: string;
  userId: number;
  profileImageUrl: string;
}

export interface TaskOwner {
  userId: number;
  fullName: string;
  profileImageUrl: string;
}

export type TaskPostResponse = {
  status: number;
  msg: string;
};

export type TaskPostData = {
  startAt: Date;
  endAt: Date;
  title: string;
  desc: string;
  assignee: any[];
  priority: string;
  progress: string;
};

export interface GetUsersResponse {
  status: number;
  msg: string;
  data: Data;
}

export interface Data {
  users: User[];
}

export interface User {
  userId: number;
  fullName: string;
  profileImageUrl: string;
}

export const getTaskDetail = async (taskID: number) => {
  const res = await axiosWithToken.get<TaskDetailResponse>(`/task/${taskID}`);
  return res.data;
};

export const postTaskDetail = async (data: TaskPostData) => {
  const res = await axiosWithToken.post<TaskPostResponse>(`/task`, data);
  return res.data;
};

export const putTaskDetail = async ({ taskId, data }: { taskId: number; data: TaskPostData }) => {
  const res = await axiosWithToken.put<TaskPostResponse>(`/task/${taskId}`, data);
  return res.data;
};

export const getUsers = async () => {
  const res = await axiosWithToken.get<GetUsersResponse>(`/users`);
  return res.data.data.users;
};

export const deleteTask = async (taskID: number) => {
  const res = await axiosWithToken.delete<TaskPostResponse>(`/task/${taskID}`);
  return res.data;
};
