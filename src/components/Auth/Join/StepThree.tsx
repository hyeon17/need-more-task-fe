import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUserJoinStore } from '@/store/userJoinStore';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as A from '@/styles/auth.styles';
import useInput from '@/hooks/useInput';
import { FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react';

import JoinBackButton from '@/components/Auth/Join/JoinBackButton';
import { joinAPI, useUpdateProfileImageAPI } from '@/apis/user';
import { AxiosError } from 'axios';
import { IJoin } from '@/type/authTypes';
import ProfileImage from '@/components/CommonHeader/ProfileImage';
import { useQueryClient } from '@tanstack/react-query';

export const inputProps = {
  variant: 'flushed',
  borderColor: 'outlineColor',
  focusBorderColor: 'inputFocusColor',
};

function StepThree() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const router = useRouter();
  const { me, onSaveSignup, onResetSignup } = useUserJoinStore();
  // const {} = me
  const [phone, setPhone] = useState(me?.phone ?? '');

  const [firstNum, onChangeFirstNum] = useInput('');
  const [secondNum, onChangeSecondNum] = useInput('');
  const [thirdNum, onChangeThirdNum] = useInput('');

  const [values, setValues] = useState({ profileIMG: '' });
  const [profileImage, setProfileImage] = useState('');

  const [profileImageUrl, setProfileImageUrl] = useState('');

  const [profileUrl, setProfileUrl] = useState('');

  const onError = (error: AxiosError) => {
    toast({
      title: '회원가입 실패.',
      description: '알 수 없는 오류가 발생했습니다.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const onSuccess = () => {
    toast({
      title: '회원가입 성공.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

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

  const onClickNext = (data: IFormInput) => {
    const { phone1, phone2, phone3 } = data;
    const phone = `${phone1}-${phone2}-${phone3}`;

    if (Object.keys(errors).length === 0) {
      onSaveSignup({ ...me, phone });

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

  const onSuccessUploadImage = (data: any) => {
    const { profileId } = data.data;
    setProfileImage(data.data.profileImageUrl);
    onSaveSignup({ ...me, profileId });

    // /user/profile
    queryClient.invalidateQueries([`/user/profile`]);
  };

  const onErrorUploadImage = (error: AxiosError) => {
    console.error(error);
  };

  const { mutate: uploadImageMutate, isLoading: isLoadingUploadImage } = useUpdateProfileImageAPI({
    onSuccess: onSuccessUploadImage,
    onError: onErrorUploadImage,
  });

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];

    const formData = new FormData();

    formData.append('profileImage', file);
    formData.append('type', fileInputRef.current!.name);

    try {
      uploadImageMutate(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onClickNext)}>
      {/* 프로필 이미지 */}
      <A.ProfileWrapper>
        <FormLabel>프로필</FormLabel>
        <A.ProfileFigures>
          <ProfileImage src={profileImage} width={150} height={150} />
          {/* {values['profileIMG'] && <Image width={150} height={150} src={values['profileIMG']} alt="프로필" />} */}
        </A.ProfileFigures>
        <A.ProfileIMGWrapper>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={uploadImage}
            colorScheme="teal"
            variant="outline"
            accept=".jpg, .jpeg, .webp, .png, .gif, .svg"
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
