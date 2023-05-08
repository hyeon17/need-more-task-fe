import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Heading, Skeleton, Stack } from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import KanbanDroppable from '@/components/kanban/KanbanDroppable';
import { getKanbanBoard, TaskData, TaskProgress } from '@/apis/kanban';
import { useQuery } from '@tanstack/react-query';

type KanbanDataType = {
  [key in TaskProgress as string]: TaskData[];
};

const initialEmptyData: KanbanDataType = {
  DONE: [],
  IN_PROGRESS: [],
  TODO: [],
};

function Kanban() {
  const { data, isLoading } = useQuery(['kanban'], getKanbanBoard);
  const [kanbanBoardData, setKanbanBoardData] = useState<KanbanDataType>(initialEmptyData);

  const reorderByStatus = (data: TaskData[]): KanbanDataType => {
    const result: KanbanDataType = {
      DONE: [],
      IN_PROGRESS: [],
      TODO: [],
    };
    if (!data) return result;
    data.forEach((item) => {
      switch (item.progress) {
        case 'TODO':
          return result.TODO.push(item);
        case 'IN_PROGRESS':
          return result.IN_PROGRESS.push(item);
        case 'DONE':
          return result.DONE.push(item);
        default:
          break;
      }
    });
    return result;
  };

  useEffect(() => {
    if (!data) return;
    setKanbanBoardData(reorderByStatus(data.data));
  }, [data]);

  const onDragEnd = () => {};
  return (
    <Layout hasHeader>
      <Heading size="xl" mb="4" padding="0 2rem">
        Kanban Board
      </Heading>
      <Stack direction="row" alignItems="start" spacing="6" minHeight="80vh" minWidth="1200px">
        {data && (
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(kanbanBoardData).map((progress) => (
              <Droppable droppableId={progress} key={progress}>
                {(provided) => (
                  <KanbanDroppable status={progress} provided={provided} data={kanbanBoardData[progress]} />
                )}
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
