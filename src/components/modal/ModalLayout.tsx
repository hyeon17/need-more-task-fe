import React from 'react';
import CreateTask from '@/components/modal/CreateTask';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import { useModalState } from '@/store/modalStore';
import TaskOverview from '@/components/modal/TaskOverview';

const overlayVariants: Variants = {
  initial: { opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)' },
  animate: { backgroundColor: 'rgba(0, 0, 0, 0.7)', opacity: 1 },
  exit: { opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)' },
};

function ModalLayout() {
  const { modal, id, onCloseModal } = useModalState();
  return (
    <Modal isOpen={!!modal} onClose={onCloseModal} key={id} motionPreset="slideInBottom" isCentered>
      <ModalOverlay
        as={motion.div}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={overlayVariants}
        backdropFilter="blur(5px)"
      />
      {modal === 'create' && <CreateTask />}
      {modal === 'overview' && <TaskOverview />}
      {modal === null && <div>Modal is null</div>}
    </Modal>
  );
}

export default ModalLayout;
