import React, { useState } from 'react';
import * as S from '@/styles/kanban.styles';
import { Avatar, CardFooter, Flex, Stack } from '@chakra-ui/react';
import { KanbanDraggableItemProps } from '@/type/componentProps';
import { useModalState } from '@/store/modalStore';
import { motion } from 'framer-motion';

function KanbanDraggable({ task, provided }: KanbanDraggableItemProps) {
  const { onOpenModal, onSetModalId } = useModalState();

  const handleModal = () => {
    onSetModalId(String(task));
    onOpenModal();
  };

  return (
    <S.KanbanTaskItem
      key={task}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      onClick={handleModal}
      as={motion.div}
      layoutId={String(task)}
    >
      <Stack spacing="2">
        <S.KanbanTaskItemCardBody p="0" justifyContent="space-between">
          <Flex justifyContent="center" alignItems="center" gap="3">
            <S.KanbanTaskItemDot color="red.500" />
            Card {task}
          </Flex>
          <Avatar width="26px" height="26px" />
        </S.KanbanTaskItemCardBody>
        <S.KanbanTaskItemCardBody p="0" fontWeight="bold"></S.KanbanTaskItemCardBody>
        <CardFooter p="0">
          <S.KanbanTaskDueDate isDue={false}>2023/05/01</S.KanbanTaskDueDate>
        </CardFooter>
      </Stack>
    </S.KanbanTaskItem>
  );
}

export default KanbanDraggable;
