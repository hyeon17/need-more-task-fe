import React from 'react';
import Layout from '@/components/Layout';
import CommonFooter from '@/components/common/CommonFooter';
import Admin from '@/components/Admin/Admin';
import Head from 'next/head';

function AdminPage() {
  return (
    <Layout hasHeader>
      <Head>
        <title>Need More Task · 관리자 페이지</title>
      </Head>
      <Admin />
      <CommonFooter />
    </Layout>
  );
}

export default AdminPage;
