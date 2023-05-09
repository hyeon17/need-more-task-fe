import React from 'react';
import Layout from '@/components/Layout';
import DashboardFooter from '@/components/Dashboard/DashboardFooter';
import Admin from '@/components/Admin/Admin';

function AdminPage() {
  return (
    <Layout hasHeader>
      <Admin />
      <DashboardFooter />
    </Layout>
  );
}

export default AdminPage;
