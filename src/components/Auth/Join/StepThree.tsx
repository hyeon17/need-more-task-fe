import { useUserJoinStore } from '@/store/userJoinStore';
import { useRouter } from 'next/router';
import React from 'react';

function StepThree() {
  const router = useRouter();
  const { me, onSaveSignup } = useUserJoinStore();

  console.log('me', me);
  return <div>StepThree</div>;
}

export default StepThree;
