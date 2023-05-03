import { Button, Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Select } from 'chakra-react-select';

export const Container = styled.div`
  position: relative;
  border: 1px solid;
  border-radius: 12px;
  width: 417px;

  min-height: 650px;
  margin-top: 100px;
  padding-bottom: 100px;
  background-color: #fff;

  overflow: hidden;

  & label,
  & span {
    font-size: 14px;
    color: ${({ theme }) => theme.labelColor};
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;

  & > h5 {
    padding: 25px 0;
  }

  & > hr {
    color: ${({ theme }) => theme.outlineColor};
  }
`;
export const TitleDivider = styled(Divider)`
  color: ${({ theme }) => theme.outlineColor};
`;

export const BodyWrapper = styled.div`
  /* border: 1px solid; */
  padding: 10px 26px;

  & h2 {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 20px;
  }
`;
export const InputContainer = styled.div`
  margin-bottom: 30px;
  /* border: 1px solid; */
`;
export const ConfirmButton = styled(Button)`
  margin-top: 100px;
  width: 100%;
  background-color: ${({ theme }) => theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.outlineColor} !important;
  }
`;

export const FooterWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  width: 100%;
  height: 68px;
  background-color: ${({ theme }) => theme.gray50};

  & span {
    display: inline;
  }

  & > button {
    color: ${({ theme }) => theme.labelColor};
    font-weight: 700;
    font-size: 12px;
  }
`;

export const StyledSelect = styled(Select)`
  /* color: ${({ theme }) => theme.gray50}; */
  & #react-select-3-placeholder {
    color: ${({ theme }) => theme.labelColor};
  }
`;

export const JoinStepWrapper = styled.div`
  /* border: 1px solid; */
  display: flex;
  margin: 10px 20px 0;
`;

export const PhoneNumWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;
