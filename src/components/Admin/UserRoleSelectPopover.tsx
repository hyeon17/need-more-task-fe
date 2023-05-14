import React from 'react';
import { Popover, PopoverTrigger, Portal } from '@chakra-ui/react';
import * as AD from '@/styles/admin.styles';
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';

interface IUserRoleSelectPopover {
  handleSearchType: (e: React.MouseEvent<HTMLElement>) => void;
  searchRoleType: string;
}

function UserRoleSelectPopover({ handleSearchType, searchRoleType }: IUserRoleSelectPopover) {
  return (
    <Popover>
      <PopoverTrigger>
        <AD.RoleButton>
          <span>Role</span>
          <ChevronDownIcon />
        </AD.RoleButton>
      </PopoverTrigger>
      {/*  */}
      <Portal>
        <AD.SelectHeaderRole>
          {/* <PopoverArrow /> */}
          <AD.RolePopoverBody>
            <AD.RoleSelectWrapper onClick={handleSearchType} data-value="admin">
              <AD.CheckWrapper>
                {searchRoleType === 'admin' ? <CheckIcon /> : <div style={{ width: '24px', height: '24px' }} />}
              </AD.CheckWrapper>
              <AD.RoleInfo data-value="admin">관리자</AD.RoleInfo>
            </AD.RoleSelectWrapper>

            <AD.RoleSelectWrapper onClick={handleSearchType} data-value="user">
              <AD.CheckWrapper>
                {searchRoleType === 'user' ? <CheckIcon /> : <div style={{ width: '24px', height: '24px' }} />}
              </AD.CheckWrapper>
              <AD.RoleInfo data-value="user">일반 사용자</AD.RoleInfo>
            </AD.RoleSelectWrapper>
          </AD.RolePopoverBody>
        </AD.SelectHeaderRole>
      </Portal>
    </Popover>
  );
}

export default UserRoleSelectPopover;
