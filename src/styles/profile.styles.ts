import { Button, ModalFooter, ModalHeader } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  /* border: 1px solid; */
  width: 1200px;
  min-height: 80vh;

  display: grid;
  grid-template-columns: 400px 800px;

  & h1 {
    font-size: 22px;
    font-weight: 700;
  }

  & h3 {
    font-size: 27px;
    font-weight: 700;
    color: ${({ theme }) => theme.textColor};
  }

  & h4 {
    font-weight: 700;
    font-size: 12px;
    color: ${({ theme }) => theme.textColor};
  }
  & span {
    font-weight: 500;
    font-size: 12px;
    color: ${({ theme }) => theme.labelColor};
  }
`;
export const LeftContainer = styled.div`
  padding: 0 20px;
  border-right: 1px solid ${({ theme }) => theme.outlineColor};
`;
export const RightContainer = styled.div`
  padding: 0 120px 0 120px;
  margin-bottom: 80px;
`;

export const AsideWrapper = styled.div`
  position: relative;

  & > img {
    border: 1px solid;
    display: flex;
    justify-content: center;
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const NavWrapper = styled.nav`
  margin-top: 50px;

  & ul {
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  & li {
    display: flex;
    gap: 22px;
    align-items: center;
    width: 360px;
    height: 64px;
    padding: 20px 24px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #3e7eff;
    border-radius: 12px;

    & > div {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const AccountWrapper = styled.div`
  /* border: 1px solid; */
  height: 100%;

  & h1 {
    margin-bottom: 33px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
`;
export const UpdateButton = styled(Button)`
  width: 166px;
  height: 50px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary};

  color: ${({ theme }) => theme.white};
  font-size: 12px;

  &:hover {
    background-color: ${({ theme }) => theme.outlineColor} !important;
  }
`;

export const CancelButton = styled(Button)`
  width: 140px;
  height: 50px;
  font-size: 12px;
`;

// 비밀번호 확인 모달
export const StyledModalHeader = styled(ModalHeader)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: center;
`;
export const StyledModalFooter = styled(ModalFooter)`
  display: flex;
  justify-content: space-between;
`;
