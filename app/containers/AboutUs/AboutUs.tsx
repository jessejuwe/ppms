'use client';

import Image from 'next/image';
import { Button } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';

import { images } from '@/constants';

const AboutUs: React.FC = () => {
  return (
    <AnimatePresence>
      <main className="about__us">
        <motion.div
          key="about__us-info"
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
          <h2 className="bold-text">About Us</h2>
          <h1 className="head-text">Our Mission</h1>
          <p className="p-text">
            To mobilize and utilize human and material resources towards
            ameliorating the sufferings of the people in the HYPPADEC member
            states, in the most transparent, accountable and cost-effective
            manner.
          </p>
          <Button pill={false} className="sign-up" href="/sign-up">
            Get started
          </Button>
        </motion.div>

        <motion.div
          key="about__us-img"
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
          <Image src={images.moonlight} alt="System" priority />
        </motion.div>
      </main>
    </AnimatePresence>
  );
};

export default AboutUs;
