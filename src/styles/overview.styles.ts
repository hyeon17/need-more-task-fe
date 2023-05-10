import styled from '@emotion/styled';
import { Tab, Card, CardBody, Badge, Avatar } from '@chakra-ui/react';
import CommonAvatar from '@/components/CommonAvatar/CommonAvatar';
import theme from './theme';

export const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  .chakra-tabs__tab[aria-selected='true'] {
    background-color: ${({ theme }) => theme.successColor};
    color: ${({ theme }) => theme.white};
  }
`;

export const OverViewHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
`;

export const OverViewDate = styled.div`
  display: flex;
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  align-items: center;
`;

export const OverViewSorted = styled.div`
  display: flex;
  flex: 2;
  width: 100%;
  justify-content: end;
`;

export const OverViewTab = styled(Tab)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 100%;
  margin: 0 10px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  &:hover {
    background-color: ${({ theme }) => theme.successColor};
    color: ${({ theme }) => theme.white};
  }
`;

export const IndexCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  width: 40px;
  margin-left: 10px;
  color: ${({ theme }) => theme.textColor};
`;

export const OverViewContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;
export const Cards = styled(Card)`
  margin: 15px;
  
`;
export const CardWrapper = styled(CardBody)`
  display: flex;
  align-items: center;
  height: 50px;
`;
export const CardTitle = styled.div`
  display: flex;
  flex: 3;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  height: 100%;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: end;
  align-items: center;
  margin: 0 20px;
`;
export const CardAvatar = styled(CommonAvatar)`
  display: flex;
`;

export const CardBadge = styled(Badge)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  margin: 0 10px;
  background-color: ${({ color }) => {
    switch (color) {
      case 'TODO':
        return theme.errorColor;
      case 'IN_PROGRESS':
        return theme.primary;
      case 'DONE':
        return theme.successColor;
      default:
        return theme.labelColor;
    }
  }};
  color: ${({ theme }) => theme.white};
`;
