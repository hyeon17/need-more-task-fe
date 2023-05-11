import { Button, Checkbox, Input, PopoverBody, PopoverContent } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Select } from 'chakra-react-select';

export const Container = styled.div`
  width: 100%;
  min-width: 1200px;
  padding: 0 60px;
`;
export const ManageRoleContainer = styled.div`
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.outlineColor};
  border-radius: 16px;
  overflow: hidden;

  width: 100%;
  /* height: 424px; */
`;

export const AdminH5 = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.outlineColor};
  background-color: ${({ theme }) => theme.gray100};
  /* #F6F8FA */

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  h5 {
    font-weight: 700;
    line-height: 24px;
  }
`;

// select header
export const SelectHeaderWrapper = styled.div`
  /* border: 1px solid; */
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  & > span {
    margin-right: 20px;
  }
`;
export const ManageRoleSearchWrapper = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.outlineColor};
`;
export const SearchInput = styled(Input)`
  &::placeholder {
    color: ${({ theme }) => theme.labelColor};
    font-size: 14px;
    font-weight: 700;
  }
`;

// user list wrapper
export const UserListWrapper = styled.ul`
  /* border: 1px solid; */
  min-height: 900px;
`;
export const UserList = styled.li`
  padding: 20px 16px;
  display: flex;
  gap: 20px;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.outlineColor};
  }
`;
export const UserBasicInfoWrapper = styled.div`
  /* border: 1px solid; */
  display: flex;
  gap: 20px;
  align-items: center;
  flex: 1 1 auto;
`;
export const UserName = styled.div`
  display: flex;
  flex-direction: column;

  & > a {
    font-weight: 700;
    font-size: 18px;
    color: ${({ theme }) => theme.primary};
  }
  & > span {
    font-weight: 700;
    color: ${({ theme }) => theme.labelColor};
  }
`;
export const RoleButton = styled(Button)`
  /* width: 150px; */
  & > span {
    font-weight: 400;
    margin-right: 16px;

    & > strong {
      font-weight: 700;
    }
  }
`;
export const PaginationButtonNav = styled.nav`
  /* border: 1px solid; */
  padding: 10px 0;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;
export const PaginationButton = styled(Button)``;
export const RolePopoverBody = styled(PopoverBody)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const RoleSelectWrapper = styled.div`
  /* border: 1px solid; */
  display: flex;
  align-items: flex-start;
  padding: 3px 6px;
  cursor: pointer;

  &:hover,
  &:active {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.gray50};
  }
`;
export const RoleInfo = styled.div`
  margin-left: 10px;

  & h5 {
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
  }

  & span {
    color: ${({ theme }) => theme.labelColor};
  }
`;
export const CheckWrapper = styled.div`
  width: 14px;

  & > svg {
    width: 14px;
    margin-top: 3px;
  }
`;

//
export const SelectHeaderRole = styled(PopoverContent)`
  width: auto;
`;

// user info popover
export const UserPopoverBody = styled(PopoverBody)`
  padding: 10px 16px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const UserPopoverInfoWrapper = styled.div`
  & > div {
    display: flex;
    align-items: center;
    gap: 10px;

    & h5 {
      font-weight: 700;
      font-size: 18px;
      color: ${({ theme }) => theme.textColor};
      &:hover {
        color: ${({ theme }) => theme.primary};
      }
    }

    & p {
      font-size: 14px;
      color: ${({ theme }) => theme.labelColor};
      &:hover {
        color: ${({ theme }) => theme.primary};
      }
    }
  }

  & strong {
    font-weight: 700;
  }

  & span {
    display: block;
  }
`;
