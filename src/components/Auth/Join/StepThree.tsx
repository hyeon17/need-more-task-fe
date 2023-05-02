import React, { useEffect, useMemo, useState } from 'react';
import { useUserJoinStore } from '@/store/userJoinStore';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
// import UploadImage from '@/components/Auth/UploadImage';
import * as A from '@/styles/auth.styles';
import useInput from '@/hooks/useInput';
import AuthInput from '../AuthInput';

export const inputProps = {
  variant: 'flushed',
  borderColor: 'outlineColor',
  focusBorderColor: 'inputFocusColor',
};

function StepThree() {
  const router = useRouter();
  const { register } = useForm();
  const { me, onSaveSignup } = useUserJoinStore();
  // const [phone, onChangePhone] = useInput(me?.phone ?? '');
  const [phone, setPhone] = useState(me?.phone ?? '');

  const [firstNum, onChangeFirstNum] = useInput('');
  const [secondNum, onChangeSecondNum] = useInput('');
  const [thirdNum, onChangeThirdNum] = useInput('');

  console.log('me', me);

  useEffect(() => {
    const combinedPhone = `${firstNum}-${secondNum}-${thirdNum}`;
    setPhone(combinedPhone);
  }, [firstNum, secondNum, thirdNum]);

  const isDisabled = useMemo(() => Boolean(!phone), [phone]);

  const onClickNext = () => {
    onSaveSignup({ ...me, phone });
    router.push('/join/complete');
  };

  return (
    <>
      {/* <UploadImage
        name="avatar"
        acceptedFileTypes="image/*"
        isRequired={true}
        placeholder="Your avatar"
        control={control}
      >
        New avatar
      </UploadImage> */}
      <label>휴대폰 번호</label>
      <A.PhoneNumWrapper>
        <AuthInput
          value={firstNum}
          onChange={onChangeFirstNum}
          label=""
          type="number"
          placeholder="010"
          inputProps={inputProps}
        />
        <AuthInput
          value={secondNum}
          onChange={onChangeSecondNum}
          label=""
          type="number"
          placeholder="xxxx"
          inputProps={inputProps}
        />
        <AuthInput
          value={thirdNum}
          onChange={onChangeThirdNum}
          label=""
          type="number"
          placeholder="xxxx"
          inputProps={inputProps}
        />
      </A.PhoneNumWrapper>
      <A.ConfirmButton colorScheme="teal" size="md" isDisabled={isDisabled} onClick={onClickNext}>
        다음
      </A.ConfirmButton>
    </>
  );
}

export default StepThree;
