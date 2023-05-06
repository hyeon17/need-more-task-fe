import { Spinner } from '@chakra-ui/react';
import React from 'react';

function CommonSpinner({ size }: { size?: string }) {
  return <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary" size={size} />;
}

export default CommonSpinner;
