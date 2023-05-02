import React from 'react';
import * as A from '@/styles/auth.styles';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

export const colorOptions = [
  { value: 'blue', label: 'Blue', color: '#0052CC' },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630' },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
];

export const groupedOptions = [
  {
    label: 'Colours',
    options: colorOptions,
  },
];

function SelectDepartment() {
  return (
    <A.InputContainer>
      <FormControl isRequired>
        <label>부서 선택</label>
        <A.StyledSelect
          id="team-select"
          name="teams"
          options={groupedOptions}
          placeholder="소속된 팀을 선택해주세요"
          closeMenuOnSelect={false}
          size="sm"
        />
      </FormControl>
    </A.InputContainer>
  );
}

export default SelectDepartment;
