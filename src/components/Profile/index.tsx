import React, { useState } from 'react';
import { AccountInfoProps } from '@/type/authTypes';
import StepOne from '../Auth/Join/StepOne';
import { FormControl } from '@chakra-ui/react';
import { teamOptions, getJoinCompanyYear } from '@/utils';
import * as A from '@/styles/auth.styles';
import * as P from '@/styles/profile.styles';

function AccountInfo({ userInfo }: AccountInfoProps) {
  // const { department, fullName, joinCompanyYear, email, phone, profileImageUrl } = userInfo;

  const [department, setDepartment] = useState('');

  const handleDepartmentChange = (selectedOption: unknown) => {
    setDepartment((selectedOption as { value: string }).value);
  };

  return (
    <>
      <P.AccountWrapper>
        <h1>계정 정보</h1>
        {/* <StepOne /> */}
        <FormControl isRequired>
          <label>현재 소속 팀은 어디인가요?</label>
          <A.StyledSelect
            instanceId="team-select"
            aria-live="polite"
            name="teams"
            options={teamOptions}
            // value={me?.department ? me?.department : department}
            // value={me?.department || department}
            // value={findSelectedDepartment(me?.department || department)}
            placeholder="팀 선택"
            closeMenuOnSelect={true}
            size="sm"
            onChange={handleDepartmentChange}
          />
        </FormControl>
      </P.AccountWrapper>
      <P.ButtonWrapper>
        <P.UpdateButton colorScheme="teal" size="md" color="white">
          프로필 업데이트
        </P.UpdateButton>
        <P.CancelButton color="labelColor">취소</P.CancelButton>
      </P.ButtonWrapper>
    </>
  );
}

export default AccountInfo;
