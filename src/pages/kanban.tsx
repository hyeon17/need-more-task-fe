import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Heading, Skeleton, Stack, useToast } from '@chakra-ui/react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import KanbanDroppable from '@/components/kanban/KanbanDroppable';
import { getKanbanBoard, moveTaskToDifferentKanban, TaskData, TaskProgress } from '@/apis/kanban';
import { useMutation, useQuery } from '@tanstack/react-query';
import { StatusType } from '@/constant/TaskOverview';
import { useKanbanBoardState } from '@/store/kanbanBoardStore';
import { useRouter } from 'next/router';
import { useUserInfo } from '@/store/userInfoStore';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import Head from 'next/head';

export type KanbanDataType = {
  [key in TaskProgress as string]: TaskData[];
};

function Kanban() {
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery(['kanban'], getKanbanBoard);
  const { kanban, onAddKanban } = useKanbanBoardState();
  const { getAccessToken } = useAccessTokenStore();
  const accessToken = getAccessToken();
  const toast = useToast();
  const { mutate } = useMutation(moveTaskToDifferentKanban, {
    onSuccess: async () => {
      await refetch();
    },
    onError: (error: any) => {
      if (error.response.data.status === 403) {
        toast({
          title: '수정할 권한이 없습니다.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  useEffect(() => {
    if (!accessToken) {
      toast({
        title: '인증되지 않은 사용자는 접근할 수 없습니다.',
        description: '로그인 페이지로 이동합니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      router.push('/login');
    }
  }, [accessToken]);

  const reorderByStatus = (data: TaskData[]): KanbanDataType => {
    const result: KanbanDataType = {
      TODO: [],
      IN_PROGRESS: [],
      DONE: [],
    };
    if (!data) return result;
    data
      .sort((a, b) => a.taskId - b.taskId)
      .forEach((item) => {
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
    if (result.destination.droppableId === result.source.droppableId) {
      const { source, destination } = result;
      const sourceIndex = source.index;
      const currentKanban = [...kanban[source.droppableId as TaskProgress]];
      const currentTask = currentKanban.splice(sourceIndex, 1);
      currentKanban.splice(destination.index, 0, ...currentTask);
      const newKanban = {
        ...kanban,
        [source.droppableId as TaskProgress]: currentKanban,
      };

      return onAddKanban(newKanban);
    }
    if (result.destination !== result.source) {
      const { source, destination, draggableId } = result;
      const sourceStatus = source.droppableId as TaskProgress;
      const destinationStatus = destination.droppableId as TaskProgress;
      const sourceIndex = source.index;
      const newTask = kanban[sourceStatus][sourceIndex];
      newTask.progress = destinationStatus;

      return mutate(newTask);
    }
  };

  return (
    <>
      <Head>
        <title>Need More Task · 칸반 보드</title>
      </Head>
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
    </>
  );
}

export default Kanban;
