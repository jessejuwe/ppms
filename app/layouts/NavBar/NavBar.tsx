'use client';

import { Navbar, Dropdown, Avatar, Button } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { images } from '../../../constants';
import { NavLink, DropdownLink } from '@/helpers/nav-helper';

const NavBar: React.FC = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [path, setPath] = useState('');

  const pathname = usePathname();

  useEffect(() => {
    const handleGetPath = () => {
      setPath(pathname);
    };

    handleGetPath();

    window.addEventListener('load', handleGetPath);

    return () => {
      window.removeEventListener('load', handleGetPath);
    };
  }, [pathname]);

  let output;

  if (!signedIn) {
    output = (
      <Button pill={true} color="primary" href="/sign-up">
        Sign up
      </Button>
    );
  }

  if (signedIn)
    output = (
      <Dropdown
        arrowIcon={true}
        inline={true}
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded={true}
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">Bonnie Green</span>
          <span className="block truncate text-sm font-medium">
            name@flowbite.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
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
              // active={path === navlink.path && true}
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
                className={`nav__link ${path === '/modules' && 'active'}`}
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

export default NavBar;
