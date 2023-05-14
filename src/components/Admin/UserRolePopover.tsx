import React from 'react';
import { Popover, PopoverContent, PopoverTrigger, Portal } from '@chakra-ui/react';
import * as AD from '@/styles/admin.styles';
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { UserRoleEnum } from '@/utils';

interface IUserRolePopover {
  userId: number;
  role: string | undefined;
  handleAdminRoleChange: (userId: number) => void;
  handleUserRoleChange: (userId: number) => void;
}

function UserRolePopover({ userId, role, handleAdminRoleChange, handleUserRoleChange }: IUserRolePopover) {
  return (
    <Popover>
      <PopoverTrigger>
        <AD.RoleButton isDisabled={userId === 1 ? true : false}>
          <span>
            Role: <strong>{UserRoleEnum(role)}</strong>
          </span>
          <ChevronDownIcon />
        </AD.RoleButton>
      </PopoverTrigger>
      {/*  */}
      <Portal>
        <PopoverContent>
          {/* <PopoverArrow /> */}
          <AD.RolePopoverBody>
            <AD.RoleSelectWrapper onClick={() => handleAdminRoleChange(userId)}>
              <AD.CheckWrapper>
                {role === 'ADMIN' ? <CheckIcon /> : <div style={{ width: '24px', height: '24px' }} />}
              </AD.CheckWrapper>
              <AD.RoleInfo>
                <h5>관리자</h5>
                <span>이 프로젝트에 대해 보기, 수정, 새로운 공동 작업자 추가 권한이 있습니다.</span>
              </AD.RoleInfo>
            </AD.RoleSelectWrapper>

            <AD.RoleSelectWrapper onClick={() => handleUserRoleChange(userId)}>
              <AD.CheckWrapper>
                {role === 'USER' ? <CheckIcon /> : <div style={{ width: '24px', height: '24px' }} />}
              </AD.CheckWrapper>
              <AD.RoleInfo>
                <h5>일반 사용자</h5>
                <span>이 프로젝트에 대해 보기 및 수정 권한이 있습니다.</span>
              </AD.RoleInfo>
            </AD.RoleSelectWrapper>
          </AD.RolePopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default UserRolePopover;
