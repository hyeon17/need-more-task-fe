import React from 'react';
import * as S from '@/styles/kanban.styles';
import { Avatar, CardFooter, Flex, Stack } from '@chakra-ui/react';
import { KanbanDraggableItemProps } from '@/type/componentProps';
import { useModalState } from '@/store/modalStore';
import { motion } from 'framer-motion';

function KanbanDraggable({ task, provided, index }: KanbanDraggableItemProps) {
  const { onOpenOverView, onSetModalId } = useModalState();

  const handleModal = () => {
    onSetModalId(String(task.taskId));
    onOpenOverView();
  };
  return (
    <S.KanbanTaskItem
      key={index}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      onClick={handleModal}
      as={motion.div}
    >
      <Stack spacing="2">
        <S.KanbanTaskItemCardBody p="0" justifyContent="space-between">
          <Flex justifyContent="center" alignItems="center" gap="3">
            <S.KanbanTaskItemDot color="red.500" />
            {task.title}
          </Flex>
          <Avatar width="26px" height="26px" src={task.taskOwner.profileImageURL} />
        </S.KanbanTaskItemCardBody>
        <S.KanbanTaskItemCardBody p="0" fontWeight="bold"></S.KanbanTaskItemCardBody>
        <CardFooter p="0">
          <S.KanbanTaskDueDate isDue={false}>{String(task.endAt)}</S.KanbanTaskDueDate>
        </CardFooter>
      </Stack>
    </S.KanbanTaskItem>
  );
}

export default React.memo(KanbanDraggable);
