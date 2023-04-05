'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Center,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  ScaleFade,
} from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { uiActions } from '@/redux/slices/ui-slice';
import { dashboardActions } from '@/redux/slices/dashboard-slice';
import { signOutUser } from '@/redux/actions/auth-actions';

const DashboardModal: React.FC = props => {
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
    <ScaleFade initialScale={0.9} in={isOpen}>
      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={handleCloseDrawer}
        scrollBehavior="inside"
        isCentered
        motionPreset="scale"
      >
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader className="modal-header" textTransform="uppercase">
            {activeDrawer}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody className="modal-body">
            <Center>
              <VStack spacing={4} align="center" justify="center" margin={0}>
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
                      <MenuGroup title="Registration and Selection">
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
                      </MenuGroup>

                      <MenuDivider />

                      <MenuGroup title="Reports">
                        <MenuItem className="menu-item">
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
                      </MenuGroup>

                      <MenuDivider />

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
                  <Menu closeOnSelect>
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
                      <MenuGroup title="Programme Inspection/Reports">
                        <MenuItem className="menu-item">
                          List of Types of Programme
                        </MenuItem>
                        <MenuItem className="menu-item">
                          List of Approved
                        </MenuItem>
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
                    <MenuList className="menu-list" style={{ margin: 0 }}>
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
                      <MenuItem className="menu-item">
                        Project Tracking
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Project Inspection
                      </MenuItem>
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
                    <MenuList className="menu-list" style={{ margin: 0 }}>
                      <MenuItem
                        className="menu-item"
                        onClick={handleItemEnlistment}
                      >
                        Inventory Item Enlistments
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Inventory Transactions
                      </MenuItem>
                      <MenuItem className="menu-item">
                        Inventory Reports
                      </MenuItem>
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
                  <MenuList className="menu-list" style={{ margin: 0 }}>
                    <MenuItem className="menu-item">Notifications</MenuItem>
                    <MenuItem className="menu-item">FAQ</MenuItem>
                    <MenuItem className="menu-item" onClick={handleSignOut}>
                      Sign out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </VStack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScaleFade>
  );
};

export default DashboardModal;
