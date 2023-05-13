import React, { useRef, useState } from 'react';
import * as A from '@/styles/auth.styles';
import { useUserJoinStore } from '@/store/userJoinStore';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react';

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
  const { me, onSaveSignup } = useUserJoinStore();

  const [profileImage, setProfileImage] = useState('');

  const onError = (error: any) => {
    const errorValue = error?.response?.data.data.value;

    if (errorValue === '공백일 수 없습니다') {
      toast({
        title: '회원가입 실패.',
        description: '입력하지 않은 사항이 있습니다. 다시 한 번 확인해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: '회원가입 실패.',
      description: '알 수 없는 오류가 발생했습니다.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const onSuccess = () => {
    toast({
      title: '회원가입 성공.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    router.push('/join/complete');
  };

  const { mutate: joinMutate, isLoading } = joinAPI({ onSuccess, onError });

  interface IFormInput {
    phone: string | undefined;
  }

  const onClickNext = (data: IFormInput) => {
    const { phone } = data;

    if (Object.keys(errors).length === 0) {
      onSaveSignup({ ...me });

      // console.log('me>>>', me);

      joinMutate({ ...me, phone: watch('phone'), profileId: me?.profileId || 1 } as IJoin);
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
    onSaveSignup({ ...me, profileId, profileImageUrl: data.data.profileImageUrl });

    // /user/profile
    queryClient.invalidateQueries([`/user/profile`]);
  };

  const onErrorUploadImage = (error: AxiosError) => {
    console.error(error);
    toast({
      title: '이미지 업로드에 문제가 발생했습니다. 다시 시도해주세요.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
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

  const formatPhoneNumber = (value: any) => {
    let cleaned = ('' + value).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  return (
    <form onSubmit={handleSubmit(onClickNext)}>
      {/* 프로필 이미지 */}
      <A.ProfileWrapper>
        <FormLabel>프로필</FormLabel>
        <A.ProfileFigures>
          <ProfileImage src={profileImage || me?.profileImageUrl} width={150} height={150} />
          {/* {values['profileIMG'] && <Image width={150} height={150} src={values['profileIMG']} alt="프로필" />} */}
        </A.ProfileFigures>
        <A.ProfileIMGWrapper>
          <Button
            as="label" // 버튼으로 사용하기 위해 <label> 요소로 지정
            htmlFor="profileImageInput" // 파일 입력 필드와 연결
            colorScheme="teal"
            variant="outline"
            cursor="pointer" // 마우스 커서를 포인터로 변경하여 클릭 가능한 모양으로 만듦
          >
            프로필 이미지 업로드
          </Button>
          <Input
            type="file"
            id="profileImageInput" // label의 htmlFor 속성과 연결
            ref={fileInputRef}
            onChange={uploadImage}
            display="none" // 실제 파일 입력 필드는 보이지 않도록 함
            accept=".jpg, .jpeg, .webp, .png, .gif, .svg"
          />
        </A.ProfileIMGWrapper>
      </A.ProfileWrapper>

      {/* 연락처 */}
      <A.InputContainer>
        <FormControl isInvalid={Boolean(errors.phone)}>
          <FormLabel htmlFor="phone">연락처</FormLabel>
          <A.PhoneNumWrapper>
            <Input
              id="phone"
              type="tel"
              placeholder="010-xxxx-xxxx"
              variant="flushed"
              borderColor="outlineColor"
              focusBorderColor="inputFocusColor"
              {...register('phone', {
                required: '필수 입력사항 입니다.',
                pattern: {
                  value: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
                  message: '올바른 형식으로 입력해주세요. 예) 010-0000-0000',
                },
              })}
              onChange={(e) => {
                e.target.value = formatPhoneNumber(e.target.value);
              }}
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
