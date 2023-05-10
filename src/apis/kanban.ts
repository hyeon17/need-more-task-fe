import { axiosWithToken } from '@/apis/configs';
import { PriorityType, StatusType } from '@/constant/TaskOverview';

export interface KanbanBoardDataInterface {
  status: number;
  msg: string;
  data: TaskData[];
}

export type TaskProgress = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface TaskData {
  taskId: number;
  taskOwner: TaskOwner;
  createdAt: string;
  updatedAt: string;
  startAt: Date;
  endAt: Date;
  title: string;
  desc: string;
  assignee: Assignee[];
  priority: PriorityType;
  progress: StatusType;
}

export interface Assignee {
  userId: number;
  profileImageURL: string;
}

export interface TaskOwner {
  userId: number;
  fullName: string;
  profileImageURL: string;
}

export const getKanbanBoard = async () => {
  const res = await axiosWithToken.get<KanbanBoardDataInterface>(`/kanbans`);
  return res.data;
};
