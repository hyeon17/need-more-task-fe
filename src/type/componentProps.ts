import { DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';
import { TaskType } from '@/pages/kanban';

export interface KanbanDroppableItemProps {
  status: string;
  provided: DroppableProvided;
  data: TaskType[];
}

export interface KanbanDraggableItemProps {
  task: TaskType;
  provided: DraggableProvided;
}
