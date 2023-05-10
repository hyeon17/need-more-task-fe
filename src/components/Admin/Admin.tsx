import React, { useEffect, useState } from 'react';
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
import CommonEmptyUser from '@/components/common/CommonEmptyUser';
import { UserRoleEnum } from '@/utils';
import { updateRoleAPI } from '@/apis/user';
import UserRolePopover from '@/components/Admin/UserRolePopover';
import UserInfoPopover from '@/components/Admin/UserInfoPopover';
import UserRoleSelectPopover from './UserRoleSelectPopover';
import SelectedRoleUserList from '@/components/Admin/SelectedRoleUserList';

function Admin() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [checkId, setCheckId] = useState<number[]>([]);
  // const [checkedRole, setCheckedRole] = useState('');
  const [allCheckbox, setAllCheckbox] = useState(false);
  const [searchRoleType, setSearchRoleType] = useState('all');

  const [page, setPage] = useState(1);
  const queryKey = `/admin/users?role`;

  const fetchUsers = async (page = 0) => {
    const { data } = await axiosWithToken.get(`${queryKey}=${searchRoleType}&page=${page - 1}`);
    return data;
  };

  const {
    status,
    data: SelectedRoleUserData,
    error,
    isLoading: isLoadingSelectedRoleUser,
    isFetching: isFetchingSelectedRoleUser,
    isPreviousData: isPreviousSelectedRoleUserData,
    refetch: refetchSelectedRoleUser,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchUsers(page),
    keepPreviousData: true,
    staleTime: 10000,
  });
  console.log('SelectedRoleUserData>>>', SelectedRoleUserData);

  const onSuccessRoleChange = (data: any) => {
    console.log('data>>>', data);

    toast({
      title: '권한 수정 성공',
      // description: '알 수 없는 오류가 발생했습니다.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

    queryClient.invalidateQueries([`/admin/users?role`]);
  };

  useEffect(() => {
    refetchSelectedRoleUser();
  }, [searchRoleType]);

  const { mutate: updateAdminMutate } = updateRoleAPI({ onSuccess: onSuccessRoleChange });

  const handleAdminRoleChange = (userId: number) => {
    if (userId === 1) {
      toast({
        title: '관리자는 본인의 권한을 수정할 수 없습니다.',
        // description: '알 수 없는 오류가 발생했습니다.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    updateAdminMutate({ userId, role: 'ADMIN' });
  };

  const handleUserRoleChange = (userId: number) => {
    updateAdminMutate({ userId, role: 'USER' });
  };

  const handleCheckChange = (userId: number, isChecked: boolean) => {
    if (isChecked) {
      if (!checkId.includes(userId)) {
        setCheckId((prevId) => [...prevId, userId]);
      }
    } else {
      setCheckId((prevId) => prevId.filter((id) => id !== userId)); // checkId 배열에서 해당 userId 값을 제거하여 상태를 업데이트
    }

    // if (userId) {
    //   return false;
    // }
  };
  console.log(checkId);

  const handleRememberCheck = (userId: number) => {
    // const isIncludedUserId =
    // if (isIncludedUserId) {

    // }
    return checkId.includes(userId);
  };

  const handleAllCheckChange = (isChecked: boolean) => {
    // userId, e.target.checked
    setAllCheckbox(!allCheckbox);

    // if (isChecked) {
    //   setAllCheckbox(false);
    // } else if (!isChecked) {
    //   setAllCheckbox(true);
    // }
  };

  const handleSearchType = (e: React.MouseEvent<HTMLElement>) => {
    const targetValue = (e.currentTarget as HTMLElement).getAttribute('data-value');
    console.log('targetValue>>>', targetValue);

    if (targetValue) {
      if (searchRoleType === targetValue) {
        setSearchRoleType('all');
      } else {
        setSearchRoleType(targetValue);
      }
    }
  };

  return (
    <AD.Container>
      <AD.ManageRoleContainer>
        <AD.AdminH5>
          <h5>Manage role</h5>
          <AD.SelectHeaderWrapper>
            {/* <Checkbox
              size="lg"
              colorScheme="orange"
              // isDisabled={userId === 1 ? true : false}
              isChecked={allCheckbox}
              onChange={(e) => handleAllCheckChange(e.target.checked)}
            /> */}
            {/* popover */}
            <UserRoleSelectPopover handleSearchType={handleSearchType} searchRoleType={searchRoleType} />
          </AD.SelectHeaderWrapper>
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
        <SelectedRoleUserList
          userData={SelectedRoleUserData}
          handleAdminRoleChange={handleAdminRoleChange}
          handleUserRoleChange={handleUserRoleChange}
          isLoadingSelectedRoleUser={isLoadingSelectedRoleUser}
          isFetchingSelectedRoleUser={isFetchingSelectedRoleUser}
          isPreviousSelectedRoleUserData={isPreviousSelectedRoleUserData}
          page={page}
          setPage={setPage}
        />
      </AD.ManageRoleContainer>
    </AD.Container>
  );
}

export default Admin;
