import React from 'react';
import { ModalActionComponentProps, ModalActionEditProps } from '@/type/componentProps';
import { Button, Input } from '@chakra-ui/react';
import { ModalTaskActionSelectBox, ModalTaskDeleteButton } from '@/styles/modal.styles';
import ModalActionAssignee from '@/components/modal/ModalActionAssignee';
import { useMutation } from '@tanstack/react-query';
import { deleteTask } from '@/apis/task';

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

function ModalEditComponent({ action, onEditMode }: ModalActionEditProps) {
  const { mutate } = useMutation(deleteTask, {
    onSuccess: () => {
      // window.location.reload();
    },
  });

  switch (action) {
    case 'DELETE_TASK':
      return <ModalTaskDeleteButton>Delete Task</ModalTaskDeleteButton>;
    case 'EDIT_TASK':
      return <Button onClick={() => onEditMode(true)}>Edit Task</Button>;
    default:
      return <></>;
  }
}

export default ModalEditComponent;
