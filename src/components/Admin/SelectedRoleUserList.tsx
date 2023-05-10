import React from 'react';
import * as AD from '@/styles/admin.styles';
import UserInfoPopover from '@/components/Admin/UserInfoPopover';
import UserRolePopover from '@/components/Admin/UserRolePopover';
import Link from 'next/link';
import { IUserRole } from '@/type/authTypes';
import CommonEmptyUser from '@/components/common/CommonEmptyUser';
import { Button } from '@chakra-ui/react';

interface ISelectedRoleUserList {
  userData: any;
  handleAdminRoleChange: any;
  handleUserRoleChange: any;
  isLoadingSelectedRoleUser: boolean;
  isFetchingSelectedRoleUser: boolean;
  isPreviousSelectedRoleUserData: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function SelectedRoleUserList({
  userData,
  handleAdminRoleChange,
  handleUserRoleChange,
  isLoadingSelectedRoleUser,
  isFetchingSelectedRoleUser,
  isPreviousSelectedRoleUserData,
  page,
  setPage,
}: ISelectedRoleUserList) {
  return (
    <AD.UserListWrapper>
      {userData?.data?.users.length > 0 ? (
        userData?.data?.users.map((user: IUserRole) => {
          const { userId, email, fullName, role } = user;
          // console.log('user>>>', user);

          return (
            <AD.UserList key={`userId${userId}`}>
              {/* checkbox */}
              {/* <Checkbox
            size="md"
            colorScheme="orange"
            isDisabled={userId === 1 ? true : false}
            isChecked={userId === 1 ? false : allCheckbox}
            onChange={(e) => handleCheckChange(userId, e.target.checked)}
          /> */}
              {/*  */}
              <AD.UserBasicInfoWrapper>
                {/* user info popover */}
                <UserInfoPopover user={user} />
                {/* <ProfileImage width="50" height="50" src={profileImageUrl} /> */}

                <AD.UserName>
                  {/* hover 하면 유저정보 popover */}
                  <Link href={`/profile/${userId}`}>{fullName}</Link>
                  <span>{email}</span>
                </AD.UserName>
              </AD.UserBasicInfoWrapper>

              {/* user role popover component */}
              <UserRolePopover
                userId={userId}
                role={role}
                handleAdminRoleChange={handleAdminRoleChange}
                handleUserRoleChange={handleUserRoleChange}
              />
            </AD.UserList>
          );
        })
      ) : (
        <CommonEmptyUser />
      )}
      {isLoadingSelectedRoleUser || (isFetchingSelectedRoleUser && <></>)}
      <AD.PaginationButtonNav>
        <Button size="sm" disabled={isPreviousSelectedRoleUserData || page === 1}>
          {'<'}
        </Button>
        <Button colorScheme="blue" size="sm">
          1
        </Button>
        <Button size="sm" disabled={isPreviousSelectedRoleUserData}>
          {'>'}
        </Button>
      </AD.PaginationButtonNav>
    </AD.UserListWrapper>
  );
}

export default SelectedRoleUserList;
