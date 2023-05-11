import React, { useState } from 'react';
import { ModalActionComponentProps } from '@/type/componentProps';
import { Input } from '@chakra-ui/react';
import { ModalTaskActionSelectBox, ModalTaskDeleteButton } from '@/styles/modal.styles';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/apis/task';
import ModalActionAssignee from '@/components/modal/ModalActionAssignee';

const setStatusConstants = [
  {
    key: 'SET_STATUS',
    label: '해야할 일',
    value: 'TODO',
  },
  {
    key: 'SET_STATUS',
    label: '진행중',
    value: 'IN_PROGRESS',
  },
  {
    key: 'SET_STATUS',
    label: '완료',
    value: 'DONE',
  },
];

const setPriorityConstants = [
  {
    key: 'SET_PRIORITY',
    label: '낮음',
    value: 'LOW',
  },
  {
    key: 'SET_PRIORITY',
    label: '중간',
    value: 'MEDIUM',
  },
  {
    key: 'SET_PRIORITY',
    label: '높음',
    value: 'HIGH',
  },
  {
    key: 'SET_PRIORITY',
    label: '긴급',
    value: 'URGENT',
  },
];

function ModalActionComponent({ action, setTaskStatusHandler }: ModalActionComponentProps) {
  const [str, setStr] = useState<string>('');
  const { data, error } = useQuery(['users'], getUsers);

  console.log(data, error);

  switch (action) {
    case 'START_AT':
      return <Input type="date" id="START_AT" onChange={setTaskStatusHandler} onChangeCapture={setTaskStatusHandler} />;
    case 'END_AT':
      return <Input type="date" id="END_AT" onChange={setTaskStatusHandler} onChangeCapture={setTaskStatusHandler} />;
    case 'ASSIGNEE':
      return <ModalActionAssignee />;
    case 'SET_STATUS':
      return <ModalTaskActionSelectBox id="SET_STATUS" options={setStatusConstants} onChange={setTaskStatusHandler} />;
    case 'SET_PRIORITY':
      return <ModalTaskActionSelectBox options={setPriorityConstants} onChange={setTaskStatusHandler} />;
    case 'DELETE_TASK':
      return <ModalTaskDeleteButton>Delete Task</ModalTaskDeleteButton>;
    case 'EDIT_TASK':
      return <div>Edit Task</div>;
    default:
      return <></>;
  }
}

export default ModalActionComponent;
