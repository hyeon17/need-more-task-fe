import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  border: 1px solid;
  border-radius: 12px;
  width: 417px;
  min-height: 650px;
  margin-top: 160px;
  background-color: #fff;

  & label {
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
  padding: 70px 26px;
`;
export const InputContainer = styled.div`
  margin-bottom: 14px;
  /* border: 1px solid; */
`;
