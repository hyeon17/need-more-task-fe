import { useModalState } from '@/store/modalStore';
import {
  Avatar,
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
import { actionConstants, actionConstantsType } from '@/constant/TaskOverview';
import { useForm } from 'react-hook-form';

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

const createActionConstant: CreateTaskProps = {
  ...actionConstants,
  CREATE_TASK: {
    key: 'CREATE_TASK',
    value: '생성하기',
  },
};

function CreateTask() {
  const { modal, id, onCloseModal } = useModalState();
  const [title, setTitle] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskForm>();

  console.log(errors);

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
                    {[1, 2, 3].map((item) => (
                      <Avatar size="xs" key={item} />
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
