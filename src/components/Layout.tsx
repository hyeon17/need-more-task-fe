import React from 'react';
import styled from '@emotion/styled';
import CommonHeader from './CommonHeader/CommonHeader';
import { useModalState } from '@/store/modalStore';
import TaskOverview from '@/components/modal/TaskOverview';
import { AnimatePresence } from 'framer-motion';
import ModalLayout from '@/components/modal/ModalLayout';

const LayoutComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  max-width: 1200px;
`;

function Layout({ children, hasHeader }: { children: React.ReactNode; hasHeader?: boolean }) {
  const { modal } = useModalState();
  return (
    <LayoutComponent>
      {hasHeader && <CommonHeader />}
      <main>{children}</main>
      <AnimatePresence>{modal && <ModalLayout />}</AnimatePresence>
    </LayoutComponent>
  );
}

export default Layout;
