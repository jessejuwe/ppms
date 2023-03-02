'use client';

import { Navbar, Dropdown, Avatar, Button } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { images } from '../../../constants';

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
      <Button pill={true} color="primary">
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
      <Navbar fluid={true} rounded={true} className="nav">
        <Navbar.Brand href="/" className="nav__logo">
          <Image src={images.logo} className="nav__logo-img" alt="PPMS Logo" />
          <span className="nav__logo-text">PPMS</span>
        </Navbar.Brand>
        <div className="nav__toggle flex md:order-2">
          <div className="output">{output}</div>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="nav__links">
          <Navbar.Link
            href="/"
            // active={path == '/' && true}
            className={`nav__link ${path == '/' && 'active'}`}
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            href="/about"
            active={path == '/about' && true}
            className={`nav__link ${path == '/about' && 'active'}`}
          >
            About
          </Navbar.Link>
          <Dropdown
            arrowIcon={true}
            floatingArrow={true}
            inline={true}
            trigger="hover"
            placement="bottom-end"
            className="nav__dropdown"
            label={
              <Navbar.Link
                className={`nav__link ${path == '/modules' && 'active'}`}
              >
                Services
              </Navbar.Link>
            }
          >
            <Navbar.Link
              href="/modules/epmm"
              active={path == '/modules/epmm' && true}
              className={`nav__link ${path == '/modules/epmm' && 'active'}`}
            >
              Empowerment Program Management
            </Navbar.Link>
            <Dropdown.Divider />
            <Navbar.Link
              href="/modules/cspmm"
              active={path == '/modules/cspmm' && true}
              className={`nav__link ${path == '/modules/cspmm' && 'active'}`}
            >
              Community Support Program Management
            </Navbar.Link>
            <Dropdown.Divider />
            <Navbar.Link
              href="/modules/espmm"
              active={path == '/modules/espmm' && true}
              className={`nav__link ${path == '/modules/espmm' && 'active'}`}
            >
              Education Support Program Management
            </Navbar.Link>
            <Dropdown.Divider />
            <Navbar.Link
              href="/modules/emm"
              active={path == '/modules/emm' && true}
              className={`nav__link ${path == '/modules/emm' && 'active'}`}
            >
              Emergency Management
            </Navbar.Link>
            <Dropdown.Divider />
            <Navbar.Link
              href="/modules/pmm"
              active={path == '/modules/pmm' && true}
              className={`nav__link ${path == '/modules/pmm' && 'active'}`}
            >
              Project Management
            </Navbar.Link>
            <Dropdown.Divider />
            <Navbar.Link
              href="/modules/simm"
              active={path == '/modules/simm' && true}
              className={`nav__link ${path == '/modules/simm' && 'active'}`}
            >
              Store-Inventory Management
            </Navbar.Link>
          </Dropdown>
          <Button className="nav__button" pill={true} color="primary">
            Get Started
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
