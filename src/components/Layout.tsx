import React from 'react';
import styled from '@emotion/styled';

const LayoutComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 1200px;
`;

function Layout({ children, hasHeader }: { children: React.ReactNode; hasHeader?: boolean }) {
  return (
    <LayoutComponent>
      {hasHeader && <header>Header</header>}
      <main>{children}</main>
    </LayoutComponent>
  );
}

export default Layout;
