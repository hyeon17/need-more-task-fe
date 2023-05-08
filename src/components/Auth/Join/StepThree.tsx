import React, { useEffect, useMemo, useState } from 'react';
import { useUserJoinStore } from '@/store/userJoinStore';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
// import UploadImage from '@/components/Auth/UploadImage';
import * as A from '@/styles/auth.styles';
import useInput from '@/hooks/useInput';
import AuthInput from '../AuthInput';
import { FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import JoinBackButton from '@/components/Auth/Join/JoinBackButton';

import { joinAPI } from '@/apis/user';
import { AxiosError } from 'axios';
import { IJoin } from '@/type/authTypes';

export const inputProps = {
  variant: 'flushed',
  borderColor: 'outlineColor',
  focusBorderColor: 'inputFocusColor',
};

function StepThree() {
  const toast = useToast();
  const router = useRouter();
  const { me, onSaveSignup } = useUserJoinStore();
  // const {} = me
  const [phone, setPhone] = useState(me?.phone ?? '');

  const [firstNum, onChangeFirstNum] = useInput('');
  const [secondNum, onChangeSecondNum] = useInput('');
  const [thirdNum, onChangeThirdNum] = useInput('');

  const [values, setValues] = useState({ profileIMG: '' });
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const [profileUrl, setProfileUrl] = useState('');

  console.log('me', me);

  const onError = (error: AxiosError) => {
    console.error('error>>', error);

    toast({
      title: '회원가입 실패.',
      description: '알 수 없는 오류가 발생했습니다.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const onSuccess = () => {
    router.push('/join/complete');
  };

  const { mutate: joinMutate, isLoading } = joinAPI({ onSuccess, onError });

  useEffect(() => {
    const combinedPhone = `${firstNum}-${secondNum}-${thirdNum}`;
    setPhone(combinedPhone);
  }, [firstNum, secondNum, thirdNum]);

  const isDisabled = useMemo(() => Boolean(!phone), [phone]);

  interface IFormInput {
    phone1: string;
    phone2: string;
    phone3: string;
  }
  let profileId = '1';
  const onClickNext = (data: IFormInput) => {
    console.log('data', data);
    const { phone1, phone2, phone3 } = data;
    const phone = `${phone1}-${phone2}-${phone3}`;

    if (Object.keys(errors).length === 0) {
      onSaveSignup({ ...me, phone, profileId });

      joinMutate({ ...me } as IJoin);
    }
  };

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>();

  const isProfileOversize = (size: number) => {
    // 2MB
    if (size > 1024 * 1024 * 2) {
      alert('이미지가 너무 큽니다.');
      return false;
    }
    return true;
  };

  const handleProfileIMG = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e', e.target.value);
    if (e.target.files) {
      const file = e.target.files[0];
      setProfileImageUrl(file.name);

      if (!isProfileOversize(file.size)) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setValues({ profileIMG: reader.result.toString() });
        }
      };
    }
  };
  console.log('profileImageUrl>>>', profileImageUrl);

  return (
    <form onSubmit={handleSubmit(onClickNext)}>
      {/* 프로필 이미지 */}
      <A.ProfileWrapper>
        <FormLabel>프로필</FormLabel>
        <A.ProfileFigure>
          {values['profileIMG'] && <Image width={150} height={150} src={values['profileIMG']} alt="프로필" />}
        </A.ProfileFigure>
        <A.ProfileIMGWrapper>
          <Input
            colorScheme="teal"
            variant="outline"
            type="file"
            accept=".jpg, .jpeg, .webp, .png, .gif, .svg"
            placeholder="파일선택"
            onChange={handleProfileIMG}
            value=""
          />
        </A.ProfileIMGWrapper>
      </A.ProfileWrapper>

      {/* 연락처 */}
      <A.InputContainer>
        <FormControl isInvalid={Boolean(errors.phone)}>
          <FormLabel htmlFor="phone1">연락처</FormLabel>
          <A.PhoneNumWrapper>
            <Input
              id="phone1"
              placeholder="010"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              type="number"
              maxLength={3}
              {...register('phone1', {
                required: '필수 입력사항 입니다.',
                pattern: {
                  value: /^\d{3}$/,
                  message: '3자리 숫자만 입력 가능합니다.',
                },
              })}
            />
            <Input
              id="phone2"
              placeholder="xxxx"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              type="number"
              maxLength={4}
              {...register('phone2', {
                required: '필수 입력사항 입니다.',
                pattern: {
                  value: /^\d{4}$/,
                  message: '4자리 숫자만 입력 가능합니다.',
                },
              })}
            />
            <Input
              id="phone3"
              placeholder="xxxx"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              type="number"
              maxLength={4}
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

      {/* isLoading 추가 */}
      <JoinBackButton step={2} />
      <A.ConfirmButton colorScheme="teal" size="md" type="submit" isLoading={isLoading}>
        다음
      </A.ConfirmButton>
    </form>
  );
}

export default StepThree;
