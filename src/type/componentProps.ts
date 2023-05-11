import { DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';
import { TaskData } from '@/apis/kanban';
import { actionType, StatusType } from '@/constant/TaskOverview';

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

export interface ModalActionComponentProps {
  action: actionType;
  setTaskStatusHandler: (e: unknown) => void;
}

export interface OverViewProps {
  date?: any;
  content: any;
  isLoading: boolean;
}

export interface TaskOverviewProps {
  taskId: number;
  title: string;
  progress: string;
  id: number;
  assignee: Assignee[];
}
export interface Assignee {
  userId: number;
  profileImageUrl: string;
}