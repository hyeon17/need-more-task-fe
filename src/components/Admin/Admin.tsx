import React, { useEffect, useState } from 'react';
import * as AD from '@/styles/admin.styles';
import { useToast } from '@chakra-ui/react';

import { axiosWithToken } from '@/apis/configs';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { updateRoleAPI } from '@/apis/user';

import UserRoleSelectPopover from '@/components/Admin/UserRoleSelectPopover';
import SelectedRoleUserList from '@/components/Admin/SelectedRoleUserList';
import useDebounce from '@/hooks/useDebounce';
import { IUser } from '@/type/authTypes';

interface IAdmin {
  userInfo?: IUser | undefined;
}

function Admin({ userInfo }: IAdmin) {
  console.log('userInfo>>>', userInfo);

  const toast = useToast();
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState(userInfo?.fullName || '');

  const [isShowSearchedUserList, setIsShowSearchedUserList] = useState(Boolean(userInfo?.fullName));
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [searchRoleType, setSearchRoleType] = useState('all');

  //
  const [userSearchPage, setUserSearchPage] = useState(1);
  const searchUserKey = `/users/search?fullName`;
  //
  const [userRolePage, setUserRolePage] = useState(1);
  const queryKey = `/admin/users?role`;

  const fetchRoleUsers = async (page = 0) => {
    const { data } = await axiosWithToken.get(`${queryKey}=${searchRoleType}&page=${page - 1}`);
    return data;
  };
  const fetchSearchUsers = async (page = 0) => {
    const { data } = await axiosWithToken.get(`${searchUserKey}=${debouncedSearchValue}&page=${page - 1}`);
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
    queryFn: () => fetchRoleUsers(userRolePage),
    keepPreviousData: true,
    staleTime: 10000,
  });

  const {
    data: SearchedUserData,
    isLoading: isLoadingSearchedUserData,
    isFetching: isFetchingSearchedUserData,
    isPreviousData: isPreviousSearchedUserData,
    refetch: refetchSearchedUserData,
  } = useQuery({
    queryKey: [searchUserKey],
    queryFn: () => fetchSearchUsers(userSearchPage),
    keepPreviousData: true,
    staleTime: 10000,
  });

  const onSuccessRoleChange = (data: any) => {
    toast({
      title: '권한 수정 성공',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    queryClient.invalidateQueries([queryKey]);
    queryClient.invalidateQueries([searchUserKey]);
  };

  useEffect(() => {
    refetchSelectedRoleUser();
  }, [searchRoleType, userRolePage]);

  useEffect(() => {
    refetchSearchedUserData();
  }, [debouncedSearchValue, userSearchPage]);

  useEffect(() => {
    setSearchValue(userInfo?.fullName || '');
    setIsShowSearchedUserList(Boolean(userInfo?.fullName));
  }, [userInfo]);

  const { mutate: updateAdminMutate } = updateRoleAPI({ onSuccess: onSuccessRoleChange });

  const handleAdminRoleChange = (userId: number) => {
    if (userId === 1) {
      toast({
        title: '관리자는 본인의 권한을 수정할 수 없습니다.',
        // description: '알 수 없는 오류가 발생했습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    updateAdminMutate({ userId, role: 'ADMIN' });
  };

  const handleUserRoleChange = (userId: number) => {
    updateAdminMutate({ userId, role: 'USER' });
  };

  const handleSearchType = (e: React.MouseEvent<HTMLElement>) => {
    setUserSearchPage(1);
    setUserRolePage(1);
    const targetValue = (e.currentTarget as HTMLElement).getAttribute('data-value');

    if (targetValue) {
      if (searchRoleType === targetValue) {
        setSearchRoleType('all');
      } else {
        setSearchRoleType(targetValue);
      }
    }
  };

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length > 0) {
      setIsShowSearchedUserList(true);
      setSearchValue(e.target.value);
    } else {
      setIsShowSearchedUserList(false);
      setSearchValue('');
    }
  };

  return (
    <AD.ManageRoleContainer>
      <AD.AdminH5>
        <h5>유저 권한 정보</h5>

        <AD.SelectHeaderWrapper>
          {isShowSearchedUserList && <span>검색 결과: {SearchedUserData?.data.totalCount} 명</span>}
          {(!isShowSearchedUserList || searchValue) && <span>사원 수: {SelectedRoleUserData?.data.totalCount}</span>}
          {/* popover */}
          {!isShowSearchedUserList && (
            <UserRoleSelectPopover handleSearchType={handleSearchType} searchRoleType={searchRoleType} />
          )}
        </AD.SelectHeaderWrapper>
      </AD.AdminH5>
      <AD.ManageRoleSearchWrapper>
        <AD.SearchInput
          placeholder="팀원을 찾아보세요"
          size="md"
          backgroundColor="outlineColor"
          borderColor="labelColor"
          value={searchValue}
          onChange={(e) => handleChangeInputValue(e)}
        />
      </AD.ManageRoleSearchWrapper>
      {/* search user list */}
      {isShowSearchedUserList && searchValue ? (
        <>
          {SearchedUserData && (
            <SelectedRoleUserList
              userData={SearchedUserData}
              handleAdminRoleChange={handleAdminRoleChange}
              handleUserRoleChange={handleUserRoleChange}
              isLoading={isLoadingSearchedUserData}
              isFetching={isFetchingSearchedUserData}
              isPreviousData={isPreviousSearchedUserData}
              page={userSearchPage}
              setPage={setUserSearchPage}
            />
          )}
        </>
      ) : (
        <>
          {SelectedRoleUserData && (
            <SelectedRoleUserList
              userData={SelectedRoleUserData}
              handleAdminRoleChange={handleAdminRoleChange}
              handleUserRoleChange={handleUserRoleChange}
              isLoading={isLoadingSelectedRoleUser}
              isFetching={isFetchingSelectedRoleUser}
              isPreviousData={isPreviousSelectedRoleUserData}
              page={userRolePage}
              setPage={setUserRolePage}
            />
          )}
        </>
      )}
      {/* user role tpe list */}
    </AD.ManageRoleContainer>
  );
}

export default Admin;
