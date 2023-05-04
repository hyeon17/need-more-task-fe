import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCalendarState } from '@/store/calendarStore';

const ComponentsWithNoSSR = dynamic(() => import('@/components/Calendar/CalendarView'), { ssr: false });

function CalendarPage() {
  // const router = useRouter();
  // const { year, month } = router.query;
  // const { setYearStore, setMonthStore } = useCalendarState();

  // useEffect(() => {
  //   if (year && month) {
  //     setYearStore(Number(year));
  //     setMonthStore(Number(month));
  //   }
  // }, [setYearStore, setMonthStore]);

  return (
    <Layout>
      <ComponentsWithNoSSR />
    </Layout>
  );
}

export default CalendarPage;
