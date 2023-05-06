import styled from '@emotion/styled';

export const BodyContainer = styled.main`
  min-width: 1200px;
  padding: 0 60px;

  & header {
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
  margin-top: 36px;
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
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.outlineColor};
  border-radius: 16px;

  width: 100%;
  height: 316px;
`;
export const DashboardH5 = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.outlineColor};

  h5 {
    font-weight: 700;
    line-height: 24px;
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
  border: 1px solid;
  margin-top: 20px;
`;
