import React from 'react';
import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';

const ComponentsWithNoSSR = dynamic(() => import('@/components/Calendar/Calendar'), { ssr: false });

function CalendarPage() {
  return (
    <Layout hasHeader>
      <ComponentsWithNoSSR />
    </Layout>
  );
}

export default CalendarPage;
