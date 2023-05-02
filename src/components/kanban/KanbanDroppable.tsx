import React from 'react';
import { Button, Card, CardBody, CardFooter, Stack, Text } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import KanbanDraggable from '@/components/kanban/KanbanDraggable';
import { KanbanDroppableItemProps } from '@/type/componentProps';

function KanbanDroppable({ provided, status }: KanbanDroppableItemProps) {
  return (
    <Card key={status}>
      <CardBody ref={provided.innerRef} {...provided.droppableProps}>
        <Text fontWeight="bold" mb="4" align="center">
          {status}
        </Text>
        <Stack spacing="4">
          {[1, 2, 3].map((item) => (
            <Draggable draggableId={`task` + item + status} index={item} key={item}>
              {(provided) => <KanbanDraggable task={item} provided={provided} />}
            </Draggable>
          ))}
          {provided.placeholder}
        </Stack>
      </CardBody>
      <CardFooter p="0">
        <Button width="100%" borderTopRadius="0">
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
}

export default KanbanDroppable;
