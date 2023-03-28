'use client';

import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { Button, useToast } from '@chakra-ui/react';
import { Breadcrumb } from 'flowbite-react';
import { FaArrowLeft } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';

import {
  Drawer,
  DashboardMenu,
  CandidateRegistration,
} from '@/exports/exports';
import { uiActions } from '@/redux/slices/ui-slice';
import { dashboardActions } from '@/redux/slices/dashboard-slice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const drawerIsOpen = useAppSelector(state => state.ui.drawerIsOpen);
  const active = useAppSelector(state => state.dashboard.active);

  const handleOpenDrawer = useCallback(() => {
    dispatch(uiActions.openDrawer());
  }, [dispatch]);

  const handleCloseDrawer = useCallback(() => {
    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleGoBack = useCallback(() => {
    dispatch(dashboardActions.setActive({ alpha: 'Dashboard', beta: null }));
  }, [dispatch]);

  let content;

  if (active.beta === 'Candidate Registration') {
    content = <CandidateRegistration />;
  }

  return (
    <>
      <Drawer />
      <main className="dashboard">
        <div className="dashboard-content">
          {/* <div className="drawer-button">
            <Button
              onClick={drawerIsOpen ? handleCloseDrawer : handleOpenDrawer}
            >
              {drawerIsOpen ? 'Close Menu' : 'Open Menu'}
            </Button>
          </div> */}
          <div className="main-dashboard-content">
            <div className="content-breadcrumb">
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item href="/" icon={HiHome}>
                  Dashboard
                </Breadcrumb.Item>
                {active.alpha !== 'Dashboard' && (
                  <Breadcrumb.Item>{active.alpha}</Breadcrumb.Item>
                )}
                {active.beta !== null && (
                  <Breadcrumb.Item>{active.beta}</Breadcrumb.Item>
                )}
              </Breadcrumb>
            </div>

            <div className="dashboard-nav">
              <h1 className="head-text">
                {active.alpha == 'Dashboard' ? active.alpha : active.beta}
              </h1>
              <Button
                leftIcon={<FaArrowLeft />}
                isDisabled={active.alpha == 'Dashboard'}
                onClick={handleGoBack}
              >
                Back
              </Button>
            </div>

            <div className="dynamic-content">
              {active.alpha == 'Dashboard' ? <DashboardMenu /> : content}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
