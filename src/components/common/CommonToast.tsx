import React from 'react';
import { useToast } from '@chakra-ui/react';

function CommonToast() {
  const toast = useToast();

  toast({
    title: '권한 수정 성공',
    // description: '알 수 없는 오류가 발생했습니다.',
    status: 'success',
    duration: 9000,
    isClosable: true,
  });

  return <div></div>;
}

export default CommonToast;
