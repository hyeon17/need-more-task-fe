import React from 'react';
import * as A from '@/styles/auth.styles';

interface ITitleLabel {
  title: string;
}

function TitleLabel({ title }: ITitleLabel) {
  return (
    <A.TitleWrapper>
      <h5>{title}</h5>
      <A.TitleDivider />
    </A.TitleWrapper>
  );
}

export default TitleLabel;
