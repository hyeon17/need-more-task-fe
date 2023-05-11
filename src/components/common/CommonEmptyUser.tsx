import React, { CSSProperties } from 'react';
import * as D from '@/styles/dashboard.styles';
import LottieAni from '@/hooks/LottieAni';
import noUsers from 'public/lottie/noUsers.json';
import styled from '@emotion/styled';

interface ICommonEmptyUser {
  width?: string;
  height?: string;
}

function CommonEmptyUser({ width = '200px', height = '200px' }: ICommonEmptyUser) {
  const customStyle: CSSProperties = { width, height };

  return (
    <StyledCommonEmptyUser style={customStyle}>
      <LottieAni aniName={noUsers} />
    </StyledCommonEmptyUser>
  );
}

export default CommonEmptyUser;

const StyledCommonEmptyUser = styled.div<ICommonEmptyUser>`
  /* border: 1px solid; */
  width: ${(props) => props.width || '200px'};
  height: ${(props) => props.height || '200px'};
  margin-left: 440px;
`;
