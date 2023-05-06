import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import * as P from '@/styles/profile.styles';
import { logoutAPI } from '@/apis/user';
import { useAccessTokenStore } from '@/store/acceessTokenStore';
import { useRouter } from 'next/router';

interface ILogoutModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

function LogoutModal({ children, isOpen, onOpen, onClose }: ILogoutModal) {
  const router = useRouter();
  const { onRemoveAccessToken } = useAccessTokenStore();
  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const onSuccess = (data: any) => {
    console.log(data);

    // onClose();
    window.location.href = '/login';
    onRemoveAccessToken();
    // router.replace('/login');
  };

  const { mutate, isLoading } = logoutAPI({ onSuccess });

  const handleLogout = () => {
    mutate(null);
  };

  return (
    <>
      <div
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        {children}
      </div>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <P.StyledModalHeader>
            <span>정말 로그아웃 하시겠습니까?</span>
          </P.StyledModalHeader>
          <ModalCloseButton />
          {/* <ModalBody>123</ModalBody> */}
          <P.StyledModalFooter>
            <Button bgColor="primary" color="white" isLoading={isLoading} onClick={handleLogout}>
              로그아웃
            </Button>
            <Button onClick={onClose}>취소</Button>
          </P.StyledModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LogoutModal;
