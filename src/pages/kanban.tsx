import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Heading, Skeleton, Stack } from '@chakra-ui/react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import KanbanDroppable from '@/components/kanban/KanbanDroppable';
import { getKanbanBoard, moveTaskToDifferentKanban, TaskData, TaskProgress } from '@/apis/kanban';
import { useMutation, useQuery } from '@tanstack/react-query';
import { StatusType } from '@/constant/TaskOverview';
import { useKanbanBoardState } from '@/store/KanbanBoardStore';

export type KanbanDataType = {
  [key in TaskProgress as string]: TaskData[];
};

function Kanban() {
  const { data, isLoading, refetch } = useQuery(['kanban'], getKanbanBoard);
  const { mutate } = useMutation(moveTaskToDifferentKanban, {
    onSuccess: async () => {
      await refetch();
    },
  });
  const { kanban, onAddKanban } = useKanbanBoardState();

  const reorderByStatus = (data: TaskData[]): KanbanDataType => {
    const result: KanbanDataType = {
      TODO: [],
      IN_PROGRESS: [],
      DONE: [],
    };
    if (!data) return result;
    data.forEach((item) => {
      switch (item.progress) {
        case StatusType.TODO:
          return result.TODO.push(item);
        case StatusType.IN_PROGRESS:
          return result.IN_PROGRESS.push(item);
        case StatusType.DONE:
          return result.DONE.push(item);
        default:
          break;
      }
    });
    return result;
  };

  useEffect(() => {
    if (!data) return;
    onAddKanban(reorderByStatus(data.data));
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination === result.source) return;
    const { source, destination, draggableId } = result;
    const sourceStatus = source.droppableId as TaskProgress;
    const destinationStatus = destination.droppableId as TaskProgress;
    const sourceIndex = source.index;
    const newTask = kanban[sourceStatus][sourceIndex];
    newTask.progress = destinationStatus;

    mutate(newTask);
  };
  return (
    <Layout hasHeader>
      <Heading size="xl" mb="4" padding="0 2rem">
        Kanban Board
      </Heading>
      <Stack direction="row" alignItems="start" spacing="6" maxHeight="80vh" minWidth="1200px">
        {data && (
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(kanban).map((progress) => (
              <Droppable droppableId={progress} key={progress}>
                {(provided) => <KanbanDroppable status={progress} provided={provided} data={kanban[progress]} />}
              </Droppable>
            ))}
          </DragDropContext>
        )}
        {isLoading && [1, 2, 3].map((item) => <Skeleton key={item} height="400px" width="100%" />)}
      </Stack>
    </Layout>
  );
}

export default Kanban;
