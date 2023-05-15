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
      <span>찾으시는 사용자가 없네요</span>
    </StyledCommonEmptyUser>
  );
}

export default CommonEmptyUser;

const StyledCommonEmptyUser = styled.div<ICommonEmptyUser>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: ${(props) => props.width || '200px'};
  height: ${(props) => props.height || '200px'};
  margin-left: 200px;
`;
