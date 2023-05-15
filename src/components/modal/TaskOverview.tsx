import React, { useRef, useState } from 'react';
import { Avatar, Button, Heading, ModalBody, ModalHeader, Stack, Tag, Text, useToast } from '@chakra-ui/react';
import { useModalState } from '@/store/modalStore';
import * as S from '@/styles/modal.styles';
import { actionConstantsType, actionType, PriorityType, StatusType } from '@/constant/TaskOverview';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTaskDetail, putTaskDetail } from '@/apis/task';
import { getKeyByValue, setActionTextToKorean, setTagColor, setTagTextToKorean } from '@/utils';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import ModalEditComponent from '@/components/modal/ModalEditComponent';
import { useUserInfo } from '@/store/userInfoStore';

const variants: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -20,
  },
};

function TaskOverview() {
  const { id } = useModalState();
  const { data, refetch } = useQuery(['task', id], () => getTaskDetail(Number(id)));
  const [modalAction, setModalAction] = useState<actionType | null>(null);
  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const { userInfo } = useUserInfo();
  const { mutate } = useMutation(putTaskDetail);

  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  const toast = useToast();

  if (!data) return null;

  const { title, desc, assignee, endAt, progress, priority, taskOwner, startAt } = data.data;

  const handleTitleEdit = () => {
    if (editTitle) {
      const title = titleRef.current?.innerText;
      const copiedData = { ...data.data };
      if (!title) {
        titleRef.current!.textContent = data.data.title;
        return toast({
          title: '제목을 입력해주세요.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      setEditTitle(false);
      mutate({ taskId: Number(id), data: { ...copiedData, title } });
    } else {
      setEditTitle(true);
      titleRef.current?.focus();
    }
  };

  const handleDescEdit = () => {
    if (editDesc) {
      const desc = descRef.current?.innerText;
      const copiedData = { ...data.data };
      if (!desc) {
        descRef.current!.textContent = data.data.desc;
        return toast({
          title: '내용을 입력해주세요.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      setEditDesc(false);
      mutate({ taskId: Number(id), data: { ...copiedData, desc } });
    } else {
      setEditDesc(true);
      descRef.current?.focus();
    }
  };

  const actionConstants: actionConstantsType = {
    START_AT: {
      key: 'START_AT',
      value: startAt,
    },
    END_AT: {
      key: 'END_AT',
      value: endAt,
    },
    ASSIGNEE: {
      key: 'ASSIGNEE',
    },
    SET_STATUS: {
      key: 'SET_STATUS',
      value: progress as StatusType,
    },
    SET_PRIORITY: {
      key: 'SET_PRIORITY',
      value: priority as PriorityType,
    },
  };
  if (userInfo?.userId === taskOwner.userId) {
    actionConstants.DELETE_TASK = {
      key: 'DELETE_TASK',
    };
  }

  return (
    <S.ModalContentBox>
      <Stack>
        <ModalHeader textAlign="center">{title}</ModalHeader>
        <ModalBody display="flex" width="100%" minHeight="63vh" p="0" borderTop="1px solid" borderColor="outlineColor">
          <S.ModalTaskContentBox>
            <div className="title">
              <Heading fontSize="1.4rem" display="flex" gap="10">
                <Text contentEditable={editTitle} ref={titleRef} suppressContentEditableWarning>
                  {title}
                </Text>
                <Button size="sm" onClick={handleTitleEdit}>
                  {editTitle ? '완료' : '수정'}
                </Button>
              </Heading>
              <Text fontSize="1rem">Assigned to</Text>
              <div className="avatar">
                {assignee.map((item) => (
                  <Avatar size="xs" key={item.userId} src={item.profileImageUrl} />
                ))}
              </div>
            </div>
            <div className="desc">
              <Heading fontSize="1.4rem">Description</Heading>
              <Text ref={descRef} contentEditable={editDesc} suppressContentEditableWarning>
                {desc}
              </Text>
              <Button size="sm" onClick={handleDescEdit}>
                {editDesc ? '완료' : '수정'}
              </Button>
            </div>
          </S.ModalTaskContentBox>
          <S.ModalTaskActionBox>
            {Object.values(actionConstants).map((item) => (
              <div
                key={item.key}
                className="action"
                onClick={() => setModalAction(getKeyByValue(actionConstants, item) as actionType)}
              >
                <Heading fontSize="1rem">{setActionTextToKorean(item.key)}</Heading>
                <AnimatePresence>
                  {modalAction === item.key ? (
                    <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
                      <ModalEditComponent
                        id={Number(id)}
                        action={modalAction}
                        taskData={{
                          title,
                          desc,
                          assignee,
                          endAt,
                          startAt,
                          progress,
                          priority,
                        }}
                        refetch={refetch}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                {typeof item.value !== 'object' && item.value && (
                  <Tag size="lg" backgroundColor={setTagColor(item.value)} color="white">
                    {setTagTextToKorean(item.value)}
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
