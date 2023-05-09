import styled from '@emotion/styled';
import { Button, ModalContent, Stack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

export const ModalContentBox = styled(ModalContent)`
  min-width: 55%;
  min-height: 65%;
  header {
    font-size: 1.5rem;
  }
`;

export const ModalTaskContentBox = styled(Stack)`
  min-width: 55%;
  padding: 5rem 1rem;
  justify-content: start;
  align-items: start;
  gap: 3rem;
  flex-direction: column;
  .title {
    width: 100%;
    padding: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 1rem;
    .avatar {
      display: flex;
      gap: 0.2rem;
    }
  }
  .desc {
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 1rem;
    line-break: auto;
    p {
      white-space: pre-wrap;
      width: 50%;
    }
  }
`;

export const ModalTaskActionBox = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 3rem;
  flex-grow: 2;
  width: 100%;
  background-color: ${({ theme }) => theme.gray50};
  padding: 1rem 2rem;
  .action {
    display: flex;
    align-items: start;
    width: 100%;
    gap: 0.5rem;
    flex-direction: column;
    cursor: pointer;
  }
`;

export const ModalTaskActionSelectBox = styled(Select)`
  width: 100%;
  & #react-select-3-placeholder {
    color: ${({ theme }) => theme.labelColor};
  }
`;

export const ModalTaskDeleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.errorColor};
  color: ${({ theme }) => theme.white};
  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;
