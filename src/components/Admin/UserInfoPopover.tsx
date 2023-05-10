import React, { useState } from 'react';
import * as AD from '@/styles/admin.styles';
import { Popover, PopoverTrigger, Portal } from '@chakra-ui/react';
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import { IUserRole } from '@/type/authTypes';
import Link from 'next/link';
import { TeamEnum } from '@/utils';
// CommonHeader/ProfileImage

interface IUserInfoPopover {
  user: IUserRole;
}

function UserInfoPopover({ user }: IUserInfoPopover) {
  const { department, email, fullName, joinCompanyYear, userId, role, profileImageUrl } = user;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };
  // onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}
  return (
    <Popover isOpen={isPopoverOpen} onClose={handlePopoverClose}>
      <PopoverTrigger>
        {/* onMouseLeave={handlePopoverClose} */}
        <div onMouseEnter={handlePopoverOpen}>
          <ProfileImage width="40" height="40" src={profileImageUrl} />
        </div>
      </PopoverTrigger>
      {/*  */}
      <Portal>
        <AD.SelectHeaderRole onMouseLeave={handlePopoverClose}>
          {/* <PopoverArrow /> */}
          <AD.UserPopoverBody>
            {/* <h5>관리자</h5> */}
            <Link href={`/profile/${userId}`}>
              <ProfileImage width="60" height="60" src={profileImageUrl} />
            </Link>
            <AD.UserPopoverInfoWrapper>
              <div>
                <Link href={`/profile/${userId}`}>
                  <h5>{fullName}</h5>
                </Link>
                <Link href={`/profile/${userId}`}>
                  <p>{email}</p>
                </Link>
              </div>
              <span>
                부서: <strong>{TeamEnum(department)}</strong>
              </span>
              <span>
                입사 연도: <strong>{joinCompanyYear}</strong>
              </span>
            </AD.UserPopoverInfoWrapper>
          </AD.UserPopoverBody>
        </AD.SelectHeaderRole>
      </Portal>
    </Popover>
  );
}

export default UserInfoPopover;
