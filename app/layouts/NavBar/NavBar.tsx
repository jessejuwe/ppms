'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar, Dropdown, Button } from 'flowbite-react';
import { Avatar, useToast } from '@chakra-ui/react';

import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { signOutUser } from '@/redux/actions/auth-actions';
import { images } from '../../../constants';
import {
  SignedOutLinks,
  SignedInLinks,
  DropdownLink,
} from '@/helpers/nav-helper';
import { uiActions } from '@/redux/slices/ui-slice';

const NavBar: React.FC = () => {
  const [path, setPath] = useState('');

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();

  // selecting pieces of data from the store
  const loggedIn = useAppSelector(state => state.auth.loggedIn);
  const user = useAppSelector(state => state.auth.user);

  const handleSignOut = useCallback(() => {
    dispatch(signOutUser());
    router.push('/');

    if (toast.isActive('sign-out')) return;

    toast({
      id: 'sign-out',
      title: 'Sign out successful',
      description: 'You have been signed out. Goodbye.',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-left',
    });
  }, [dispatch, router, toast]);

  const handleOpenDrawer = useCallback(() => {
    dispatch(uiActions.openDrawer());
  }, [dispatch]);

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const handleGetPath = useCallback(() => {
    setPath(pathname);
  }, [pathname]);

  // useEffect to run above function
  useEffect(() => {
    handleGetPath();

    window.addEventListener('load', handleGetPath);

    return () => {
      window.removeEventListener('load', handleGetPath);
    };
  }, [handleGetPath, pathname]);

  let output;

  if (!loggedIn) {
    output = (
      <Button
        pill={true}
        color="primary"
        href="/sign-in"
        hidden={path === '/sign-in' || path === '/sign-up'}
        className="sign-up-button"
        outline={false}
      >
        Sign in
      </Button>
    );
  }

  if (loggedIn)
    output = (
      <Dropdown
        arrowIcon={true}
        inline={true}
        label={
          <Avatar
            size="sm"
            bg="primary.800"
            name={user?.displayName || ''}
            src={user?.photoURL || images.profilePic}
          />
        }
      >
        <Dropdown.Header className="dropdown-header">
          <span className="font-semibold text-base mb-2">
            {user?.displayName}
          </span>
          <span className="block truncate text-sm font-medium">
            {user?.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item onClick={() => handleNavigate('/dashboard')}>
          Dashboard
        </Dropdown.Item>
        <Dropdown.Item onClick={handleOpenDrawer}>Menu</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Notifications</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
      </Dropdown>
    );

  const activeLinks = loggedIn ? SignedInLinks : SignedOutLinks;

  return (
    <>
      <Navbar fluid={true} rounded={false} className="nav">
        <Navbar.Brand href="/" className="nav__logo">
          <Image
            src={images.logo}
            className="nav__logo-img"
            alt="PPMS Logo"
            priority
          />
          <span className="nav__logo-text">PPMS</span>
        </Navbar.Brand>
        <div className="nav__toggle flex md:order-2">
          <div className="output">{output}</div>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="nav__links">
          {activeLinks.map((navlink, index) => (
            <Navbar.Link
              key={`${navlink.title} ${index}`}
              href={navlink.to}
              className={`nav__link ${path === navlink.path && 'active'}`}
            >
              {navlink.title}
            </Navbar.Link>
          ))}

          <Dropdown
            arrowIcon={true}
            floatingArrow={true}
            inline={true}
            trigger="hover"
            placement="bottom-end"
            className="nav__dropdown"
            label={
              <Navbar.Link
                href="/services"
                className={`nav__link ${path === '/services' && 'active'}`}
              >
                Services
              </Navbar.Link>
            }
          >
            {DropdownLink.map((dropdownLink, index) => (
              <Navbar.Link
                key={`${dropdownLink.title} ${index}`}
                href={dropdownLink.to}
                className={`nav__link ${
                  path === dropdownLink.path && 'active'
                }`}
              >
                {dropdownLink.title}
              </Navbar.Link>
            ))}
          </Dropdown>
          <Button
            className="nav__button"
            pill={true}
            color="primary"
            href="/sign-in"
          >
            Sign in
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default React.memo(NavBar);
