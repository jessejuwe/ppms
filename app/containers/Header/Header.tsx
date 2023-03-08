'use client';

import Image from 'next/image';
import { Button } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';

import { images } from '@/constants';

const Header: React.FC = () => {
  return (
    <AnimatePresence>
      <main className="landing__page">
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
          <h2 className="bold-text">Manage your projects with us</h2>
          <h1 className="head-text">Programs and Project Management System</h1>
          <p className="p-text">
            The Programmes and Projects Management Systems (PPMS) is conceived
            as a Web based application, proposed to provide efficient
            coordination and management of programmes and projects to ensure
            optimal results. The System will assist management to ensure that
            important goals are achieved as planned.
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
          <Image src={images.onlineStats} alt="System" priority />
        </motion.div>
      </main>
    </AnimatePresence>
  );
};

export default Header;
