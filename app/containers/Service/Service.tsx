'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAppSelector } from '@/redux/hooks/hooks';

type Props = {
  breadcrumb: String;
  title: String;
  content: String;
  img: any;
  alt: string;
};

const Service: React.FC<Props> = props => {
  const loggedIn = useAppSelector(state => state.auth.loggedIn);

  return (
    <main className="service">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/services">Services</Breadcrumb.Item>
        <Breadcrumb.Item>{props.breadcrumb}</Breadcrumb.Item>
      </Breadcrumb>

      <section className="service-content">
        <AnimatePresence>
          <motion.div
            className="service-content-info"
            key="service-content-info"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            exit={{ opacity: 0 }}
          >
            <h3 className="bold-text">Services</h3>
            <h1 className="head-text">{props.title}</h1>
            <article>{props.content}</article>
            <Button size="sm">
              <Link href={loggedIn ? '/dashboard' : '/sign-up'}>
                {loggedIn ? 'Go to dashboard' : 'Get started'}
              </Link>
            </Button>
          </motion.div>
          <motion.div
            className="service-content-img"
            key="service-content-img"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            exit={{ opacity: 0 }}
          >
            <Image src={props.img} alt={props.alt} />
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
};

export default Service;
