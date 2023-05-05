import { KanbanBoardDataInterface } from '@/apis/kanban';
import { axiosInstance } from '@/apis/configs';

export type TaskDetailData = KanbanBoardDataInterface;

export const getTaskDetail = async (taskID: number) => {
  const res = await axiosInstance.get<TaskDetailData>(`/task/${taskID}`);
  return res.data;
};
