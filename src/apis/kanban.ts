import { axiosInstance } from '@/apis/configs';

export interface PostInterface {
  status: number;
  msg: string;
  data: TaskData[];
}

export type TaskProgress = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface TaskData {
  taskID: number;
  taskOwner: TaskOwner;
  createdAt: string;
  updatedAt: string;
  startAt: Date;
  endAt: Date;
  title: string;
  desc: string;
  assignee: Assignee[];
  priority: string;
  progress: TaskProgress;
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

export const getKanbanBoard = async () => {
  const res = await axiosInstance.get<PostInterface>(`/kanban`);
  return res.data;
};
