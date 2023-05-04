import React from 'react';
import { Button, Card, CardBody, CardFooter, Stack, Text } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import KanbanDraggable from '@/components/kanban/KanbanDraggable';
import { KanbanDroppableItemProps } from '@/type/componentProps';
import { motion } from 'framer-motion';
import { useModalState } from '@/store/modalStore';

function KanbanDroppable({ provided, status, data }: KanbanDroppableItemProps) {
  const { onOpenCreate, onSetModalId } = useModalState();

  const handelCreateModal = () => {
    onSetModalId(status);
    onOpenCreate();
  };

  return (
    <Card key={status}>
      <CardBody ref={provided.innerRef} {...provided.droppableProps}>
        <Text fontWeight="bold" mb="4" align="center">
          {status}
        </Text>
        <Stack spacing="4">
          {data.map((item) => (
            <Draggable draggableId={item.id} index={Number(item.id)} key={item.title}>
              {(provided) => <KanbanDraggable task={item} provided={provided} />}
            </Draggable>
          ))}
          {provided.placeholder}
        </Stack>
      </CardBody>
      <CardFooter p="0">
        <Button width="100%" borderTopRadius="0" onClick={handelCreateModal}>
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
}

export default KanbanDroppable;
