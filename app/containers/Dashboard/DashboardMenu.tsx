'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Button } from 'flowbite-react';
import { FaArrowRight } from 'react-icons/fa';

import { useAppDispatch } from '@/redux/hooks/hooks';
import { uiActions } from '@/redux/slices/ui-slice';
import { dashboardActions } from '@/redux/slices/dashboard-slice';
import { Drawer } from '@/exports/exports';
import { DASHOARD_MODULES } from '@/helpers/modules-helper';

const DashboardMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleOpenDrawer = useCallback(
    (drawer: string) => {
      dispatch(dashboardActions.setDrawer(drawer));
      dispatch(uiActions.openDrawer());
    },
    [dispatch]
  );

  return (
    <>
      <Drawer />
      <div className="dashboard-menu">
        <div className="modules">
          {DASHOARD_MODULES.map((module, index) => (
            <motion.div
              key={`module-${index}`}
              className="module"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileInView={{ opacity: [0, 1] }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                delayChildren: 0.5,
              }}
              exit={{ opacity: 0 }}
            >
              <div className="module-group">
                <Image
                  src={module.img}
                  className="module-group-img"
                  alt="module-image"
                />
                <motion.div
                  key={`module-group-${index}-hover`}
                  className="module-group-hover"
                  whileHover={{ opacity: [0, 1] }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                    staggerChildren: 0.5,
                  }}
                >
                  <motion.div
                    key={`module-group-${index}-hover-icon`}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app_flex"
                  >
                    <Button
                      pill
                      onClick={() => handleOpenDrawer(module.drawer)}
                      color="dark"
                      className="module-button"
                    >
                      <FaArrowRight />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
              <div className="module-link">
                <Text onClick={() => handleOpenDrawer(module.drawer)}>
                  {module.title}
                </Text>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardMenu;
