'use client';

import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiLogout } from 'react-icons/hi';

import {
  FaChartPie,
  FaInbox,
  FaUser,
  FaSuperpowers,
  FaObjectGroup,
  FaSchool,
  FaEmber,
  FaRProject,
  FaFileInvoice,
} from 'react-icons/fa';

type Props = {};

const SidebarComponent: React.FC<Props> = props => {
  return (
    <div className="sidebar">
      <Sidebar className="app__sidebar">
        <Sidebar.Items className="app__sidebar-items">
          <Sidebar.ItemGroup className="app__sidebar-itemgroup">
            <Sidebar.Item href="#" icon={FaUser}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse icon={FaSuperpowers} label="Empowerment">
              <Sidebar.Item href="#">
                Prospective Candidates Registration
              </Sidebar.Item>
              <Sidebar.Item href="#">
                Application Processing and Selection of Participants
              </Sidebar.Item>
              <Sidebar.Item href="#">Participants Enrolment</Sidebar.Item>
              <Sidebar.Item href="#">Skill Centre Accreditation</Sidebar.Item>
              <Sidebar.Item href="#">
                Training Programmes Accreditation
              </Sidebar.Item>
              <Sidebar.Item href="#">Participants Self-Service</Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={FaObjectGroup} label="Community">
              <Sidebar.Collapse label="Community Support Programme Types">
                <Sidebar.Item href="#">Relief Intervention</Sidebar.Item>
                <Sidebar.Item href="#">Poverty Alleviation</Sidebar.Item>
                <Sidebar.Item href="#">Empowerment</Sidebar.Item>
                <Sidebar.Item href="#">Medical Outreach</Sidebar.Item>
                <Sidebar.Item href="#">Fertilizer Distribution</Sidebar.Item>
                <Sidebar.Item href="#">Others</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item href="#">Approved Programmes</Sidebar.Item>
              <Sidebar.Item href="#">
                Schedule Programmes for Execution
              </Sidebar.Item>
              <Sidebar.Collapse label="Programme Inspection/Reports">
                <Sidebar.Item href="#">List of Types of Programme</Sidebar.Item>
                <Sidebar.Item href="#">List of Approved</Sidebar.Item>
                <Sidebar.Item href="#">
                  Programmes Scheduled for Execution
                </Sidebar.Item>
                <Sidebar.Item href="#">Monitoring/Inspection</Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={FaSchool} label="Education">
              <Sidebar.Item href="#">Approved Courses</Sidebar.Item>
              <Sidebar.Item href="#">Support Schemes</Sidebar.Item>
              <Sidebar.Item href="#">
                Prospective Candidates Registration
              </Sidebar.Item>
              <Sidebar.Item href="#">Application Processing</Sidebar.Item>
              <Sidebar.Item href="#">Beneficiaries Enrollment</Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={FaEmber} label="Emergency">
              <Sidebar.Item href="#">Incident Types</Sidebar.Item>
              <Sidebar.Item href="#">Incident Reporting</Sidebar.Item>
              <Sidebar.Item href="#">Preliminary Assessment</Sidebar.Item>
              <Sidebar.Item href="#">Intervention Approval</Sidebar.Item>
              <Sidebar.Item href="#">Reports</Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={FaRProject} label="Project">
              <Sidebar.Item href="#">Approved Project Enlistment</Sidebar.Item>
              <Sidebar.Item href="#">
                Enlistment of Projects Awarded for Execution
              </Sidebar.Item>
              <Sidebar.Item href="#">Project Tracking</Sidebar.Item>
              <Sidebar.Item href="#">Project Inspection</Sidebar.Item>
              <Sidebar.Item href="#">Reports</Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={FaFileInvoice} label="Inventory">
              <Sidebar.Item href="#">Inventory Item Enlistments</Sidebar.Item>
              <Sidebar.Item href="#">Inventory Transactions</Sidebar.Item>
              <Sidebar.Item href="#">Inventory Reports</Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup className="app__sidebar-itemgroup">
            <Sidebar.Item href="#" icon={FaInbox} label="3">
              Notifications
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={FaChartPie} label="New">
              Reports
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiLogout}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
