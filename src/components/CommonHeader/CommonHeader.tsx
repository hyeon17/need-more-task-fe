import React from 'react';
import * as C from '@/styles/commonHeader.styles';
import Image from 'next/image';
import Logo from 'public/Logo.png';
import { Button } from '@chakra-ui/react';
import ProfileImage from '@/components/CommonHeader/ProfileImage';

function CommonHeader() {
  return (
    <C.Container>
      <Image src={Logo} alt="Logo" width={50} height={50} />
      <C.Nav>
        <ul>
          <li>Dashboard</li>
          <li>Kanban</li>
          <li>Calendar</li>
        </ul>
        <C.CreateTaskButton>New Task</C.CreateTaskButton>
        <ProfileImage />
      </C.Nav>
    </C.Container>
  );
}

export default CommonHeader;
