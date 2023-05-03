import { DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';

export interface KanbanDroppableItemProps {
  status: string;
  provided: DroppableProvided;
}

export interface KanbanDraggableItemProps {
  task: number;
  provided: DraggableProvided;
}
