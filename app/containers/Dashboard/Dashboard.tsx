'use client';

import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { Button } from '@chakra-ui/react';
import { Breadcrumb } from 'flowbite-react';
import { FaArrowLeft } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';

import {
  DashboardMenu,
  CandidateRegistration,
  ProgramExecution,
  StudentRegistration,
  IncidentReporting,
  ProjectEnlistment,
  ItemEnlistment,
  CandidateList,
  ScheduledProgramList,
  StudentList,
  ReportedIncidentList,
  EnlistedProjectList,
  EnlistedItemList,
} from '@/exports/exports';
import { dashboardActions } from '@/redux/slices/dashboard-slice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector(state => state.dashboard.active);

  const handleGoBack = useCallback(() => {
    dispatch(dashboardActions.setActive({ alpha: 'Dashboard', beta: null }));
    dispatch(dashboardActions.setDrawer('Dashboard'));
  }, [dispatch]);

  let content;

  switch (active.beta) {
    case 'Candidate Registration':
      content = <CandidateRegistration />;
      break;

    case 'Program Execution':
      content = <ProgramExecution />;
      break;

    case 'Student Registration':
      content = <StudentRegistration />;
      break;

    case 'Incident Reporting':
      content = <IncidentReporting />;
      break;

    case 'Project Enlistment':
      content = <ProjectEnlistment />;
      break;

    case 'Item Enlistment':
      content = <ItemEnlistment />;
      break;

    case 'Candidate List':
      content = <CandidateList />;
      break;

    case 'Scheduled Program List':
      content = <ScheduledProgramList />;
      break;

    case 'Student List':
      content = <StudentList />;
      break;

    case 'Reported Incident List':
      content = <ReportedIncidentList />;
      break;

    case 'Enlisted Project List':
      content = <EnlistedProjectList />;
      break;

    case 'Enlisted Item List':
      content = <EnlistedItemList />;
      break;

    default:
      content = <div></div>;
      break;
  }

  return (
    <>
      <main className="dashboard">
        <div className="dashboard-content">
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
      </main>
    </>
  );
};

export default Dashboard;
