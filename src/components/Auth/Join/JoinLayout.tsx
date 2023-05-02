import React from 'react';
import * as A from '@/styles/auth.styles';
import TitleLabel from '../TitleLabel';

import Step1Disabled from 'public/svg/step1-disabled.svg';
import Step2Disabled from 'public/svg/step2-disabled.svg';
import Step3Disabled from 'public/svg/step3-disabled.svg';

import Step1Active from 'public/svg/step1-active.svg';
import Step2Active from 'public/svg/step2-active.svg';
import Step3Active from 'public/svg/step3-active.svg';
import Image from 'next/image';
import { Progress } from '@chakra-ui/react';

type TStep = '1' | '2' | '3';

interface IJoinLayout {
  step: TStep;
  children: React.ReactElement;
}

const StepContents = {
  '1': { disabled: Step1Disabled, active: Step1Active, title: '학교 정보를 입력해 주세요.' },
  '2': { disabled: Step2Disabled, active: Step2Active, title: '간단한 정보를 알려주세요.' },
  '3': { disabled: Step3Disabled, active: Step3Active, title: '어떤 일을 하고 계신가요?' },
};

function JoinLayout({ step, children }: IJoinLayout) {
  return (
    <A.Container>
      <TitleLabel title="회원가입" />
      <Progress value={34 * parseInt(step)} size="sm" />
      <A.JoinStepWrapper>
        {Array(3)
          .fill(null)
          .map((_, i) => {
            const index = (i + 1).toString() as TStep;
            return (
              <Image
                key={index}
                src={step === index.toString() ? StepContents[index].active : StepContents[index].disabled}
                alt={step === index.toString() ? 'step-active' : 'step-disabled'}
              />
            );
          })}
      </A.JoinStepWrapper>
      <A.BodyWrapper>
        <h2>{StepContents[step].title}</h2>
        <main>{children}</main>
      </A.BodyWrapper>
    </A.Container>
  );
}

export default JoinLayout;
