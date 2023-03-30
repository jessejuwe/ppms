'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';

import { images } from '@/constants';

const Header: React.FC = () => {
  // useEffect for scrolling to top onload
  useEffect(() => {
    const element = document.getElementById('landing__page');

    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <AnimatePresence>
        <main className="landing__page" id="landing__page">
          <motion.div
            key="landing__page-info"
            className="landing__page-info"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            exit={{ opacity: 0 }}
          >
            <h1 className="head-text">HYPPADEC</h1>
            <h2 className="bold-text">
              Programs and Project Management System
            </h2>
            <p className="p-text">
              The Hydroelectric Power Producing Areas Development Commission
              (HYPPADEC), was established by an Act of the National Assembly
              (HYPPADEC establishment Act 2010) to address ecological challenges
              from the operations of Hydroelectric Dams. The Commission now
              operates in six states that include Benue, Kebbi, Kogi, Kwara,
              Niger and Plateau with Headquarters in Minna, Niger State.
            </p>
            <Button
              pill={false}
              className="sign-up"
              href="/sign-up"
              outline={false}
            >
              Get started
            </Button>
          </motion.div>

          <motion.div
            key="landing__page-img"
            className="landing__page-img"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            exit={{ opacity: 0 }}
          >
            <Image src={images.hyppadec} alt="System" priority />
          </motion.div>
        </main>
      </AnimatePresence>
    </>
  );
};

export default Header;
