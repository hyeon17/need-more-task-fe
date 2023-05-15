import React from 'react';
import { Tooltip } from '@chakra-ui/react';

function CommonToolTip({ children, toolTip }: { children: React.ReactNode; toolTip: string }) {
  return <Tooltip label={toolTip}>{children}</Tooltip>;
}

export default CommonToolTip;
