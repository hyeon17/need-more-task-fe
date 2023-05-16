import React from 'react';
import { useGetPeriodTasks } from '@/apis/overview';
import OverView from '@/components/OverView';
import { useSideBarState } from '@/store/sideBarStore';

function PeriodOverview() {
  const { getStartAtStore, getEndAtStore } = useSideBarState();
 
  return (
    <>
      <OverView api={useGetPeriodTasks()} store={[getStartAtStore(), getEndAtStore()]} />
    </>
  );
}
export default PeriodOverview;
