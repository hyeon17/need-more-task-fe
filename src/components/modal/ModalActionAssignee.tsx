import React, { useEffect, useState } from 'react';
import { ModalTaskActionSelectBox } from '@/styles/modal.styles';
import { IAssignee } from '@/components/CommonAvatar/CommonAvatar';
import { getUsers, User } from '@/apis/task';
import { useQuery } from '@tanstack/react-query';
import { ModalActionAssigneeProps } from '@/type/componentProps';

export interface AssigneeOption {
  key: string;
  label: string;
  value: Number;
  profileImage: string;
}

function ModalActionAssignee({ setTaskAssigneeHandler }: ModalActionAssigneeProps) {
  const [assignee, setAssignee] = useState<AssigneeOption[]>([
    {
      key: 'ASSIGNEE',
      label: '표시할 사용자가 없습니다.',
      value: 0,
      profileImage: '',
    },
  ]);
  const { data } = useQuery(['users'], getUsers);

  useEffect(() => {
    if (data) {
      setAssignee(
        data.map((user: User) => {
          return {
            key: 'ASSIGNEE',
            label: user.fullName,
            value: user.userId,
            profileImage: user.profileImageUrl,
          };
        }),
      );
    }
  }, [data]);

  console.log(assignee);

  return <ModalTaskActionSelectBox options={assignee} onChange={setTaskAssigneeHandler} />;
}

export default React.memo(ModalActionAssignee);
