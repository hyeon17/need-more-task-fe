import React, { useEffect, useState } from 'react';
import { ModalTaskActionSelectBox } from '@/styles/modal.styles';
import { getUsers, User } from '@/apis/task';
import { useQuery } from '@tanstack/react-query';
import { ModalActionAssigneeProps } from '@/type/componentProps';

export interface AssigneeOption {
  key: string;
  label: string;
  value: Number;
  profileImageUrl: string;
}

function ModalActionAssignee({ setTaskAssigneeHandler }: ModalActionAssigneeProps) {
  const [assignee, setAssignee] = useState<AssigneeOption[]>([
    {
      key: 'ASSIGNEE',
      label: '표시할 사용자가 없습니다.',
      value: 0,
      profileImageUrl: '',
    },
  ]);
  const { data } = useQuery(['users'], getUsers);

  const filterByInput = (input: string) => {
    if (!data) return;
    const filteredData = data.filter((user: User) => {
      return user.fullName.includes(input);
    });
    setAssignee(
      filteredData.map((user: User) => {
        return {
          key: 'ASSIGNEE',
          label: user.fullName,
          value: user.userId,
          profileImageUrl: user.profileImageUrl,
        };
      }),
    );
  };

  useEffect(() => {
    if (data) {
      setAssignee(
        data.map((user: User) => {
          return {
            key: 'ASSIGNEE',
            label: user.fullName,
            value: user.userId,
            profileImageUrl: user.profileImageUrl,
          };
        }),
      );
    }
  }, [data]);

  return (
    <ModalTaskActionSelectBox options={assignee} onChange={setTaskAssigneeHandler} onInputChange={filterByInput} />
  );
}

export default React.memo(ModalActionAssignee);
