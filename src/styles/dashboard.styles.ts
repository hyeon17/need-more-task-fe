import styled from '@emotion/styled';

export const BodyContainer = styled.main`
  border: 1px solid;

  min-width: 1200px;
  padding: 0 120px;

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
  border: 1px solid;
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
