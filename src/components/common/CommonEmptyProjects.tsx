import React from 'react';
import * as D from '@/styles/dashboard.styles';
import LottieAni from '@/hooks/LottieAni';
import noProjects from 'public/lottie/noProjects.json';

function CommonEmptyProjects() {
  return (
    <D.EmptyProjects>
      <D.LottieWrapper>
        <LottieAni aniName={noProjects} />
      </D.LottieWrapper>
      <D.CreateTaskButton>Create Task</D.CreateTaskButton>
    </D.EmptyProjects>
  );
}

export default CommonEmptyProjects;
