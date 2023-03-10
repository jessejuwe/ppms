'use client';

import React from 'react';
import Image from 'next/image';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { VStack, Heading, Text, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import { images } from '@/constants';

const Empowerment: React.FC = () => {
  return (
    <main className="service__empowerment">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/services">Services</Breadcrumb.Item>
        <Breadcrumb.Item>Empowerment Program Management</Breadcrumb.Item>
      </Breadcrumb>

      <section className="empowerment-content">
        <div className="empowerment-content-info">
          <h3 className="bold-text">Services</h3>
          <h1 className="head-text">Empowerment Program Management</h1>
          <article>Content goes here</article>

        </div>
        <div className="empowerment-content-img">
          <Image src={images.empowerment} alt="empowerment" />
        </div>
      </section>
    </main>
  );
};

export default Empowerment;
