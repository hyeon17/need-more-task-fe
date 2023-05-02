import React, { useMemo, useState } from 'react';
import * as A from '@/styles/auth.styles';
import { useRouter } from 'next/router';
import { useUserJoinStore } from '@/store/userJoinStore';
import AuthInput from '../AuthInput';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import useInput from '@/hooks/useInput';
import PasswordInput from '../PasswordInput';

export const inputProps = {
  variant: 'flushed',
  borderColor: 'outlineColor',
  focusBorderColor: 'inputFocusColor',
};

function StepTwo() {
  const router = useRouter();
  const { me, onSaveSignup } = useUserJoinStore();

  const [fullname, onChangeFullname] = useInput(me?.fullname ?? '');
  const [email, onChangeEmail] = useInput(me?.email ?? '');
  const [password, onChangePassword] = useInput(me?.password ?? '');
  const [confirmPassword, onChangeConfirmPassword] = useInput(me?.confirmPassword ?? '');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleIsDuplicated = () => {
    console.log('중복확인');
  };

  console.log(fullname, email);
  console.log(password, confirmPassword);

  const isDisabled = useMemo(
    () => Boolean(!fullname || !email || !password || !confirmPassword),
    [fullname, email, password, confirmPassword],
  );

  const onClickNext = () => {
    if (password !== confirmPassword) {
      console.log('다름!!');

      return;
    }
    onSaveSignup({ ...me, fullname, email, password });
    router.push('/join/3');
  };

  return (
    <>
      {/* 이름 */}
      <AuthInput
        value={fullname}
        onChange={onChangeFullname}
        label="이름"
        placeholder="이름을 입력하세요"
        inputProps={inputProps}
      />
      {/* 이메일 */}
      <A.InputContainer>
        <label>이메일</label>
        <InputGroup size="md" variant="flushed">
          <Input pr="4.5rem" value={email} placeholder="이메일을 입력하세요" {...inputProps} onChange={onChangeEmail} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleIsDuplicated}>
              {/* {show ? '보기' : '숨기기'} */}
              중복 확인
            </Button>
          </InputRightElement>
        </InputGroup>
      </A.InputContainer>

      {/* 비밀번호 */}
      <PasswordInput
        label="비밀번호"
        value={password}
        show={showPassword}
        handleClick={handleShowPassword}
        inputProps={inputProps}
        onChange={onChangePassword}
      />
      {/* 비밀번호 확인 */}
      <PasswordInput
        label="비밀번호 확인"
        value={confirmPassword}
        show={showConfirmPassword}
        handleClick={handleShowConfirmPassword}
        inputProps={inputProps}
        onChange={onChangeConfirmPassword}
      />
      <A.ConfirmButton colorScheme="teal" size="md" isDisabled={isDisabled} onClick={onClickNext}>
        다음
      </A.ConfirmButton>
    </>
  );
}

export default StepTwo;
