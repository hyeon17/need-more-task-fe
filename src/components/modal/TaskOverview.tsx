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
import { useRouter } from 'next/router';
import CommonToolTip from '@/components/common/CommonToolTip';

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
  const { id, onCloseModal } = useModalState();
  const { data, refetch } = useQuery(['task', id], () => getTaskDetail(Number(id)));
  const [modalAction, setModalAction] = useState<actionType | null>(null);
  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [editAssignee, setEditAssignee] = useState(false);

  const { userInfo } = useUserInfo();
  const { mutate } = useMutation(putTaskDetail, {
    onSuccess: async () => {
      await refetch();
    },
  });

  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  const router = useRouter();

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

  const handleAssigneeEdit = () => {
    if (editAssignee) {
      setEditAssignee(false);
    } else {
      setEditAssignee(true);
      toast({
        title: '할당 해제할 인원을 클릭해주세요.',
        status: 'info',
        duration: 1500,
      });
    }
  };

  const handleEditAssignee = (userId: number) => {
    if (!editAssignee) {
      onCloseModal();
      router.push(`/profile/${userId}`);
    } else {
      const copiedData = { ...data.data };
      const assignee = copiedData.assignee.filter((item) => item.userId !== userId);
      mutate({ taskId: Number(id), data: { ...copiedData, assignee } });
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
                <Text
                  contentEditable={editTitle}
                  ref={titleRef}
                  suppressContentEditableWarning
                  borderBottom={editTitle ? '2px solid #EF8354' : 'none'}
                >
                  {title}
                </Text>
                <Button size="sm" onClick={handleTitleEdit}>
                  {editTitle ? '완료' : '수정'}
                </Button>
              </Heading>
              <Text fontSize="1rem">
                할당된 사람
                <Button size="sm" onClick={handleAssigneeEdit} marginLeft="5">
                  {editAssignee ? '완료' : '수정'}
                </Button>
              </Text>
              <div className="avatar">
                {assignee.map((item) => (
                  <CommonToolTip toolTip={item.fullName} key={item.userId}>
                    <Avatar
                      size="sm"
                      src={item.profileImageUrl}
                      cursor={editAssignee ? 'pointer' : 'default'}
                      onClick={() => handleEditAssignee(item.userId)}
                    />
                  </CommonToolTip>
                ))}
              </div>
            </div>
            <div className="desc">
              <Heading fontSize="1.4rem">Description</Heading>
              <Text
                ref={descRef}
                contentEditable={editDesc}
                suppressContentEditableWarning
                borderBottom={editDesc ? '2px solid #EF8354' : 'none'}
              >
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
