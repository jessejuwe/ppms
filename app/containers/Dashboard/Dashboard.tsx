'use client';

import React from 'react';

import { Sidebar } from '@/exports/exports';

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="dashboard">
      <section className="sidebar-section">
        <Sidebar />
      </section>
      <main className="dashboard-content">Dashboard Content</main>
    </div>
  );
};

export default Dashboard;
