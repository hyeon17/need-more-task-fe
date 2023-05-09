import { Avatar, AvatarGroup } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface IAssignee {
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
  return (
    <AvatarGroup size={size} max={max}>
      {assignee?.map((user: IAssignee) => {
        const { profileImageUrl, userId } = user;
        return (
          <Link href={`/profile/${userId}`} key={`userId${userId}`}>
            <Avatar src={profileImageUrl ? profileImageUrl : src} />
          </Link>
        );
      })}
    </AvatarGroup>
  );
}

export default CommonAvatar;
