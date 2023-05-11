import React, { useState } from 'react';
import { ModalTaskActionSelectBox } from '@/styles/modal.styles';

function ModalActionAssignee() {
  const [assignee, setAssignee] = useState();
  return <ModalTaskActionSelectBox id="SET_STATUS" />;
}

export default ModalActionAssignee;
