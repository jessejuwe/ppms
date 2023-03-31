'use client';

import React, { useCallback } from 'react';
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
import {
  Avatar,
  HStack,
  VStack,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
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

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={handleCloseDrawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <HStack gap={2}>
            <Avatar
              size="sm"
              bg="primary.800"
              src={images.hyppadec_logo}
              name="HYPPADEC PPMS"
            />
            <Text>HYPPADEC | PPMS</Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={8} align="start" justify="center" margin={0}>
            {activeDrawer == 'Youth Empowerment' && (
              <Menu closeOnSelect>
                <MenuButton
                  as={Button}
                  rightIcon={<MdArrowDropDown />}
                  className="menu-button"
                >
                  Youth Empowerment
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

            {activeDrawer == 'Community Empowerment' && (
              <Menu closeOnSelect>
                <MenuButton
                  as={Button}
                  rightIcon={<MdArrowDropDown />}
                  className="menu-button"
                >
                  Community Empowerment
                </MenuButton>
                <MenuList className="menu-list">
                  <MenuItem
                    className="menu-item"
                    onClick={handleProgramExecution}
                  >
                    Schedule Programmes for Execution
                  </MenuItem>
                  <MenuItem className="menu-item">Approved Programmes</MenuItem>
                  <MenuDivider />
                  <MenuGroup title="Community Support Programme Types">
                    <MenuItem className="menu-item">
                      Relief Intervention
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Poverty Alleviation
                    </MenuItem>
                    <MenuItem className="menu-item">Empowerment</MenuItem>
                    <MenuItem className="menu-item">Medical Outreach</MenuItem>
                    <MenuItem className="menu-item">
                      Fertilizer Distribution
                    </MenuItem>
                    <MenuItem className="menu-item">Others</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Programme Inspection/Reports">
                    <MenuItem className="menu-item">
                      List of Types of Programme
                    </MenuItem>
                    <MenuItem className="menu-item">List of Approved</MenuItem>
                    <MenuItem className="menu-item">
                      Programmes Scheduled for Execution
                    </MenuItem>
                    <MenuItem className="menu-item">
                      Monitoring/Inspection
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            )}

            {activeDrawer == 'Education Empowerment' && (
              <Menu closeOnSelect>
                <MenuButton
                  as={Button}
                  rightIcon={<MdArrowDropDown />}
                  className="menu-button"
                >
                  Education Empowerment
                </MenuButton>
                <MenuList className="menu-list">
                  <MenuItem
                    className="menu-item"
                    onClick={handleStudentRegistration}
                  >
                    Prospective Candidates Registration
                  </MenuItem>
                  <MenuItem className="menu-item">Approved Courses</MenuItem>
                  <MenuItem className="menu-item">Support Schemes</MenuItem>
                  <MenuItem className="menu-item">
                    Application Processing
                  </MenuItem>
                  <MenuItem className="menu-item">
                    Beneficiaries Enrollment
                  </MenuItem>
                  <MenuItem className="menu-item">
                    Participants Self-Service
                  </MenuItem>
                </MenuList>
              </Menu>
            )}

            {activeDrawer == 'Emergency Management' && (
              <Menu closeOnSelect>
                <MenuButton
                  as={Button}
                  rightIcon={<MdArrowDropDown />}
                  className="menu-button"
                >
                  Emergency Management
                </MenuButton>
                <MenuList className="menu-list">
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
                  <MenuItem className="menu-item">Reports</MenuItem>
                </MenuList>
              </Menu>
            )}

            {activeDrawer == 'Project Management' && (
              <Menu closeOnSelect>
                <MenuButton
                  as={Button}
                  rightIcon={<MdArrowDropDown />}
                  className="menu-button"
                >
                  Project Management
                </MenuButton>
                <MenuList className="menu-list">
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
                  <MenuItem className="menu-item">Project Inspection</MenuItem>
                  <MenuItem className="menu-item">Reports</MenuItem>
                </MenuList>
              </Menu>
            )}

            {activeDrawer == 'Inventory Management' && (
              <Menu closeOnSelect>
                <MenuButton
                  as={Button}
                  rightIcon={<MdArrowDropDown />}
                  className="menu-button"
                >
                  Inventory Management
                </MenuButton>
                <MenuList className="menu-list">
                  <MenuItem
                    className="menu-item"
                    onClick={handleItemEnlistment}
                  >
                    Inventory Item Enlistments
                  </MenuItem>
                  <MenuItem className="menu-item">
                    Inventory Transactions
                  </MenuItem>
                  <MenuItem className="menu-item">Inventory Reports</MenuItem>
                </MenuList>
              </Menu>
            )}

            <Menu closeOnSelect>
              <MenuButton
                as={Button}
                rightIcon={<MdArrowDropDown />}
                className="menu-button"
              >
                User
              </MenuButton>
              <MenuList className="menu-list">
                <MenuItem className="menu-item">Notifications</MenuItem>
                <MenuItem className="menu-item">Reports</MenuItem>
                <MenuItem className="menu-item">FAQ</MenuItem>
                <MenuItem className="menu-item" onClick={handleSignOut}>
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          </VStack>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MainDrawer;
