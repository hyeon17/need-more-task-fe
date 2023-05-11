import React from 'react';
import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const ComponentsWithNoSSR = dynamic(() => import('@/components/Calendar/CalendarView'), { ssr: false });

function CalendarPage() {
  return (
    <>
      <Head>
        <title>Need More Task · Calendar</title>
      </Head>
      <Layout hasHeader>
        <ComponentsWithNoSSR />
      </Layout>
    </>
  );
}

export default CalendarPage;
