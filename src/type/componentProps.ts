import { DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';
import { TaskData } from '@/apis/kanban';
import { actionConstantsType, actionType, StatusType } from '@/constant/TaskOverview';
import TFieldName, { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import { CreateTaskForm } from '@/components/modal/CreateTask';
import { FieldPath, RegisterOptions } from 'react-hook-form';
import React from 'react';

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

export interface ModalActionLayoutProps {
  item:
    | { key: string; date?: Date | undefined; value?: string | undefined }
    | { key: string; value?: string | undefined }
    | { key: string; value?: StatusType | undefined };
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
  setTaskStatusHandler: (e: unknown) => void;
}
