import { useUserJoinStore } from '@/store/userJoinStore';
import React from 'react';

function complete() {
  const { me, onSaveSignup } = useUserJoinStore();
  console.log('me>>>', me);

  return <div>complete</div>;
}

export default complete;
