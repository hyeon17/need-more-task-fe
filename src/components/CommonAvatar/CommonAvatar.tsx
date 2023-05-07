import { Avatar, AvatarGroup } from '@chakra-ui/react';
import React from 'react';

interface ICommonAvatar {
  size?: string;
  max?: number;
  src?: string;
}

function CommonAvatar({ size = 'sm', max = 2, src = 'https://www.gravatar.com/avatar?d=mp&f=y' }: ICommonAvatar) {
  return (
    <AvatarGroup size={size} max={max}>
      <Avatar name="Ryan Florence" src={src} />
      <Avatar name="Segun Adebayo" src={src} />
      <Avatar name="Kent Dodds" src={src} />
      <Avatar name="Prosper Otemuyiwa" src={src} />
      <Avatar name="Christian Nwamba" src={src} />
    </AvatarGroup>
  );
}

export default CommonAvatar;
