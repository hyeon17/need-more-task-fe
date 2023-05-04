import { DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';
import { TaskData } from '@/apis/kanban';

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
