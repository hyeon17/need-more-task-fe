import { DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';

export interface KanbanDroppableItemProps {
  status: string;
  provided: DroppableProvided;
}

export interface KanbanDraggableItemProps {
  task: number;
  provided: DraggableProvided;
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
