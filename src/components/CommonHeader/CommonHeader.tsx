import React from 'react';
import * as C from '@/styles/commonHeader.styles';
import Image from 'next/image';
import Logo from 'public/Logo.png';
import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useUserInfo } from '@/store/userInfoStore';
import Link from 'next/link';
import LogoutModal from './LogoutModal';

function CommonHeader() {
  const { userInfo } = useUserInfo();
  // console.log('userInfo>>', userInfo);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <C.Container>
      <Menu>
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <C.Nav>
          <ul>
            <li>
              <Link href={`/dashboard`}>Dashboard</Link>
            </li>
            <li>
              <Link href={`/kanban`}>Kanban</Link>
            </li>
            <li>
              <Link href={`/calendar`}>Calendar</Link>
            </li>
          </ul>
          {/* <C.CreateTaskButton>New Task</C.CreateTaskButton> */}
          <MenuButton>
            {/* as={Button} */}
            <C.ProfileWrapper>
              <ProfileImage />
              <ExpandMoreOutlinedIcon />
            </C.ProfileWrapper>
          </MenuButton>
        </C.Nav>

        <MenuList zIndex={10}>
          <MenuGroup title="정보">
            <MenuItem closeOnSelect={false}>부서: {userInfo?.department}</MenuItem>
            <MenuItem closeOnSelect={false}>이메일: {userInfo?.email}</MenuItem>
            <MenuItem closeOnSelect={false}>이름: {userInfo?.fullName}</MenuItem>
            <MenuItem closeOnSelect={false}>입사 연도: {userInfo?.joinCompanyYear}</MenuItem>
            <MenuItem closeOnSelect={false}>연락처: {userInfo?.phone}</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="프로필">
            <MenuItem>
              <Link href={`/profile/${userInfo?.userId}`}>프로필 편집</Link>
            </MenuItem>
            <MenuItem>
              <Link href={`/profile/${userInfo?.userId}`}>권한 변경 신청</Link>
            </MenuItem>
            <LogoutModal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
              <MenuItem>로그아웃</MenuItem>
            </LogoutModal>
          </MenuGroup>
        </MenuList>
      </Menu>
    </C.Container>
  );
}

export default CommonHeader;
