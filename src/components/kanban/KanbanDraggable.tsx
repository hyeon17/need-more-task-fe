import React from 'react';
import * as S from '@/styles/kanban.styles';
import { Avatar, CardFooter, Flex, Stack } from '@chakra-ui/react';
import { KanbanDraggableItemProps } from '@/type/componentProps';

function KanbanDraggable({ task, provided }: KanbanDraggableItemProps) {
  return (
    <S.KanbanTaskItem key={task} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
      <Stack spacing="2">
        <S.KanbanTaskItemCardBody p="0" justifyContent="space-between">
          <Flex justifyContent="center" alignItems="center" gap="3">
            <S.KanbanTaskItemDot color="red.500" />
            Card {task}
          </Flex>
          <Avatar width="26px" height="26px" />
        </S.KanbanTaskItemCardBody>
        <S.KanbanTaskItemCardBody p="0" fontWeight="bold">
          Task name {task}
        </S.KanbanTaskItemCardBody>
        <CardFooter p="0">
          <S.KanbanTaskDueDate isDue={false}>2023/05/01</S.KanbanTaskDueDate>
        </CardFooter>
      </Stack>
    </S.KanbanTaskItem>
  );
}

export default KanbanDraggable;
