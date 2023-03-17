'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';

import { uiActions } from '@/redux/slices/ui-slice';
import { images } from '@/constants';
import { Modal } from '@/exports/exports';

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const notification = useAppSelector(state => state.ui.notification);

  const handleProceed = useCallback(() => {
    dispatch(uiActions.closeNotification());
    router.push('/sign-in');
  }, [dispatch, router]);

  return (
    <>
      {notification && (
        <Modal
          status={notification.status}
          title={notification.title}
          message={notification.message}
          btnText="Sign in"
          altAction={handleProceed}
        />
      )}
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
            <h1 className="head-text">
              Programs and Project Management System
            </h1>
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
    </>
  );
};

export default Header;
