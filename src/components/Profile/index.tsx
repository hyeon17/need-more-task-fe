import React, { useMemo, useState } from 'react';
import { AccountInfoProps, IUser } from '@/type/authTypes';
import StepOne from '../Auth/Join/StepOne';
import { FormControl } from '@chakra-ui/react';
import { teamOptions, getJoinCompanyYear } from '@/utils';
import * as A from '@/styles/auth.styles';
import * as P from '@/styles/profile.styles';

interface IAccountInfo {
  userInfo: IUser;
  currentLoginUserInfo: IUser;
}

function AccountInfo({ userInfo, currentLoginUserInfo }: IAccountInfo) {
  console.log('userInfo>>>', userInfo);
  // const { department, fullName, joinCompanyYear, email, phone, profileImageUrl } = userInfo;
  const [edit, setEdit] = useState(false);
  const [department, setDepartment] = useState('');
  const [joinCompanyYear, setJoinCompanyYear] = useState('');

  const handleDepartmentChange = (selectedOption: unknown) => {
    setDepartment((selectedOption as { value: string }).value);
  };
  const handleJoinCompanyYearChange = (selectedOption: unknown) => {
    setJoinCompanyYear((selectedOption as { value: string }).value);
  };
  const findSelectedDepartment = (dept?: string) => {
    return teamOptions.find((option) => option.value === dept);
  };

  const joinCompanyYearOptions = useMemo(() => getJoinCompanyYear(), []);

  // 버튼
  const handleEditProfile = () => {
    setEdit(true);
  };

  const handleSaveProfile = () => {
    setEdit(false);
  };

  return (
    <>
      <P.AccountWrapper>
        <h1>계정 정보</h1>
        {/* department */}
        <FormControl isRequired>
          <label>현재 소속 팀은 어디인가요?</label>
          <A.StyledSelect
            instanceId="team-select"
            aria-live="polite"
            name="teams"
            options={teamOptions}
            placeholder="팀 선택"
            closeMenuOnSelect={true}
            size="sm"
            value={findSelectedDepartment(department || userInfo?.department)}
            onChange={handleDepartmentChange}
            isReadOnly={!edit}
            isInvalid={!edit}
            isRequired
          />
        </FormControl>

        {/* 입사연도 선택 */}
        <A.InputContainer>
          <FormControl isRequired>
            <label>입사 연도는 언제인가요?</label>
            <A.StyledSelect
              instanceId="join-year-select"
              aria-live="polite"
              name="join year"
              options={joinCompanyYearOptions}
              placeholder="입사 연도 선택"
              closeMenuOnSelect={true}
              size="sm"
              // value={joinCompanyYear || userInfo?.joinCompanyYear}
              value={userInfo?.joinCompanyYear}
              onChange={handleJoinCompanyYearChange}
              isReadOnly={!edit}
              isInvalid={!edit}
              isRequired
            />
          </FormControl>
        </A.InputContainer>
      </P.AccountWrapper>
      {/* Edit 버튼 */}
      {userInfo?.userId === currentLoginUserInfo?.userId && (
        <P.ButtonWrapper>
          {edit ? (
            <P.UpdateButton colorScheme="teal" size="md" color="white" onClick={handleSaveProfile}>
              저장
            </P.UpdateButton>
          ) : (
            <P.UpdateButton colorScheme="teal" size="md" color="white" onClick={handleEditProfile}>
              프로필 업데이트
            </P.UpdateButton>
          )}

          <P.CancelButton color="labelColor">취소</P.CancelButton>
        </P.ButtonWrapper>
      )}
    </>
  );
}

export default AccountInfo;
