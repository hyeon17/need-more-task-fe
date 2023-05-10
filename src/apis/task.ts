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
  userID: number;
  profileImageURL: string;
}

export interface TaskOwner {
  userID: number;
  fullName: string;
  profileImageURL: string;
}

export type TaskPostResponse = {
  status: number;
  msg: string;
};

export type TaskPostData = {
  startAt: string;
  endAt: string;
  title: string;
  desc: string;
  assignee: any[];
  priority: string;
  progress: string;
};

export const getTaskDetail = async (taskID: number) => {
  const res = await axiosWithToken.get<TaskDetailResponse>(`/task/${taskID}`);
  return res.data;
};

export const postTaskDetail = async (data: TaskPostData) => {
  const res = await axiosWithToken.post<TaskPostResponse>(`/task`, data);
  return res.data;
};
