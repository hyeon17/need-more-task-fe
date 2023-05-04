import React from 'react';
import Layout from '@/components/Layout';
import { Heading, Stack } from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import KanbanDroppable from '@/components/kanban/KanbanDroppable';

function Kanban() {
  const onDragEnd = () => {};
  return (
    <Layout>
      <Heading size="xl">Kanban Board</Heading>
      <Stack direction="row" alignItems="start" spacing="6" minHeight="80vh">
        <DragDropContext onDragEnd={onDragEnd}>
          {['todo', 'in-progress', 'done'].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => <KanbanDroppable status={status} provided={provided} />}
            </Droppable>
          ))}
        </DragDropContext>
      </Stack>
    </Layout>
  );
}

export default Kanban;
