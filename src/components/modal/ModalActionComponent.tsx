import React from 'react';
import { ModalActionComponentProps } from '@/type/componentProps';
import { Button, Input } from '@chakra-ui/react';
import { ModalTaskActionSelectBox, ModalTaskDeleteButton } from '@/styles/modal.styles';

function ModalActionComponent({ action }: ModalActionComponentProps) {
  switch (action) {
    case 'DUE_DATE':
      return <Input type="date" />;
    case 'ASSIGNEE':
      return <div>Assignee</div>;
    case 'SET_STATUS':
      return <ModalTaskActionSelectBox />;
    case 'SET_PRIORITY':
      return <ModalTaskActionSelectBox />;
    case 'DELETE_TASK':
      return <ModalTaskDeleteButton>Delete Task</ModalTaskDeleteButton>;
    case 'EDIT_TASK':
      return <div>Edit Task</div>;
    default:
      return <div>Default</div>;
  }
}

export default ModalActionComponent;
