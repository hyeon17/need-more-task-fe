import React, { useState } from 'react';
import * as AD from '@/styles/admin.styles';
import {
  Button,
  Checkbox,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useToast,
} from '@chakra-ui/react';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import Link from 'next/link';
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { axiosWithToken } from '@/apis/configs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IUserRole } from '@/type/authTypes';
import EmptyProjects from '@/components/Dashboard/EmptyProjects';
import { UserRoleEnum } from '@/utils';
import { updateRoleAPI } from '@/apis/user';

function Admin() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const queryKey = `/admin/user?page=${page - 1}`;

  const fetchUsers = async (page = 0) => {
    const { data } = await axiosWithToken.get(`${queryKey}`);
    return data;
  };

  const {
    status,
    data: userData,
    error,
    isLoading,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchUsers(page),
    keepPreviousData: true,
    staleTime: 10000,
  });
  console.log('userData>>', userData);

  const onSuccessRoleChange = (data: any) => {
    console.log('data>>>', data);

    toast({
      title: '권한 수정 성공',
      // description: '알 수 없는 오류가 발생했습니다.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

    queryClient.invalidateQueries([`/admin/user?page=${page - 1}`]);
  };

  const { mutate: updateAdminMutate } = updateRoleAPI({ onSuccess: onSuccessRoleChange });

  // const handleAdminRoleChange = (userId: number) => {
  //   updateAdminMutate({ userId, role: 'ADMIN' });
  // };

  // const handleUserRoleChange = (userId: number) => {
  //   updateAdminMutate({ userId, role: 'USER' });
  // };
  const handleAdminRoleChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, userId: number) => {
    updateAdminMutate({ userId, role: 'ADMIN' });
  };

  const handleUserRoleChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, userId: number) => {
    updateAdminMutate({ userId, role: 'USER' });
  };

  return (
    <AD.Container>
      <AD.ManageRoleContainer>
        <AD.AdminH5>
          <h5>Manage role</h5>
          <AD.SelectHeaderWrapper>123</AD.SelectHeaderWrapper>
        </AD.AdminH5>
        <AD.ManageRoleSearchWrapper>
          <AD.SearchInput
            placeholder="팀원을 찾아보세요"
            size="md"
            backgroundColor="outlineColor"
            borderColor="labelColor"
          />
        </AD.ManageRoleSearchWrapper>
        {/* user list */}
        <AD.UserListWrapper>
          {userData?.data?.users.length > 0 ? (
            userData?.data?.users.map((user: IUserRole) => {
              const { userId, email, fullName, role, profileImageUrl } = user;

              return (
                <AD.UserList key={`userId${userId}`}>
                  {/* checkbox */}
                  <Checkbox size="md" color="primary" />
                  {/*  */}
                  <AD.UserBasicInfoWrapper>
                    <ProfileImage width="50" height="50" />
                    <AD.UserName>
                      {/* hover 하면 유저정보 popover */}
                      <Link href={`/profile/${userId}`}>{fullName}</Link>
                      <span>{email}</span>
                    </AD.UserName>
                  </AD.UserBasicInfoWrapper>

                  <Popover>
                    <PopoverTrigger>
                      <AD.RoleButton>
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
                          <AD.RoleSelectWrapper onClick={(event) => handleAdminRoleChange(event, userId)}>
                            <AD.CheckWrapper>
                              {role === 'ADMIN' ? <CheckIcon /> : <div style={{ width: '24px', height: '24px' }} />}
                            </AD.CheckWrapper>
                            <AD.RoleInfo>
                              <h5>관리자</h5>
                              <span>이 프로젝트에 대해 보기, 수정, 새로운 공동 작업자 추가 권한이 있습니다.</span>
                            </AD.RoleInfo>
                          </AD.RoleSelectWrapper>

                          <AD.RoleSelectWrapper onClick={(event) => handleUserRoleChange(event, userId)}>
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
                  {/*  */}
                </AD.UserList>
              );
            })
          ) : (
            <EmptyProjects />
          )}
          {isLoading || (isFetching && <></>)}
          <AD.PaginationButtonNav>
            <Button size="sm" disabled={isPreviousData || page === 1}>
              {'<'}
            </Button>
            <Button colorScheme="blue" size="sm">
              1
            </Button>
            <Button size="sm" disabled={isPreviousData}>
              {'>'}
            </Button>
          </AD.PaginationButtonNav>
        </AD.UserListWrapper>
      </AD.ManageRoleContainer>
    </AD.Container>
  );
}

export default Admin;
