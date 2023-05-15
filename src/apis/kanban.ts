import { axiosWithToken } from '@/apis/configs';
import { PriorityType } from '@/constant/TaskOverview';

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
  progress: TaskProgress;
}

export interface Assignee {
  userId: number;
  profileImageURL: string;
}

export interface TaskOwner {
  userId: number;
  fullName: string;
  profileImageUrl: string;
}

export type MoveTaskToDifferentKanban = {
  status: number;
  msg: string;
  data: '';
};

export const getKanbanBoard = async () => {
  const res = await axiosWithToken.get<KanbanBoardDataInterface>(`/kanbans`);
  return res.data;
};

export const moveTaskToDifferentKanban = async (data: TaskData) => {
  const res = await axiosWithToken.put<MoveTaskToDifferentKanban>(`/task/${data.taskId}`, { ...data });
  return res.data;
};
