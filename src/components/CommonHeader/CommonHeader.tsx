import React from 'react';
import * as C from '@/styles/commonHeader.styles';
import Image from 'next/image';
import Logo from 'public/Logo.png';
import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useUserInfo } from '@/store/userInfoStore';
import Link from 'next/link';

function CommonHeader() {
  const { userInfo } = useUserInfo();

  return (
    <C.Container>
      <Menu>
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <C.Nav>
          <ul>
            <li>Dashboard</li>
            <li>Kanban</li>
            <li>Calendar</li>
          </ul>
          <C.CreateTaskButton>New Task</C.CreateTaskButton>
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
            <MenuItem closeOnSelect={false}>휴대폰 번호: {userInfo?.phone}</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="프로필">
            <MenuItem>
              <Link href={`/edit`}>프로필 편집</Link>
            </MenuItem>
            <MenuItem>권한 변경 신청</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </C.Container>
  );
}

export default CommonHeader;
