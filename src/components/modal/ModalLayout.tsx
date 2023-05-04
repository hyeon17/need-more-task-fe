import React from 'react';
import CreateTask from '@/components/modal/CreateTask';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useModalState } from '@/store/modalStore';
import TaskOverview from '@/components/modal/TaskOverview';

function ModalLayout() {
  const { modal, id, onCloseModal } = useModalState();
  return (
    <Modal isOpen={!!modal} onClose={onCloseModal} key={id} motionPreset="slideInBottom" isCentered>
      <ModalOverlay as={motion.div} initial="initial" animate="animate" exit="exit" backdropFilter="blur(5px)" />
      {modal === 'create' && <CreateTask />}
      {modal === 'overview' && <TaskOverview />}
      {modal === null && <div>Modal is null</div>}
    </Modal>
  );
}

export default ModalLayout;
