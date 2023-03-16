'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar, Dropdown, Button } from 'flowbite-react';
import { Avatar, Text } from '@chakra-ui/react';

import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { signOutUser, verifyLoggedInUser } from '@/redux/actions/auth-actions';
import { uiActions } from '@/redux/slices/ui-slice';
import { images } from '../../../constants';
import {
  SignedOutLinks,
  SignedInLinks,
  DropdownLink,
} from '@/helpers/nav-helper';
import { Modal } from '@/exports/exports';

const NavBar: React.FC = () => {
  const [path, setPath] = useState('');
  const finalRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // selecting pieces of data from the store
  const loggedIn = useAppSelector(state => state.auth.loggedIn);
  const user = useAppSelector(state => state.auth.user);
  const notification = useAppSelector(state => state.ui.notification);

  // useEffect for verifying if user is loggedIn onload
  useEffect(() => {
    dispatch(verifyLoggedInUser());
  }, [dispatch]);

  const handleSignOut = useCallback(() => {
    dispatch(signOutUser());

    // programmatic navigation to source url
    router.replace('/');
  }, [dispatch, router]);

  const handleProceed = useCallback(() => {
    dispatch(uiActions.closeNotification());
    router.push('/sign-in');
  }, [dispatch, router]);

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
        <Dropdown.Header>
          <span className="block text-sm">{user?.displayName}</span>
          <span className="block truncate text-sm font-medium">
            {user?.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item onClick={() => handleNavigate('/dashboard')}>
          Dashboard
        </Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Notifications</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
      </Dropdown>
    );

  const activeLinks = loggedIn ? SignedInLinks : SignedOutLinks;

  return (
    <>
      {notification && (
        <Modal
          status={notification.status}
          title={notification.title}
          message={notification.message}
          focus={finalRef}
          btnText="Sign in"
          altAction={handleProceed}
        />
      )}
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
            <Link
              key={`${navlink.title} ${index}`}
              href={navlink.to}
              // onClick={() => handleNavigate(navlink.to)}
              className={`nav__link ${path === navlink.path && 'active'}`}
            >
              {navlink.title}
            </Link>
          ))}

          <Dropdown
            arrowIcon={true}
            floatingArrow={true}
            inline={true}
            trigger="hover"
            placement="bottom-end"
            className="nav__dropdown"
            label={
              <Link
                href="/services"
                // onClick={() => handleNavigate('/services')}
                className={`nav__link ${path === '/services' && 'active'}`}
              >
                Services
              </Link>
            }
          >
            {DropdownLink.map((dropdownLink, index) => (
              <Link
                key={`${dropdownLink.title} ${index}`}
                href={dropdownLink.to}
                // onClick={() => handleNavigate(dropdownLink.to)}
                // active={path === dropdownLink.path && true}
                className={`nav__link ${
                  path === dropdownLink.path && 'active'
                }`}
              >
                {dropdownLink.title}
              </Link>
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
