import { useModalState } from '@/store/modalStore';
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
  Text,
  Textarea,
} from '@chakra-ui/react';
import * as S from '@/styles/modal.styles';
import React, { useState } from 'react';
import { actionConstantsType } from '@/constant/TaskOverview';
import { useForm } from 'react-hook-form';
import { Assignee } from '@/apis/kanban';
import CommonAvatar from '@/components/CommonAvatar/CommonAvatar';

interface CreateTaskForm {
  title: string;
  description: string;
}

interface CreateTaskProps extends actionConstantsType {
  CREATE_TASK: {
    key: string;
    value: string;
  };
}

const actionConstants: actionConstantsType = {
  DUE_DATE: {
    key: 'Due Date',
    value: 'Due Date',
  },
  ASSIGNEE: {
    key: 'Assignee',
  },
  SET_STATUS: {
    key: 'Set Status',
  },
  SET_PRIORITY: {
    key: 'Set Priority',
  },
  DELETE_TASK: {
    key: 'Delete Task',
  },
};

const createActionConstant: CreateTaskProps = {
  ...actionConstants,
  CREATE_TASK: {
    key: 'CREATE_TASK',
    value: 'Create Task',
  },
};

function CreateTask() {
  const {} = useModalState();
  const [title, setTitle] = useState('');
  const [avatar, setAvatar] = useState<Assignee[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskForm>();

  const onSubmit = (data: CreateTaskForm) => {};
  const onTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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
                    {avatar.length === 0 && <Text fontSize="1rem">지정된 사람이 없습니다</Text>}
                    {avatar.map((item) => (
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
                {Object.values(createActionConstant).map((item) => {
                  if (item.key === 'CREATE_TASK') {
                    return (
                      <Button type="submit" colorScheme="blue" key={item.key}>
                        {item.value}
                      </Button>
                    );
                  }
                  return (
                    <div className="action" key={item.key}>
                      <Heading fontSize="1rem">{item.key}</Heading>
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
