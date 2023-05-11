import { Avatar, AvatarGroup, Tooltip } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useModalState } from '@/store/modalStore';

export interface IAssignee {
  profileImageUrl: string;
  userId: number;
  name: string;
}

interface ICommonAvatar {
  size?: string;
  max?: number;
  src?: string;
  assignee: IAssignee[];
}

function CommonAvatar({
  assignee,
  size = 'sm',
  max = 2,
  src = 'https://www.gravatar.com/avatar?d=mp&f=y',
}: ICommonAvatar) {
  const { onCloseModal } = useModalState();
  const router = useRouter();

  const onClick = (userId: number) => {
    onCloseModal();
    router.push(`/profile/${userId}`);
  };
  console.log(assignee);
  return (
    <AvatarGroup size={size} max={max}>
      {assignee?.map((user: IAssignee) => {
        const { profileImageUrl, userId } = user;
        return (
          <Tooltip label={user.name}>
            <StyledAvatar
              src={profileImageUrl ? profileImageUrl : src}
              key={`userId${userId}`}
              onClick={() => onClick(userId)}
              style={{ cursor: 'pointer' }}
              size={size}
            />
          </Tooltip>
        );
      })}
    </AvatarGroup>
  );
}

export default CommonAvatar;

export const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`;
