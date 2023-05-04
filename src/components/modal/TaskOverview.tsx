import React from 'react';
import { Avatar, Heading, Modal, ModalBody, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { useModalState } from '@/store/modalStore';
import { motion, Variants } from 'framer-motion';
import * as S from '@/styles/modal.styles';

const overlayVariants: Variants = {
  initial: { opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)' },
  animate: { backgroundColor: 'rgba(0, 0, 0, 0.7)', opacity: 1 },
  exit: { opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)' },
};

type actionConstantsType = {
  DUE_DATE: string;
  SET_PRIORITY: string;
  DELETE_TASK: string;
};

const actionConstants = {};

function TaskOverview() {
  const { modal, id, onCloseModal } = useModalState();
  return (
    <Modal isOpen={modal} onClose={onCloseModal} key={id} motionPreset="slideInBottom" isCentered>
      <ModalOverlay
        as={motion.div}
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        backdropFilter="blur(5px)"
      />
      <S.ModalContentBox>
        <Stack>
          <ModalHeader textAlign="center">Task OverView</ModalHeader>
          <ModalBody
            display="flex"
            width="100%"
            minHeight="63vh"
            p="0"
            borderTop="1px solid"
            borderColor="outlineColor"
          >
            <S.ModalTaskContentBox>
              <div className="title">
                <Heading fontSize="1.4rem">Title</Heading>
                <Text fontSize="1rem">Assigned to</Text>
                <div className="avatar">
                  {[1, 2, 3].map((item) => (
                    <Avatar size="xs" key={item} />
                  ))}
                </div>
              </div>
              <div className="desc">
                <Heading fontSize="1.4rem">Description</Heading>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur aut culpa delectus
                  distinctio eum eveniet, illum impedit in inventore nihil qui quibusdam, reiciendis saepe sit velit
                  voluptatem. Soluta, tempore?
                </Text>
              </div>
            </S.ModalTaskContentBox>
            <S.ModalTaskActionBox></S.ModalTaskActionBox>
          </ModalBody>
        </Stack>
      </S.ModalContentBox>
    </Modal>
  );
}

export default TaskOverview;
