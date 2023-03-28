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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Select,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import {
  FaSuperpowers,
  FaObjectGroup,
  FaEmber,
  FaRProject,
  FaFileInvoice,
} from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';

import { images } from '@/constants';
import { uiActions } from '@/redux/slices/ui-slice';
import { signOutUser } from '@/redux/actions/auth-actions';
import { dashboardActions } from '@/redux/slices/dashboard-slice';

const MainDrawer: React.FC = () => {
  const toast = useToast();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.ui.drawerIsOpen);

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

  const handlePCRegistration = useCallback(() => {
    dispatch(
      dashboardActions.setActive({
        alpha: 'Youth Empowerment',
        beta: 'Candidate Registration',
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
            <Avatar size="sm" bg="primary.800" src={images.logo} />
            <Text>PPMS</Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={8} align="start" justify="center">
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<FaSuperpowers />}
                rightIcon={<MdArrowDropDown />}
                className="menu-button"
              >
                Youth Empowerment
              </MenuButton>
              <MenuList className="menu-list">
                <MenuItem className="menu-item" onClick={handlePCRegistration}>
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

            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<FaObjectGroup />}
                rightIcon={<MdArrowDropDown />}
                className="menu-button"
              >
                Community Empowerment
              </MenuButton>
              <MenuList className="menu-list">
                <MenuGroup title="Community Support Programme Types">
                  <Select
                    variant="filled"
                    placeholder="Select programme"
                    paddingX="2"
                    iconColor="transparent"
                  >
                    <option className="menu-item">Relief Intervention</option>
                    <option className="menu-item">Poverty Alleviation</option>
                    <option className="menu-item">Empowerment</option>
                    <option className="menu-item">Medical Outreach</option>
                    <option className="menu-item">
                      Fertilizer Distribution
                    </option>
                    <option className="menu-item">Others</option>
                  </Select>
                </MenuGroup>
                <MenuDivider />
                <MenuItem className="menu-item">Approved Programmes</MenuItem>
                <MenuItem className="menu-item">
                  Schedule Programmes for Execution
                </MenuItem>
                <MenuDivider />
                <MenuGroup title="Programme Inspection/Reports">
                  <Select
                    variant="filled"
                    placeholder="Select option"
                    paddingX="2"
                    iconColor="transparent"
                  >
                    <option className="menu-item">
                      List of Types of Programme
                    </option>
                    <option className="menu-item">List of Approved</option>
                    <option className="menu-item">
                      Programmes Scheduled for Execution
                    </option>
                    <option className="menu-item">Monitoring/Inspection</option>
                  </Select>
                </MenuGroup>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<FaEmber />}
                rightIcon={<MdArrowDropDown />}
                className="menu-button"
              >
                Education Empowerment
              </MenuButton>
              <MenuList className="menu-list">
                <MenuItem className="menu-item">Approved Courses</MenuItem>
                <MenuItem className="menu-item">Support Schemes</MenuItem>
                <MenuItem className="menu-item">
                  Prospective Candidates Registration
                </MenuItem>
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

            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<FaEmber />}
                rightIcon={<MdArrowDropDown />}
                className="menu-button"
              >
                Emergency Management
              </MenuButton>
              <MenuList className="menu-list">
                <MenuItem className="menu-item">Incident Types</MenuItem>
                <MenuItem className="menu-item">Incident Reporting</MenuItem>
                <MenuItem className="menu-item">
                  Preliminary Assessment
                </MenuItem>
                <MenuItem className="menu-item">Intervention Approval</MenuItem>
                <MenuItem className="menu-item">Reports</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<FaRProject />}
                rightIcon={<MdArrowDropDown />}
                className="menu-button"
              >
                Project Management
              </MenuButton>
              <MenuList className="menu-list">
                <MenuItem className="menu-item">
                  Approved Project Enlistment
                </MenuItem>
                <MenuItem className="menu-item">
                  Enlistment of Projects Awarded for Execution
                </MenuItem>
                <MenuItem className="menu-item">Project Tracking</MenuItem>
                <MenuItem className="menu-item">Project Inspection</MenuItem>
                <MenuItem className="menu-item">Reports</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<FaFileInvoice />}
                rightIcon={<MdArrowDropDown />}
                className="menu-button"
              >
                Inventory Management
              </MenuButton>
              <MenuList className="menu-list">
                <MenuItem className="menu-item">
                  Inventory Item Enlistments
                </MenuItem>
                <MenuItem className="menu-item">
                  Inventory Transactions
                </MenuItem>
                <MenuItem className="menu-item">Inventory Reports</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<HiLogout />}
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
