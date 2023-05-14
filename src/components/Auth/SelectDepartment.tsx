import React from 'react';
import * as A from '@/styles/auth.styles';
import { FormControl } from '@chakra-ui/react';
import { teamOptions } from '@/utils';

function SelectDepartment() {
  return (
    <A.InputContainer>
      <FormControl isRequired>
        <label>현재 소속 팀은 어디인가요?</label>
        <A.StyledSelect
          id="team-select"
          name="teams"
          options={teamOptions}
          placeholder="팀 선택"
          closeMenuOnSelect={false}
          size="sm"
        />
      </FormControl>
    </A.InputContainer>
  );
}

export default SelectDepartment;
