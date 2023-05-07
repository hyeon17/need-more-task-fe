import { Avatar, AvatarGroup } from '@chakra-ui/react';
import React from 'react';

interface ICommonAvatar {
  size?: string;
  max?: number;
  src?: string;
  assignee: any;
}

function CommonAvatar({
  assignee,
  size = 'sm',
  max = 2,
  src = 'https://www.gravatar.com/avatar?d=mp&f=y',
}: ICommonAvatar) {
  return (
    <AvatarGroup size={size} max={max}>
      {assignee.map((user: any) => {
        const { profileImageUrl, userId } = user;
        return <Avatar src={src} key={`userId${userId}`} />;
      })}
    </AvatarGroup>
  );
}

export default CommonAvatar;
