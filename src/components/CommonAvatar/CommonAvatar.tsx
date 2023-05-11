import { Avatar, AvatarGroup } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface IAssignee {
  profileImageUrl: string;
  userId: number;
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
  const router = useRouter();
  return (
    <AvatarGroup size={size} max={max}>
      {assignee?.map((user: IAssignee) => {
        const { profileImageUrl, userId } = user;
        return (
          <StyledAvatar
            src={profileImageUrl ? profileImageUrl : src}
            key={`userId${userId}`}
            onClick={() => router.push(`/profile/${userId}`)}
            style={{ cursor: 'pointer' }}
          />
        );
      })}
    </AvatarGroup>
  );
}

export default CommonAvatar;

export const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`;
