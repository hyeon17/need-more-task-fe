import React from 'react';
import { ModalActionEditProps } from '@/type/componentProps';
import { Input } from '@chakra-ui/react';
import { ModalTaskActionSelectBox, ModalTaskDeleteButton } from '@/styles/modal.styles';
import { useMutation } from '@tanstack/react-query';
import { deleteTask, putTaskDetail, TaskPostData } from '@/apis/task';

const setStatusConstants = [
  {
    key: 'progress',
    label: '해야할 일',
    value: 'TODO',
  },
  {
    key: 'progress',
    label: '진행중',
    value: 'IN_PROGRESS',
  },
  {
    key: 'progress',
    label: '완료',
    value: 'DONE',
  },
];

const setPriorityConstants = [
  {
    key: 'priority',
    label: '낮음',
    value: 'LOW',
  },
  {
    key: 'priority',
    label: '중간',
    value: 'MEDIUM',
  },
  {
    key: 'priority',
    label: '높음',
    value: 'HIGH',
  },
  {
    key: 'priority',
    label: '긴급',
    value: 'URGENT',
  },
];

function ModalEditComponent({ action, id, taskData, refetch }: ModalActionEditProps) {
  const { mutate } = useMutation(deleteTask, {
    onSuccess: () => {
      window.location.reload();
    },
  });
  const { mutate: updateTask } = useMutation(putTaskDetail, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleStatusChange = (e: unknown) => {
    // @ts-ignore
    if (e.target) {
      // @ts-ignore
      const { value } = e.target;
      // @ts-ignore
      const key = e.target.id;
      const taskId = id;
      const data: TaskPostData = { ...taskData };
      // @ts-ignore
      data[key] = value;
      return updateTask({ taskId, data });
    } else {
      const { value, key } = e as { value: string; key: string };
      const taskId = id;
      const data: TaskPostData = { ...taskData };
      // @ts-ignore
      data[key] = value;
      return updateTask({ taskId, data });
    }
  };

  switch (action) {
    case 'END_AT':
      return <Input type="date" id="endAt" onChange={handleStatusChange} />;
    case 'ASSIGNEE':
      // return <ModalActionAssignee setTaskAssigneeHandler={setTaskStatusHandler} />;
      return <></>;
    case 'SET_STATUS':
      return <ModalTaskActionSelectBox options={setStatusConstants} onChange={handleStatusChange} />;
    case 'SET_PRIORITY':
      return <ModalTaskActionSelectBox options={setPriorityConstants} onChange={handleStatusChange} />;
    case 'DELETE_TASK':
      return <ModalTaskDeleteButton onClick={() => mutate(id)}>Task 지우기</ModalTaskDeleteButton>;
    default:
      return null;
  }
}

export default ModalEditComponent;
