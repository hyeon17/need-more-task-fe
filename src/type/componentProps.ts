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

export interface CalendarResponse {
  data: {
    taskId: number;
    taskOwner: {
      userId: number;
      fullName: string;
      profileImageUrl: string;
    };
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    endAt: Date;
    title: string;
    desc: string;
    assignee: {
      userId: number;
      profileImageUrl: string;
    };
  }[];
  priority: string;
  progress: string;
}

export interface ModalActionComponentProps {
  action: actionType;
}
