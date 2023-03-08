'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Tooltip } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';

import { images } from '@/constants';

import { SigninSchema } from '@/app/utils/validationSchema';

// prettier-ignore
const initialValues = {email: '', password: '' };

const SignIn: React.FC = () => {
  const submitHandler = useCallback(() => {}, []);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    return () => {};
  }, []);

  return (
    <AnimatePresence>
      <main className="sign-in-align">
        <div className="sign-in-section">
          <motion.div
            className="sign-in-section-img"
            key="sign-in-section-img"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            exit={{ opacity: 0 }}
          >
            <Image src={images.join} alt="sign-in" priority />
          </motion.div>
          <motion.div
            className="sign-in-section-form"
            key="sign-in-section-form"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            exit={{ opacity: 0 }}
          >
            <Card
              align="center"
              overflow="hidden"
              color="white"
              background="gray.800"
              size="sm"
              className="card"
            >
              <CardHeader className="card-header">
                <Heading textTransform="uppercase">Sign up</Heading>
              </CardHeader>
              <CardBody className="card-body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={SigninSchema}
                  onSubmit={(values, action) => {
                    try {
                    } catch (error) {}
                  }}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <Tooltip
                        content="Enter your email address"
                        placement="top"
                        style="dark"
                        animation="duration-300"
                        trigger="hover"
                      >
                        <Field
                          name="email"
                          type="email"
                          placeholder="Email address"
                          className={`input ${
                            errors.email && touched.email ? 'error' : ''
                          }`}
                          innerRef={inputRef}
                        />
                      </Tooltip>

                      <Tooltip
                        content="Enter your password"
                        placement="top"
                        style="dark"
                        animation="duration-300"
                        trigger="hover"
                      >
                        <Field
                          name="password"
                          type="password"
                          placeholder="Password"
                          className={`input ${
                            errors.password && touched.password ? 'error' : ''
                          }`}
                        />
                      </Tooltip>
                      <Button
                        type="submit"
                        color="success"
                        disabled={isSubmitting}
                      >
                        Sign in
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
              <CardFooter className="card-footer">
                <Text fontSize="sm">
                  Don&apos;t have an account? {}{' '}
                  <Link href="/sign-up" className="sign-up-text">
                    Sign in
                  </Link>
                </Text>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
    </AnimatePresence>
  );
};

export default SignIn;
