'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { HStack, VStack, Text, Button, useToast } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';

import { images } from '@/constants';
import { uiActions } from '@/redux/slices/ui-slice';
import { signOutUser } from '@/redux/actions/auth-actions';
import { dashboardActions } from '@/redux/slices/dashboard-slice';

const MainDrawer: React.FC = () => {
  const toast = useToast();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.ui.drawerIsOpen);
  const activeDrawer = useAppSelector(state => state.dashboard.drawer);

  const handleCloseDrawer = useCallback(() => {
    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleSignOut = useCallback(() => {
    dispatch(signOutUser());
    router.push('/');

    if (toast.isActive('sign-out')) return;

    toast({
      id: 'sign-out',
      title: 'Sign out successful',
      description: 'You have been signed out. Goodbye.',
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });
  }, [dispatch, router, toast]);

  const handleCandidateRegistration = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Youth Empowerment',
        beta: 'Candidate Registration',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleProgramExecution = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Community Empowerment',
        beta: 'Program Execution',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleStudentRegistration = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Education Empowerment',
        beta: 'Student Registration',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleIncidentReporting = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Emergency Management',
        beta: 'Incident Reporting',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleProjectEnlistment = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Project Management',
        beta: 'Project Enlistment',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleItemEnlistment = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Store-Inventory Management',
        beta: 'Item Enlistment',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleCandidateList = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Youth Empowerment',
        beta: 'Candidate List',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleScheduledProgramList = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Community Empowerment',
        beta: 'Scheduled Program List',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleStudentList = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Education Empowerment',
        beta: 'Student List',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleReportedIncidentList = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Emergency Management',
        beta: 'Reported Incident List',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleEnlistedProjectList = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Project Management',
        beta: 'Enlisted Project List',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleEnlistedItemList = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Store-Inventory Management',
        beta: 'Enlisted Item List',
      })
    );

    dispatch(uiActions.closeDrawer());
  }, [dispatch]);

  const handleNotifications = useCallback(() => {
    if (toast.isActive('notifications')) return;
    toast({
      id: 'notifications',
      title: 'Notifications',
      description: 'There are no notfications.',
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });
  }, [toast]);

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={handleCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack gap={1}>
              <Image
                src={images.hyppadec_logo}
                className="nav__logo-img"
                alt="HYPPADEC Logo"
                priority
              />
              <Text>HYPPADEC</Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={8} align="start" justify="center" margin={0}>
              {activeDrawer == 'Youth Empowerment' && (
                <Menu
                  closeOnSelect
                  autoSelect
                  isLazy
                  placement="bottom"
                  offset={[0, 5]}
                  modifiers={[
                    {
                      name: 'preventOverflow',
                      options: {
                        padding: 5,
                        boundary: 'clippingParents',
                      },
                    },

                    {
                      name: 'flip',
                      options: {
                        padding: 5,
                      },
                    },
                  ]}
                >
                  <MenuButton
                    as={Button}
                    rightIcon={<MdArrowDropDown />}
                    className="menu-button"
                  >
                    Registration and Selection
                  </MenuButton>
                  <MenuList className="menu-list" style={{ margin: 0 }}>
                    <MenuItem
                      className="menu-item"
                      onClick={handleCandidateRegistration}
                    >
                      Prospective Candidate Registration
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Application Processing and Selection of Participants
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Participants Enrolment
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Skill Centre Accreditation
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Training Programmes Accreditation
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Participants Self-Service
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}

              {activeDrawer == 'Youth Empowerment' && (
                <Menu
                  closeOnSelect
                  autoSelect
                  isLazy
                  placement="bottom"
                  offset={[0, 5]}
                  modifiers={[
                    {
                      name: 'preventOverflow',
                      options: {
                        padding: 5,
                        boundary: 'clippingParents',
                      },
                    },

                    {
                      name: 'flip',
                      options: {
                        padding: 5,
                      },
                    },
                  ]}
                >
                  <MenuButton
                    as={Button}
                    rightIcon={<MdArrowDropDown />}
                    className="menu-button"
                  >
                    Reports
                  </MenuButton>
                  <MenuList className="menu-list" style={{ margin: 0 }}>
                    <MenuItem
                      className="menu-item"
                      onClick={handleCandidateList}
                    >
                      List of Prospective Candidates
                    </MenuItem>
                    <MenuItem className="menu-item">
                      List of Successful Candidates
                    </MenuItem>
                    <MenuItem className="menu-item">
                      List of Enrolled Participants
                    </MenuItem>
                    <MenuItem className="menu-item">
                      List of Participants with Complete Training
                    </MenuItem>
                    <MenuItem className="menu-item">
                      List of Prospective Skill Centers
                    </MenuItem>
                    <MenuItem className="menu-item">
                      List of Accredited Skill Centers
                    </MenuItem>
                    <MenuItem className="menu-item">
                      List of Accredited Programs
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}

              {activeDrawer == 'Youth Empowerment' && (
                <Menu
                  closeOnSelect
                  autoSelect
                  isLazy
                  placement="bottom"
                  offset={[0, 5]}
                  modifiers={[
                    {
                      name: 'preventOverflow',
                      options: {
                        padding: 5,
                        boundary: 'clippingParents',
                      },
                    },

                    {
                      name: 'flip',
                      options: {
                        padding: 5,
                      },
                    },
                  ]}
                >
                  <MenuButton
                    as={Button}
                    rightIcon={<MdArrowDropDown />}
                    className="menu-button"
                  >
                    Self Service
                  </MenuButton>
                  <MenuList className="menu-list" style={{ margin: 0 }}>
                    <MenuGroup title="Participants Self Service">
                      <MenuItem className="menu-item">
                        Download Letter of Posting
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Redeployment Application
                      </MenuItem>
                      <MenuItem className="menu-item">Feedbacks</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Skill Centers Self Service">
                      <MenuItem className="menu-item">
                        Student Attendance
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Periodic Test Score
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Program Completion
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              )}

              {activeDrawer == 'Community Empowerment' && (
                <Menu
                  closeOnSelect
                  autoSelect
                  isLazy
                  placement="bottom"
                  offset={[0, 5]}
                  modifiers={[
                    {
                      name: 'preventOverflow',
                      options: {
                        padding: 5,
                        boundary: 'clippingParents',
                      },
                    },

                    {
                      name: 'flip',
                      options: {
                        padding: 5,
                      },
                    },
                  ]}
                >
                  <MenuButton
                    as={Button}
                    rightIcon={<MdArrowDropDown />}
                    className="menu-button"
                  >
                    Community Empowerment
                  </MenuButton>
                  <MenuList className="menu-list" style={{ margin: 0 }}>
                    <MenuItem
                      className="menu-item"
                      onClick={handleProgramExecution}
                    >
                      Schedule Programmes for Execution
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Approved Programmes
                    </MenuItem>
                    <MenuDivider />
                    <MenuGroup title="Community Support Programme Types">
                      <MenuItem className="menu-item">
                        Relief Intervention
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Poverty Alleviation
                      </MenuItem>
                      <MenuItem className="menu-item">Empowerment</MenuItem>
                      <MenuItem className="menu-item">
                        Medical Outreach
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Fertilizer Distribution
                      </MenuItem>
                      <MenuItem className="menu-item">Others</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Program Inspection/Reports">
                      <MenuItem
                        className="menu-item"
                        onClick={handleScheduledProgramList}
                      >
                        List of Programs Scheduled for Execution
                      </MenuItem>
                      <MenuItem className="menu-item">
                        List of Types of Program
                      </MenuItem>
                      <MenuItem className="menu-item">
                        List of Approved Programs
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Monitoring/Inspection
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              )}

              {activeDrawer == 'Education Empowerment' && (
                <Menu
                  closeOnSelect
                  autoSelect
                  isLazy
                  placement="bottom"
                  offset={[0, 5]}
                  modifiers={[
                    {
                      name: 'preventOverflow',
                      options: {
                        padding: 5,
                        boundary: 'clippingParents',
                      },
                    },

                    {
                      name: 'flip',
                      options: {
                        padding: 5,
                      },
                    },
                  ]}
                >
                  <MenuButton
                    as={Button}
                    rightIcon={<MdArrowDropDown />}
                    className="menu-button"
                  >
                    Education Empowerment
                  </MenuButton>
                  <MenuList className="menu-list" style={{ margin: 0 }}>
                    <MenuGroup title="Registration & Selection">
                      <MenuItem
                        className="menu-item"
                        onClick={handleStudentRegistration}
                      >
                        Prospective Candidates Registration
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Approved Courses
                      </MenuItem>
                      <MenuItem className="menu-item">Support Schemes</MenuItem>
                      <MenuItem className="menu-item">
                        Application Processing
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Beneficiaries Enrollment
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Reports">
                      <MenuItem
                        className="menu-item"
                        onClick={handleStudentList}
                      >
                        List of Prospective Students
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Self-Service">
                      <MenuItem className="menu-item">
                        Participants Self-Service
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              )}

              {activeDrawer == 'Emergency Management' && (
                <Menu
                  closeOnSelect
                  autoSelect
                  isLazy
                  placement="bottom"
                  offset={[0, 5]}
                  modifiers={[
                    {
                      name: 'preventOverflow',
                      options: {
                        padding: 5,
                        boundary: 'clippingParents',
                      },
                    },

                    {
                      name: 'flip',
                      options: {
                        padding: 5,
                      },
                    },
                  ]}
                >
                  <MenuButton
                    as={Button}
                    rightIcon={<MdArrowDropDown />}
                    className="menu-button"
                  >
                    Emergency Management
                  </MenuButton>
                  <MenuList className="menu-list" style={{ margin: 0 }}>
                    <MenuItem
                      className="menu-item"
                      onClick={handleIncidentReporting}
                    >
                      Incident Reporting
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Preliminary Assessment
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Intervention Approval
                    </MenuItem>
                    <MenuDivider />
                    <MenuGroup title="Reports">
                      <MenuItem
                        className="menu-item"
                        onClick={handleReportedIncidentList}
                      >
                        List of Reported Incidents
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              )}

              {activeDrawer == 'Project Management' && (
                <Menu
                  closeOnSelect
                  autoSelect
                  isLazy
                  placement="bottom"
                  offset={[0, 5]}
                  modifiers={[
                    {
                      name: 'preventOverflow',
                      options: {
                        padding: 5,
                        boundary: 'clippingParents',
                      },
                    },

                    {
                      name: 'flip',
                      options: {
                        padding: 5,
                      },
                    },
                  ]}
                >
                  <MenuButton
                    as={Button}
                    rightIcon={<MdArrowDropDown />}
                    className="menu-button"
                  >
                    Project Management
                  </MenuButton>
                  <MenuList className="menu-list" style={{ margin: 0 }}>
                    <MenuItem
                      className="menu-item"
                      onClick={handleProjectEnlistment}
                    >
                      Enlistment of Projects Awarded for Execution
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Approved Project Enlistment
                    </MenuItem>
                    <MenuItem className="menu-item">Project Tracking</MenuItem>
                    <MenuItem className="menu-item">
                      Project Inspection
                    </MenuItem>
                    <MenuDivider />
                    <MenuGroup title="Reports">
                      <MenuItem
                        className="menu-item"
                        onClick={handleEnlistedProjectList}
                      >
                        List of Enlisted Projects
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              )}

              {activeDrawer == 'Inventory Management' && (
                <Menu
                  closeOnSelect
                  autoSelect
                  isLazy
                  placement="bottom"
                  offset={[0, 5]}
                  modifiers={[
                    {
                      name: 'preventOverflow',
                      options: {
                        padding: 5,
                        boundary: 'clippingParents',
                      },
                    },

                    {
                      name: 'flip',
                      options: {
                        padding: 5,
                      },
                    },
                  ]}
                >
                  <MenuButton
                    as={Button}
                    rightIcon={<MdArrowDropDown />}
                    className="menu-button"
                  >
                    Inventory Management
                  </MenuButton>
                  <MenuList className="menu-list" style={{ margin: 0 }}>
                    <MenuItem
                      className="menu-item"
                      onClick={handleItemEnlistment}
                    >
                      Inventory Item Enlistments
                    </MenuItem>
                    <MenuDivider />
                    <MenuGroup title="Inventory Transactions">
                      <MenuItem className="menu-item">Receivig</MenuItem>
                      <MenuItem className="menu-item">Issuing</MenuItem>
                      <MenuItem className="menu-item">
                        Real-time quantity on-hand
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Transfers and Adjustments
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Auto-calculates costs for adjustments
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Attach supporting documents & images
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Reports">
                      <MenuItem
                        className="menu-item"
                        onClick={handleEnlistedItemList}
                      >
                        List of Enlisted Items
                      </MenuItem>
                      <MenuItem className="menu-item">
                        List of Items Issued out
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Inventory cost report
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Excel export for spreadsheet analysis
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              )}

              <Menu
                closeOnSelect
                autoSelect
                isLazy
                placement="bottom"
                offset={[0, 5]}
                modifiers={[
                  {
                    name: 'preventOverflow',
                    options: {
                      padding: 5,
                      boundary: 'clippingParents',
                      rootBoundary: 'document',
                      altBoundary: true,
                    },
                  },

                  {
                    name: 'flip',
                    options: {
                      padding: 5,
                      fallbackPlacements: ['right'],
                      rootBoundary: 'document',
                      altBoundary: true,
                    },
                  },
                ]}
              >
                <MenuButton
                  as={Button}
                  rightIcon={<MdArrowDropDown />}
                  className="menu-button"
                >
                  User
                </MenuButton>
                <MenuList className="menu-list">
                  <MenuItem className="menu-item" onClick={handleNotifications}>
                    Notifications
                  </MenuItem>
                  <MenuItem className="menu-item">FAQ</MenuItem>
                  <MenuItem className="menu-item" onClick={handleSignOut}>
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Text as="b" size="sm">
              Copyright &copy; 2023 HYPPADEC.
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MainDrawer;
