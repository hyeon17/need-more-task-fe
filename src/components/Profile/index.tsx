import React, { FormEventHandler, useMemo, useState } from 'react';
import { AccountInfoProps, IJoin, IUser } from '@/type/authTypes';
import StepOne from '../Auth/Join/StepOne';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { teamOptions, getJoinCompanyYear } from '@/utils';
import * as A from '@/styles/auth.styles';
import * as P from '@/styles/profile.styles';
import { useForm } from 'react-hook-form';
import { isDuplicatedEmailAPI, validatePasswordAPI } from '@/apis/user';
import { AxiosError } from 'axios';
import CheckPasswordModal from './CheckPasswordModal';

interface IAccountInfo {
  userInfo: IUser;
  currentLoginUserInfo: IUser;
}

function AccountInfo({ userInfo, currentLoginUserInfo }: IAccountInfo) {
  // console.log('userInfo>>>', userInfo);
  // const { department, fullName, joinCompanyYear, email, phone, profileImageUrl } = userInfo;
  const { isOpen: isOpenCheckPassword, onOpen: onOpenCheckPassword, onClose: onCloseCheckPassword } = useDisclosure();

  const [edit, setEdit] = useState(false);
  // const [department, setDepartment] = useState('');
  // const [joinCompanyYear, setJoinCompanyYear] = useState('');
  const [department, setDepartment] = useState(userInfo?.department || '');
  const [joinCompanyYear, setJoinCompanyYear] = useState(userInfo?.joinCompanyYear?.toString() || '');

  const handleDepartmentChange = (selectedOption: unknown) => {
    setDepartment((selectedOption as { value: string }).value);
  };
  const handleJoinCompanyYearChange = (selectedOption: unknown) => {
    setJoinCompanyYear((selectedOption as { value: string }).value);
  };
  const findSelectedDepartment = (dept?: string) => {
    return teamOptions.find((option) => option.value === dept);
  };
  const findSelectedJoinCompanyYear = (year?: number) => {
    return getJoinCompanyYear().find((option) => option.value === year);
  };

  const joinCompanyYearOptions = useMemo(() => getJoinCompanyYear(), []);

  // 버튼
  const handleEditProfile = () => {
    // setEdit(true);
  };

  const handleCancelProfileSave = () => {
    setEdit(false);
    setDepartment(userInfo?.department || '');
    setJoinCompanyYear(userInfo?.joinCompanyYear?.toString() || '');
  };

  const toast = useToast();

  const onError = (error: AxiosError) => {
    console.error('error>>', error);

    toast({
      title: '이미 가입한 이메일 입니다.',
      // description: '알 수 없는 오류가 발생했습니다.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const onSuccess = () => {
    toast({
      title: '사용 가능한 이메일 입니다.',
      // description: '알 수 없는 오류가 발생했습니다.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const { mutate: isDuplicatedEmailMutate, isLoading } = isDuplicatedEmailAPI({ onSuccess, onError });

  const onSuccessCheckPassword = (data: any) => {
    console.log('checkpassword', data);

    onCloseCheckPassword();
    setEdit(true);

    toast({
      title: '비밀번호 확인 성공.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const onErrorCheckPassword = () => {
    toast({
      title: '비밀번호 확인 실패.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const { mutate: validatePasswordMutate, isLoading: isLoadingValidatePassword } = validatePasswordAPI({
    onSuccess: onSuccessCheckPassword,
    onError: onErrorCheckPassword,
  });

  const handleIsDuplicated = () => {
    console.log('중복확인');
    isDuplicatedEmailMutate(watch('email'));
  };

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>();

  const onClickSave = (data: IJoin) => {
    console.log('업데이트 data>>>', { ...data, department, joinCompanyYear });

    if (Object.keys(errors).length === 0) {
      // 저장 api
      console.log('저장');
      setEdit(false);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    // handleSubmit(onClickSave)();
    handleSubmit(onClickSave)();
  };

  return (
    <form onSubmit={onSubmit}>
      <P.AccountWrapper>
        <h1>계정 정보</h1>
        {/* department */}

        <A.InputContainer>
          <FormControl isRequired>
            <label>현재 소속 팀은 어디인가요?</label>
            <A.StyledSelect
              instanceId="team-select"
              aria-live="polite"
              name="teams"
              options={teamOptions}
              placeholder="팀 선택"
              closeMenuOnSelect={true}
              size="sm"
              value={findSelectedDepartment(department || userInfo?.department)}
              onChange={handleDepartmentChange}
              isDisabled={!edit}
              // isReadOnly={!edit}
              // isInvalid={!edit}
              isRequired
            />
          </FormControl>
        </A.InputContainer>

        {/* 입사연도 선택 */}
        <A.InputContainer>
          <FormControl isRequired>
            <label>입사 연도는 언제인가요?</label>
            <A.StyledSelect
              instanceId="join-year-select"
              aria-live="polite"
              name="join year"
              options={joinCompanyYearOptions}
              placeholder="입사 연도 선택"
              closeMenuOnSelect={true}
              size="sm"
              // defaultValue={userInfo?.joinCompanyYear || ''}
              value={findSelectedJoinCompanyYear(parseInt(joinCompanyYear || userInfo?.joinCompanyYear))}
              onChange={handleJoinCompanyYearChange}
              isDisabled={!edit}
              // isReadOnly={!edit}
              // isInvalid={!edit}
              isRequired
            />
          </FormControl>
        </A.InputContainer>

        {/* 이름 */}
        <A.InputContainer>
          <FormControl isInvalid={Boolean(errors.fullName)}>
            <FormLabel htmlFor="fullName">이름</FormLabel>
            <Input
              isDisabled={!edit}
              value={watch('fullName') || userInfo?.fullName}
              // value={watch('fullName')}
              // defaultValue={userInfo?.fullName || watch('fullName')}
              id="fullName"
              placeholder="이름을 입력하세요"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              {...register('fullName', {
                required: '이름은 필수 입력사항 입니다.',
                maxLength: {
                  value: 20,
                  message: '이름이 20자가 넘으시나요? 관리자에게 연락하세요.',
                },
              })}
            />
            <FormErrorMessage>{errors.fullName && errors.fullName?.message?.toString()}</FormErrorMessage>
          </FormControl>
        </A.InputContainer>

        {/* 이메일 */}
        <A.InputContainer>
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor="email">이메일</FormLabel>
            <InputGroup size="md" variant="flushed">
              <Input
                isDisabled={!edit}
                id="email"
                placeholder="이메일을 입력하세요"
                pr="4.5rem"
                variant="flushed"
                borderColor="outlineColor"
                focusBorderColor="inputFocusColor"
                defaultValue={userInfo?.email || ''}
                {...register('email', {
                  required: '이메일은 필수 입력사항입니다.',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: '유효한 이메일 주소를 입력하세요.',
                  },
                  maxLength: {
                    value: 50,
                    message: '이메일 주소가 너무 깁니다.',
                  },
                })}
              />
              {edit ? (
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleIsDuplicated} isLoading={isLoading}>
                    중복 확인
                  </Button>
                </InputRightElement>
              ) : (
                ''
              )}
            </InputGroup>
            <FormErrorMessage>{errors.email && errors.email?.message?.toString()}</FormErrorMessage>
          </FormControl>
        </A.InputContainer>
      </P.AccountWrapper>

      {/* Edit 버튼 */}
      {userInfo?.userId === currentLoginUserInfo?.userId && (
        <P.ButtonWrapper>
          {edit ? (
            <P.UpdateButton
              colorScheme="teal"
              size="md"
              color="white"
              type="button"
              onClick={handleSubmit(onClickSave)}
            >
              저장
            </P.UpdateButton>
          ) : (
            <CheckPasswordModal
              isOpenCheckPassword={isOpenCheckPassword}
              onOpenCheckPassword={onOpenCheckPassword}
              onCloseCheckPassword={onCloseCheckPassword}
              validatePasswordMutate={validatePasswordMutate}
              isLoadingValidatePassword={isLoadingValidatePassword}
            >
              <P.UpdateButton colorScheme="teal" size="md" color="white" onClick={handleEditProfile}>
                프로필 업데이트
              </P.UpdateButton>
            </CheckPasswordModal>
          )}

          <P.CancelButton color="labelColor" onClick={handleCancelProfileSave}>
            취소
          </P.CancelButton>
        </P.ButtonWrapper>
      )}
    </form>
  );
}

export default AccountInfo;
