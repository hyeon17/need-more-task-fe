import React, { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { AccountInfoProps, IJoin, IUpdateProfile, IUser } from '@/type/authTypes';
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
import { isDuplicatedEmailAPI, updateUserInfoAPI, validatePasswordAPI } from '@/apis/user';
import { AxiosError } from 'axios';
import CheckPasswordModal from './CheckPasswordModal';

interface IAccountInfo {
  userInfo: IUser;
  currentLoginUserInfo: IUser;
}

function AccountInfo({ userInfo, currentLoginUserInfo }: IAccountInfo) {
  // const { department, fullName, joinCompanyYear, email, phone, profileImageUrl } = userInfo;
  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>();
  const [edit, setEdit] = useState(false);
  const [fullNameValue, setFullNameValue] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const { isOpen: isOpenCheckPassword, onOpen: onOpenCheckPassword, onClose: onCloseCheckPassword } = useDisclosure();

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
    setFullNameValue(null);
    setEmailValue(null);
    setEdit(false);
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

  // const handleIsDuplicated = () => {
  //   console.log('중복확인');
  //   isDuplicatedEmailMutate(watch('email'));
  // };
  const onSuccessUpdateProfile = (data: any) => {
    console.log('data', data);
  };
  const onErrorUpdateProfile = (error: AxiosError) => {
    toast({
      title: '프로필 업데이트 실패.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };
  const { mutate: updateProfileMutate, isLoading: isLoadingUpdateProfile } = updateUserInfoAPI(userInfo?.userId, {
    onSuccess: onSuccessUpdateProfile,
    onError: onErrorUpdateProfile,
  });

  const onClickSave = (data: IUpdateProfile) => {
    // console.log('업데이트 data>>>', { ...data, department, joinCompanyYear });
    console.log('data>>', data);

    if (Object.keys(errors).length === 0) {
      setFullNameValue(watch('fullName'));
      setEmailValue(watch('email'));
      setEdit(false);
      updateProfileMutate(data);
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
        {/* 이메일 */}
        <A.InputContainer>
          <FormLabel htmlFor="email">이메일(이메일은 수정이 불가합니다.)</FormLabel>
          <Input
            isDisabled={true}
            // value={fullNameValue === null ? userInfo?.fullName || '' : fullNameValue}
            // value={watch('fullName')}
            defaultValue={userInfo?.email}
            id="email"
            variant="flushed"
            borderColor="outlineColor"
            focusBorderColor="inputFocusColor"
          />
        </A.InputContainer>

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
              // value={fullNameValue === null ? userInfo?.fullName || '' : fullNameValue}
              // value={watch('fullName')}
              defaultValue={userInfo?.fullName || watch('fullName')}
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

        {/* 새 비밀번호 */}
        <A.InputContainer>
          <FormControl isInvalid={Boolean(errors.password)}>
            <FormLabel htmlFor="password">새 비밀번호</FormLabel>
            <InputGroup size="md" variant="flushed">
              <Input
                isDisabled={!edit}
                id="password"
                placeholder="영어 소문자 6자~16자, (특수문자 . - 만 허용)"
                pr="4.5rem"
                variant="flushed"
                borderColor="outlineColor"
                focusBorderColor="inputFocusColor"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: '필수 입력사항 입니다.',
                  pattern: {
                    value: /^[a-zA-Z0-9.\-]{6,16}$/,
                    message: '영어 소문자 6자~16자, (특수문자 . - 만 허용)',
                  },
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                  {showPassword ? '보기' : '숨기기'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password && errors.password?.message?.toString()}</FormErrorMessage>
          </FormControl>
        </A.InputContainer>

        {/* 새 비밀번호 확인 */}
        <A.InputContainer>
          <FormControl isInvalid={Boolean(errors.confirmPassword)}>
            <FormLabel htmlFor="confirmPassword">새 비밀번호 확인</FormLabel>
            <InputGroup size="md" variant="flushed">
              <Input
                isDisabled={!edit}
                id="confirmPassword"
                placeholder="영어 소문자 6자~16자, (특수문자 . - 만 허용)"
                pr="4.5rem"
                variant="flushed"
                borderColor="outlineColor"
                focusBorderColor="inputFocusColor"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: '필수 입력사항 입니다.',
                  validate: (val: string) => {
                    if (watch('password') !== val) {
                      return '입력하신 비밀번호/비밀번호 확인이 일치하지 않습니다.';
                    }
                  },
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowConfirmPassword}>
                  {showConfirmPassword ? '보기' : '숨기기'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword?.message?.toString()}</FormErrorMessage>
          </FormControl>
        </A.InputContainer>
        {/*  */}
      </P.AccountWrapper>

      {/* 연락처 */}
      <A.InputContainer>
        <FormControl isInvalid={Boolean(errors.phone)}>
          <FormLabel htmlFor="phone1">연락처</FormLabel>
          <A.PhoneNumWrapper>
            <Input
              isDisabled={!edit}
              id="phone1"
              placeholder="010"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              type="number"
              maxLength={3}
              defaultValue={userInfo?.phone.slice(0, 3) || watch('phon1')}
              {...register('phone1', {
                required: '필수 입력사항 입니다.',
                pattern: {
                  value: /^\d{3}$/,
                  message: '3자리 숫자만 입력 가능합니다.',
                },
              })}
            />
            <Input
              isDisabled={!edit}
              id="phone2"
              placeholder="xxxx"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              type="number"
              maxLength={4}
              defaultValue={userInfo?.phone.slice(4, 8) || watch('phon2')}
              {...register('phone2', {
                required: '필수 입력사항 입니다.',
                pattern: {
                  value: /^\d{4}$/,
                  message: '4자리 숫자만 입력 가능합니다.',
                },
              })}
            />
            <Input
              isDisabled={!edit}
              id="phone3"
              placeholder="xxxx"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              type="number"
              maxLength={4}
              defaultValue={userInfo?.phone.slice(9, 13) || watch('phon3')}
              {...register('phone3', {
                required: '필수 입력사항 입니다.',
                pattern: {
                  value: /^\d{4}$/,
                  message: '4자리 숫자만 입력 가능합니다.',
                },
              })}
            />
          </A.PhoneNumWrapper>
          <FormErrorMessage>{errors.phone && errors.phone?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </A.InputContainer>

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
              isLoading={isLoadingUpdateProfile}
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

{
  /* <A.InputContainer>
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
                // value={watch('email')}
                defaultValue={userInfo?.email || watch('email')}
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
        </A.InputContainer> */
}
