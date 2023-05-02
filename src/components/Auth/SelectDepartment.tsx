import { Image } from '@chakra-ui/next-js';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import React from 'react';

function SelectDepartment() {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<KeyboardArrowDownOutlinedIcon />}>
        Your Cats
      </MenuButton>
      <MenuList>
        <MenuItem minH="48px">
          <span>Fluffybuns the Destroyer</span>
        </MenuItem>
        <MenuItem minH="40px">
          <span>Simon the pensive</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default SelectDepartment;
