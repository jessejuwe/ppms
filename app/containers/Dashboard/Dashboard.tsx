'use client';

import React from 'react';
import { Drawer } from '@/exports/exports';

type Props = {};

const Dashboard: React.FC<Props> = props => {
  return (
    <>
      <Drawer />
      <main className="dashboard">
        <div className="dashboard-content">Dashboard Content</div>
      </main>
    </>
  );
};

export default Dashboard;
