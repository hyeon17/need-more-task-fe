import React from 'react';
import { Button, Card, CardBody, CardFooter, Stack, Text } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import KanbanDraggable from '@/components/kanban/KanbanDraggable';
import { KanbanDroppableItemProps } from '@/type/componentProps';
import { useModalState } from '@/store/modalStore';
import { setStatusToKorean } from '@/utils';
import * as S from '@/styles/kanban.styles';

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
          {setStatusToKorean(status)}
        </Text>
        <Stack spacing="4" maxHeight="65vh" overflowY="auto">
          {data.length === 0 && (
            <S.KanbanTaskItem>
              <Text align="center">지금은 {setStatusToKorean(status)}이 없습니다.</Text>
            </S.KanbanTaskItem>
          )}
          {data &&
            data.map((item, index) => (
              <Draggable draggableId={index + status} index={index} key={index}>
                {(provided) => <KanbanDraggable task={item} index={index} provided={provided} />}
              </Draggable>
            ))}
          {provided.placeholder}
        </Stack>
      </CardBody>
      <CardFooter p="0">
        <Button width="100%" borderTopRadius="0" onClick={handelCreateModal}>
          작업 추가하기
        </Button>
      </CardFooter>
    </Card>
  );
}

export default KanbanDroppable;
