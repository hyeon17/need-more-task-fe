import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';
import theme from './theme';

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 20px 0;
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  width: 450px;
  height: 450px;
`;

export const HomeButton = styled(Button)`
  margin-top: 50px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  &:hover {
    background-color: ${({ theme }) => theme.successColor};
    color: ${({ theme }) => theme.white};
  }
`;

export const SpanWord = styled.span`
  color: ${({ theme }) => theme.errorColor};
`;
