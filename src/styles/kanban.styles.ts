import styled from '@emotion/styled';
import { Card, CardBody } from '@chakra-ui/react';

export const KanbanTaskItem = styled(Card)`
  width: 320px;
  padding: 1rem;
`;

export const KanbanTaskItemDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
`;

export const KanbanTaskItemProfile = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.gray50};
`;

export const KanbanTaskItemCardBody = styled(CardBody)`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const KanbanTaskDueDate = styled.div<{ isDue: boolean }>`
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme, isDue }) => (isDue ? theme.warningColor : theme.gray50)};
`;
