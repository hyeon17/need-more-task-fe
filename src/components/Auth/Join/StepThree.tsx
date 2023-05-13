import React, { useRef, useState } from 'react';
import { useUserJoinStore } from '@/store/userJoinStore';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as A from '@/styles/auth.styles';
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
  console.log('me>>', me);

  // const [phone, setPhone] = useState(me?.phone ?? '');

  // const [firstNum, onChangeFirstNum] = useInput('');
  // const [secondNum, onChangeSecondNum] = useInput('');
  // const [thirdNum, onChangeThirdNum] = useInput('');
  const [profileImage, setProfileImage] = useState('');

  const onError = (error: AxiosError) => {
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

  // useEffect(() => {
  //   const combinedPhone = `${firstNum}-${secondNum}-${thirdNum}`;
  //   setPhone(combinedPhone);
  // }, [firstNum, secondNum, thirdNum]);

  // const isDisabled = useMemo(() => Boolean(!phone), [phone]);

  interface IFormInput {
    phone1: string;
    phone2: string;
    phone3: string;
  }

  const onClickNext = (data: IFormInput) => {
    console.log('phone>>>', data);

    const { phone1, phone2, phone3 } = data;
    const phone = `${phone1}-${phone2}-${phone3}`;

    if (Object.keys(errors).length === 0) {
      onSaveSignup({ ...me, phone, profileId: me?.profileId || 1 });

      // joinMutate({ ...me } as IJoin);
    }
  };

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>();
  console.log('errors>>>', errors);

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
          <FormErrorMessage>{errors.phone1 && errors.phone1?.message?.toString()}</FormErrorMessage>
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
