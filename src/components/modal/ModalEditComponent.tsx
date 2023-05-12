import React from 'react';
import { ModalActionEditProps } from '@/type/componentProps';
import { Button, Input } from '@chakra-ui/react';
import { ModalTaskDeleteButton } from '@/styles/modal.styles';
import { useMutation } from '@tanstack/react-query';
import { deleteTask } from '@/apis/task';

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
