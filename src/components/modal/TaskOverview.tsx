import React from 'react';
import { Avatar, Heading, ModalBody, ModalHeader, Stack, Tag, Text } from '@chakra-ui/react';
import { useModalState } from '@/store/modalStore';
import * as S from '@/styles/modal.styles';
import { actionConstantsType, actionType } from '@/constant/TaskOverview';
import { getKeyByValue, setActionTextToKorean, setTagColor } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { getTaskDetail } from '@/apis/task';

function TaskOverview() {
  const { id } = useModalState();
  const { data } = useQuery(['task', id], () => getTaskDetail(Number(id)));
  if (!data) return null;
  const { title, desc, assignee, endAt, progress, priority } = data.data[0];

  const actionConstants: actionConstantsType = {
    DUE_DATE: {
      key: 'DUE_DATE',
      date: endAt,
      value: 'Due Date',
    },
    ASSIGNEE: {
      key: 'ASSIGNEE',
    },
    SET_STATUS: {
      key: 'SET_STATUS',
      value: progress,
    },
    SET_PRIORITY: {
      key: 'SET_PRIORITY',
      value: priority,
    },
    DELETE_TASK: {
      key: 'DELETE_TASK',
    },
    EDIT_TASK: {
      key: 'EDIT_TASK',
    },
  };

  const handleAction = (string: actionType) => {};

  return (
    <S.ModalContentBox>
      <Stack>
        <ModalHeader textAlign="center">{title}</ModalHeader>
        <ModalBody display="flex" width="100%" minHeight="63vh" p="0" borderTop="1px solid" borderColor="outlineColor">
          <S.ModalTaskContentBox>
            <div className="title">
              <Heading fontSize="1.4rem">Title</Heading>
              <Text fontSize="1rem">Assigned to</Text>
              <div className="avatar">
                {assignee.map((item) => (
                  <Avatar size="xs" key={item.userId} />
                ))}
              </div>
            </div>
            <div className="desc">
              <Heading fontSize="1.4rem">Description</Heading>
              <Text>{desc}</Text>
            </div>
          </S.ModalTaskContentBox>
          <S.ModalTaskActionBox>
            {Object.values(actionConstants).map((item) => (
              <div
                className="action"
                key={item.key}
                onClick={() => handleAction(getKeyByValue(actionConstants, item) as actionType)}
              >
                <Heading fontSize="1rem">{setActionTextToKorean(item.key)}</Heading>
                {item.value && (
                  <Tag size="lg" backgroundColor={setTagColor(item.value)} color="white">
                    {item.value}
                  </Tag>
                )}
              </div>
            ))}
          </S.ModalTaskActionBox>
        </ModalBody>
      </Stack>
    </S.ModalContentBox>
  );
}

export default TaskOverview;
