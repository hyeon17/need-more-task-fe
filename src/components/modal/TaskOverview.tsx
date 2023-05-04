import React from 'react';
import { Avatar, Heading, Modal, ModalBody, ModalHeader, ModalOverlay, Stack, Tag, Text } from '@chakra-ui/react';
import { useModalState } from '@/store/modalStore';
import { motion, Variants } from 'framer-motion';
import * as S from '@/styles/modal.styles';
import { actionConstants, PriorityType, StatusType } from '@/constant/TaskOverview';

const overlayVariants: Variants = {
  initial: { opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)' },
  animate: { backgroundColor: 'rgba(0, 0, 0, 0.7)', opacity: 1 },
  exit: { opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)' },
};

function TaskOverview() {
  const { modal, id, onCloseModal } = useModalState();
  const setTagColor = (value: string) => {
    switch (value) {
      case StatusType.TODO:
        return 'errorColor';
      case StatusType.IN_PROGRESS:
        return 'warningColor';
      case StatusType.DONE:
        return 'successColor';
      case PriorityType.URGENT:
        return 'errorColor';
      case PriorityType.HIGH:
        return 'warningColor';
      case PriorityType.MEDIUM:
        return 'successColor';
      case PriorityType.LOW:
        return 'primary';
      default:
        return 'labelColor';
    }
  };
  return (
    <S.ModalContentBox>
      <Stack>
        <ModalHeader textAlign="center">Task OverView</ModalHeader>
        <ModalBody display="flex" width="100%" minHeight="63vh" p="0" borderTop="1px solid" borderColor="outlineColor">
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
          <S.ModalTaskActionBox>
            {Object.values(actionConstants).map((item) => (
              <div className="action" key={item.key}>
                <Heading fontSize="1rem">{item.key}</Heading>
                {item.value && (
                  <Tag size="lg" backgroundColor={setTagColor(item.value)} color="white">
                    {item.value}
                  </Tag>
                )}
              </div>
            ))}
          </S.ModalTaskActionBox>
        </ModalBody>
      </Stack>
    </S.ModalContentBox>
  );
}

export default TaskOverview;
