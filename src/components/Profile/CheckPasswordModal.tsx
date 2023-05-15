import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as A from '@/styles/auth.styles';
import * as P from '@/styles/profile.styles';

interface ICheckPasswordModal {
  isOpenCheckPassword: boolean;
  onOpenCheckPassword: () => void;
  onCloseCheckPassword: () => void;
  validatePasswordMutate: any;
  isLoadingValidatePassword: boolean;
  children: React.ReactNode;
}

function CheckPasswordModal({
  children,
  isOpenCheckPassword,
  onOpenCheckPassword,
  onCloseCheckPassword,
  validatePasswordMutate,
  isLoadingValidatePassword,
}: ICheckPasswordModal) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;

  const [overlay, setOverlay] = useState(<OverlayOne />);

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>();

  const onClickSave = (data: any) => {
    if (Object.keys(errors).length === 0) {
      // 저장 api
      validatePasswordMutate({ password: watch('password'), passwordCheck: watch('confirmPassword') });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(onClickSave)();
  };

  return (
    <>
      <div
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpenCheckPassword();
        }}
      >
        {children}
      </div>

      <Modal isCentered isOpen={isOpenCheckPassword} onClose={onCloseCheckPassword}>
        {overlay}
        <ModalContent>
          <form onSubmit={onSubmit}>
            <P.StyledModalHeader>
              <span>비밀번호 확인 개인정보 수정을 위해</span>
              <span>비밀번호를 입력해 주세요.</span>
            </P.StyledModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              {/* 비밀번호 */}
              <A.InputContainer>
                <FormControl isInvalid={Boolean(errors.password)}>
                  <FormLabel htmlFor="password">비밀번호</FormLabel>
                  <InputGroup size="md" variant="flushed">
                    <Input
                      id="password"
                      placeholder="비밀번호을 입력하세요"
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

              {/* 비밀번호 확인 */}
              <A.InputContainer>
                <FormControl isInvalid={Boolean(errors.confirmPassword)}>
                  <FormLabel htmlFor="confirmPassword">비밀번호 확인</FormLabel>
                  <InputGroup size="md" variant="flushed">
                    <Input
                      id="confirmPassword"
                      placeholder="비밀번호를 다시 입력하세요"
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
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword?.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
              </A.InputContainer>
            </ModalBody>
            <P.StyledModalFooter>
              <Button bgColor="primary" color="white" type="submit" isLoading={isLoadingValidatePassword}>
                제출
              </Button>
              <Button onClick={onCloseCheckPassword}>닫기</Button>
            </P.StyledModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CheckPasswordModal;
