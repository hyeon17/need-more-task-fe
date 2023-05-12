import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const BodyContainer = styled.main`
  min-width: 1200px;
  padding: 0 60px;

  & header {
    & > div {
      display: flex;
      justify-content: space-between;

      & button {
        font-size: 14px;
        font-weight: 700;
      }
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      line-height: 36px;
    }
    p {
      color: ${({ theme }) => theme.labelColor};
    }
  }
`;

export const FooterContainer = styled.footer`
  margin-top: 50px;
  background-color: ${({ theme }) => theme.gray50};
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
`;
export const FooterLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;
    gap: 24px;

    a {
      display: flex;
      align-items: center;
      gap: 6px;

      span {
        font-size: 14px;
        font-weight: 700;
        line-height: 18px;
      }
    }
  }
`;
export const FooterRight = styled.div``;

// task status
export const TaskStatusContainer = styled.div`
  margin-top: 36px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TaskDoneContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.outlineColor};
  border-radius: 12px;
  width: 340px;
  height: 120px;
  padding: 24px;

  display: flex;
  align-items: center;
`;
export const StatusLeft = styled.div`
  margin-right: 16px;
`;
export const StatusRight = styled.div`
  /* border: 1px solid; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & h5 {
    font-weight: 700;
    line-height: 24px;
    color: ${({ theme }) => theme.textColor};
  }

  & span {
    font-size: 14px;
    line-height: 21px;
    color: ${({ theme }) => theme.labelColor};
  }
`;
export const StatusNumber = styled.div``;
export const StatusGraphWrapper = styled.div`
  /* border: 1px solid; */

  width: 100px;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SpinnerWrapper = styled.div`
  margin-left: 100px;
`;

// Projects performance
export const PerformanceContainer = styled.div`
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.outlineColor};
  border-radius: 16px;

  width: 100%;
  height: 424px;
`;

// Latest projects
export const LatestProjectContainer = styled.div`
  width: 1100px;
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.outlineColor};
  border-radius: 16px;

  /* width: 100%; */
  height: 350px;
`;
export const DashboardH5 = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.outlineColor};

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h5 {
    font-weight: 700;
    line-height: 24px;
  }
`;
export const LatestProjectButtonWrapper = styled.div`
  display: flex;
  gap: 10px;

  & > button {
    font-weight: 700;
    font-size: 12px;
    line-height: 21px;
  }
`;
export const PerformanceBodyWrapper = styled.div`
  padding: 22px 24px;
`;

export const PerformanceBodyHeader = styled.div`
  display: flex;
  gap: 24px;
`;
export const FlagWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
export const Flag = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 3px;
`;
export const AssignedFlag = styled(Flag)`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #3e7eff;
`;
export const DoneFlag = styled(Flag)`
  background-color: ${({ theme }) => theme.primary};
`;
export const FlagTitle = styled.span`
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
`;

// PerformanceGraph
export const PerformanceGraphWrapper = styled.div`
  /* border: 1px solid; */
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// popover
export const StyledPopover = styled(Popover)`
  & .chakra-popover__popper {
    width: 134px;
  }

  &.chakra-popover__body {
    width: 134px;
  }
`;

// export const StyledPopoverContent = styled(PopoverContent)`
//   /* width: 134px;
//   height: 60px; */
//   background-color: ${({ theme }) => theme.white};
//   border-color: ${({ theme }) => theme.white};
//   border-radius: 2px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// export const StyledPopoverBody = styled(PopoverBody)`
//   padding: 8px 20px;
//   display: flex;
//   text-align: center;
//   color: ${({ theme }) => theme.textColor};
// `;
export const StyledPopoverBody = styled(PopoverBody)`
  display: flex;
  justify-content: center;

  /* padding: 8px; */
  box-shadow: 0px 8px 15px rgba(152, 169, 188, 0.267182);

  & > div {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;

    & > header {
      color: ${({ theme }) => theme.labelColor};
      font-size: 14px;
      margin-bottom: 3px;
    }

    span {
      font-weight: 700;
      font-size: 14px;
    }
  }
`;

// latest projects empty
export const EmptyProjects = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const LottieWrapper = styled.div`
  width: 200px;
  height: 100px;
`;
export const CreateTaskButton = styled(Button)`
  margin-top: 100px;
`;

export const LatestProjectsListContainer = styled.div`
  /* border: 1px solid; */

  display: flex;
  /* justify-content: center;
  align-items: center; */
  gap: 24px;
  padding: 20px 24px;

  /* scroll-snap-type: x mandatory; */
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.outlineColor};
    border-radius: 6px;
  }
`;
export const LatestProjectsListWrapper = styled.div`
  scroll-snap-align: start;

  border: 1px solid ${({ theme }) => theme.outlineColor};
  border-radius: 10px;
`;
export const ProjectsListBodyWrapper = styled.div`
  padding: 16px 16px 32px;
  width: 348px;
  cursor: pointer;
`;
export const ProjectsListBodyHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & > span {
    font-size: 12px;
    & > strong {
      font-weight: 700;
    }
  }
`;
export const ProjectsListBody = styled.div`
  margin-top: 25px;

  display: flex;
`;
export const ProjectsImageDiv = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.gray50};
`;
export const ProjectTitleWrapper = styled.div`
  margin-left: 14px;

  & > h5 {
    font-weight: 700;
    line-height: 24px;
    color: ${({ theme }) => theme.textColor};
  }

  & > span {
    display: flex;
    gap: 3px;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: ${({ theme }) => theme.labelColor};
  }
`;
export const ProjectListFooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 18px 20px;
  background-color: ${({ theme }) => theme.gray50};

  & > footer {
    display: flex;
    gap: 20px;
    font-size: 14px;
    line-height: 21px;
    color: ${({ theme }) => theme.labelColor};
  }
`;
