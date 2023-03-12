'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

import { images } from '@/constants';
import { MODULES } from '@/helpers/modules-helper';

const ModulesPage: React.FC = () => {
  const clickScrollHandler = () => {
    const element = document.getElementById('modules');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="services" key="services">
        <motion.div
          key="services-info"
          className="services-info"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            delayChildren: 0.5,
          }}
          exit={{ opacity: 0 }}
        >
          <h2 className="bold-text">Services</h2>
          <h1 className="head-text">
            PPMS offers 6 major services and those services have sub services.
          </h1>
          <p className="p-text">
            The all-in-one Program and Project Management platform to assist
            mananegment, save time and increase overall performance.
          </p>
          <Button
            pill={false}
            className="services-button"
            onClick={clickScrollHandler}
          >
            See services
          </Button>
        </motion.div>

        <motion.div
          key="services-img"
          className="services-img"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            delayChildren: 0.5,
          }}
          exit={{ opacity: 0 }}
        >
          <Image src={images.posts} alt="System" priority />
        </motion.div>
      </div>

      <div className="modules-section" id="modules" key="modules">
        <h1>Our Services</h1>
        <div className="modules">
          {MODULES.map((module, index) => (
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
                    // whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app_flex"
                  >
                    <Button
                      pill
                      href={module.to}
                      color="dark"
                      className="module-button"
                    >
                      <FaArrowRight />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
              <div className="module-link">
                <Link href={module.to}>{module.title}</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ModulesPage;
