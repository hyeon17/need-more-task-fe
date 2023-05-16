import React from 'react';
import { useCalendarState } from '@/store/calendarStore';
import OverView from '@/components/OverView';
import { useDailyTasks } from '@/apis/overview';

function DailyOverview() {
  const { getDateStore } = useCalendarState();
  
  return (
    <>
      <OverView api={useDailyTasks()} store={getDateStore()} />
    </>
  );
}

export default DailyOverview;
