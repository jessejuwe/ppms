'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Navbar, Dropdown, Button } from 'flowbite-react';
import { Avatar } from '@chakra-ui/react';

import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { images } from '../../../constants';
import { NavLink, DropdownLink } from '@/helpers/nav-helper';

const NavBar: React.FC = () => {
  const [path, setPath] = useState('');

  // selecting pieces of data from the store
  const loggedIn = useAppSelector(state => state.auth.loggedIn);
  const name = useAppSelector(state => state.user.name);
  const email = useAppSelector(state => state.user.username);

  const pathname = usePathname();

  const handleGetPath = useCallback(() => {
    setPath(pathname);
  }, [pathname]);

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
        href="/sign-up"
        hidden={path === '/sign-up'}
        className="sign-up-button"
        outline={false}
      >
        Sign up
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
            name={name}
            src={images.profilePic}
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">{name}</span>
          <span className="block truncate text-sm font-medium">{email}</span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Notifications</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
    );

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
          {NavLink.map((navlink, index) => (
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
                active={path === dropdownLink.path && true}
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
            href="/sign-up"
          >
            Sign up
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default React.memo(NavBar);
