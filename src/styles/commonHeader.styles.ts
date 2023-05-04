import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled.header`
  /* border: 1px solid; */
  border: 1px solid ${({ theme }) => theme.outlineColor};

  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-bottom: 30px;
  background-color: 1px solid ${({ theme }) => theme.white};
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  & ul {
    display: flex;
    margin-left: 100px;
    gap: 28px;

    font-weight: 700;
    font-size: 12px;
    line-height: 18px;

    & > li {
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
