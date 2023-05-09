import { DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';
import { TaskData } from '@/apis/kanban';
import { actionType } from '@/constant/TaskOverview';

export interface KanbanDroppableItemProps {
  status: string;
  provided: DroppableProvided;
  data: TaskData[];
}

export interface KanbanDraggableItemProps {
  task: TaskData;
  provided: DraggableProvided;
  index: number;
}

// export interface getDataInterface {
//   status: number;
//   msg: string;
//   data: TaskData[];
// }

// export enum StatusType {
//   TODO = 'TODO',
//   IN_PROGRESS = 'IN_PROGRESS',
//   DONE = 'DONE',
// }

// export enum PriorityType {
//   URGENT = 'urgent',
//   HIGH = 'high',
//   MEDIUM = 'medium',
//   LOW = 'low',
// }

// export type TaskProgress = 'TODO' | 'IN_PROGRESS' | 'DONE';

// export interface TaskData {
//   taskId: number;
//   taskOwner: TaskOwner;
//   createdAt: string;
//   updatedAt: string;
//   startAt: Date;
//   endAt: Date;
//   title: string;
//   desc: string;
//   assignee: Assignee[];
//   priority: PriorityType;
//   progress: StatusType;
// }

// export interface Assignee {
//   userId: number;
//   profileImageURL: string;
// }

export interface ModalActionComponentProps {
  action: actionType;
}
