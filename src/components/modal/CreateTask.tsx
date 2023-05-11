import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  ModalBody,
  ModalHeader,
  Stack,
  Tag,
  Text,
  Textarea,
} from '@chakra-ui/react';
import * as S from '@/styles/modal.styles';
import React, { useState } from 'react';
import { actionConstantsType, actionType } from '@/constant/TaskOverview';
import { useForm } from 'react-hook-form';
import CommonAvatar from '@/components/CommonAvatar/CommonAvatar';
import { getKeyByValue, setActionTextToKorean, setTagColor } from '@/utils';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import ModalActionComponent from '@/components/modal/ModalActionComponent';
import { postTaskDetail } from '@/apis/task';
import { useMutation } from '@tanstack/react-query';

export interface CreateTaskForm {
  title: string;
  description: string;
}

export interface CreateTaskProps extends actionConstantsType {
  START_AT: {
    key: string;
    value?: Date;
  };
  CREATE_TASK: {
    key: string;
    value: string;
  };
}

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

const actionConstants: actionConstantsType = {
  END_AT: {
    key: 'END_AT',
  },
  ASSIGNEE: {
    key: 'ASSIGNEE',
    value: [],
  },
  SET_STATUS: {
    key: 'SET_STATUS',
  },
  SET_PRIORITY: {
    key: 'SET_PRIORITY',
  },
};

function CreateTask() {
  const createActionConstant: CreateTaskProps = {
    START_AT: {
      key: 'START_AT',
    },
    ...actionConstants,
    CREATE_TASK: {
      key: 'CREATE_TASK',
      value: 'Create Task',
    },
  };

  const [title, setTitle] = useState('');
  const [modalAction, setModalAction] = useState<actionType | null>(null);
  const [taskStatus, setTaskStatus] = useState<CreateTaskProps>(createActionConstant);
  const { mutate } = useMutation(postTaskDetail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskForm>();

  const onSubmit = (data: CreateTaskForm) => {
    const { title, description: desc } = data;
    const { SET_STATUS, SET_PRIORITY, START_AT, END_AT } = taskStatus;
    const progress = SET_STATUS.value;
    const priority = SET_PRIORITY.value;
    const startAt = START_AT.value;
    const endAt = END_AT.value;
    const payload = {
      title,
      desc,
      progress,
      priority,
      startAt,
      endAt,
      assignee: [{ userId: 1 }],
    };
    console.log(taskStatus);
    console.log(payload);
    // @ts-ignore
    mutate(payload);
  };
  const onTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const setTaskStatusHandler = (e: unknown) => {
    // @ts-ignore
    if (e.key) {
      // @ts-ignore
      const { key, value } = e;
      setTaskStatus((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          value,
        },
      }));
    }

    // @ts-ignore
    if (e.target) {
      // @ts-ignore
      const { value } = e.target;
      // @ts-ignore
      const key = e.target.id;
      setTaskStatus((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          value,
        },
      }));
    }
  };

  return (
    <S.ModalContentBox>
      <Stack>
        <ModalHeader textAlign="center">Create Task</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.title}>
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
                  <FormLabel htmlFor="title" fontWeight="bold" fontSize="1.5rem">
                    {title === '' ? '제목을 입력해 주세요' : title}
                  </FormLabel>
                  <Input
                    type="text"
                    id="title"
                    variant="flushed"
                    {...register('title', {
                      required: '제목은 반드시 있어야 합니다',
                      onChange: onTitleInputChange,
                      maxLength: {
                        value: 30,
                        message: '제목은 30자 이내로 입력해 주세요',
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.title && errors?.title?.message}</FormErrorMessage>
                  <Heading fontSize="1rem">지정된 사람 목록</Heading>
                  <div className="avatar">
                    {taskStatus.ASSIGNEE.value?.length === 0 && <Text fontSize="1rem">지정된 사람이 없습니다</Text>}
                    {taskStatus.ASSIGNEE.value?.map((item) => (
                      <CommonAvatar assignee={item} key={item.userId} size="sm" max={9} />
                    ))}
                  </div>
                </div>
                <div className="desc">
                  <FormLabel htmlFor="description" fontWeight="bold" fontSize="1.5rem">
                    설명
                  </FormLabel>
                  <Textarea
                    id="description"
                    variant="flushed"
                    placeholder="설명을 입력해 주세요"
                    {...register('description', {
                      required: '설명은 반드시 있어야 합니다',
                      maxLength: {
                        value: 100,
                        message: '설명은 100자 이내로 입력해 주세요',
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.description && errors?.description?.message}</FormErrorMessage>
                </div>
              </S.ModalTaskContentBox>
              <S.ModalTaskActionBox>
                {Object.values(taskStatus).map((item) => {
                  if (item.key === 'CREATE_TASK') {
                    return (
                      <Button type="submit" colorScheme="blue" key={item.key}>
                        {setActionTextToKorean(item.key)}
                      </Button>
                    );
                  }
                  return (
                    <div
                      key={item.key}
                      className="action"
                      onClick={() => setModalAction(getKeyByValue(taskStatus, item) as actionType)}
                    >
                      <Heading fontSize="1rem">{setActionTextToKorean(item.key)}</Heading>
                      <AnimatePresence>
                        {modalAction === item.key ? (
                          <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
                            <ModalActionComponent
                              key={item.key}
                              action={modalAction!}
                              setTaskStatusHandler={setTaskStatusHandler}
                            />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                      {typeof item.value !== 'object' && item.value && (
                        <Tag size="lg" backgroundColor={setTagColor(item.value)} color="white">
                          {item.value}
                        </Tag>
                      )}
                    </div>
                  );
                })}
              </S.ModalTaskActionBox>
            </ModalBody>
          </FormControl>
        </form>
      </Stack>
    </S.ModalContentBox>
  );
}

export default CreateTask;
