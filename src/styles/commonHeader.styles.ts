import { Button, Menu, MenuGroup, MenuList } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';

export const Container = styled.header`
  /* border: 1px solid; */
  border: 1px solid ${({ theme }) => theme.outlineColor};

  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.white};
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;

  .selected {
    color: ${({ theme }) => theme.primary};
  }

  & ul {
    display: flex;
    align-items: center;
    margin-left: 100px;
    gap: 28px;

    font-weight: 700;
    font-size: 12px;

    & li {
      cursor: pointer;
      &:hover,
      &:active {
        color: ${({ theme }) => theme.primary};
      }
    }
  }
`;

export const CreateTaskButton = styled(Button)`
  width: 118px;
  height: 40px;

  color: ${({ theme }) => theme.labelColor};
  font-weight: 700;
  font-size: 12px;
`;

//
export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: ${({ theme }) => theme.labelColor};
  }
`;
export const StyledMenu = styled(Menu)`
  /* z-index: 3 !important; */
`;
export const StyledMenuList = styled(MenuList)`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; */
`;
export const UserInfoWrapper = styled.div`
  /* border: 1px solid; */

  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

//
