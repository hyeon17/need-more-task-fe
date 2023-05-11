import React from 'react';
import Layout from '@/components/Layout';
import CommonFooter from '@/components/common/CommonFooter';
import Admin from '@/components/Admin/Admin';

function AdminPage() {
  return (
    <Layout hasHeader>
      <Admin />
      <CommonFooter />
    </Layout>
  );
}

export default AdminPage;
