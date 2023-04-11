'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, useToast } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { signInUser, signInUserGoogle } from '@/redux/actions/auth-actions';
import { images } from '@/constants';
import { SigninSchema } from '@/app/utils/validationSchema';
import { GoogleButton } from '@/exports/exports';
import { uiActions } from '@/redux/slices/ui-slice';

const initialValues = { email: '', password: '' };

const SignIn: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.auth.loggedIn);
  const notification = useAppSelector(state => state.ui.notification);
  const user = useAppSelector(state => state.auth.user);

  // focusing on input field on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const clearNotification = useCallback(() => {
    dispatch(uiActions.closeNotification());
  }, [dispatch]);

  const handleGoogleSignIn = () => {
    if (loggedIn) {
      toast({
        id: 'already-signed-in-google',
        title: 'Already signed in',
        description: 'Current user needs to sign out.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });

      return;
    }

    dispatch(signInUserGoogle());

    notification &&
      toast({
        id: 'sign-in-notification',
        title: notification.title,
        description: notification.message,
        status: notification.status == 'info' ? 'info' : 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
        onCloseComplete: clearNotification,
      });

    // go to dashboard
    if (loggedIn) router.push('/dashboard');
  };

  return (
    <>
      <AnimatePresence>
        <main className="sign-in-section">
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
              background="blue.700"
              size="sm"
              className="card"
              shadow="xl"
              rounded="lg"
            >
              <CardHeader className="card-header">
                <Heading textTransform="uppercase">Sign in</Heading>
              </CardHeader>
              <CardBody className="card-body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={SigninSchema}
                  onSubmit={(values, action) => {
                    action.setSubmitting(true);

                    if (loggedIn) {
                      toast({
                        id: 'already-signed-in',
                        title: 'Already signed in',
                        description: 'Current user needs to sign out.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom-left',
                      });

                      action.setSubmitting(false);
                      return;
                    }

                    // signing user in
                    dispatch(signInUser(values.email, values.password));

                    action.setSubmitting(false);

                    notification &&
                      toast({
                        id: 'sign-in-notification',
                        title: notification.title,
                        description: notification.message,
                        status:
                          notification.status == 'info' ? 'info' : 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom-left',
                        onCloseComplete: clearNotification,
                      });

                    if (loggedIn) {
                      action.resetForm();

                      // go to dashboard
                      router.push('/dashboard');
                    }
                  }}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email address"
                        className={`input ${
                          errors.email && touched.email ? 'error' : ''
                        }`}
                        innerRef={inputRef}
                      />

                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={`input ${
                          errors.password && touched.password ? 'error' : ''
                        }`}
                      />
                      <Button
                        type="submit"
                        colorScheme="blue"
                        variant="solid"
                        loadingText="Signing in ..."
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        Sign in
                      </Button>
                    </Form>
                  )}
                </Formik>
                <Text fontSize="lg" marginBottom="4" align="center">
                  OR
                </Text>
                <GoogleButton onClick={handleGoogleSignIn} />
              </CardBody>
              <CardFooter className="card-footer">
                <VStack>
                  <Text fontSize="sm">
                    Not registered? {}{' '}
                    <Link href="/sign-up" className="sign-up-text">
                      Create account
                    </Link>
                  </Text>
                  <Text fontSize="sm">
                    <Link href="/" className="homepage-text">
                      Back to homepage
                    </Link>
                  </Text>
                </VStack>
              </CardFooter>
            </Card>
          </motion.div>
        </main>
      </AnimatePresence>
    </>
  );
};

export default React.memo(SignIn);
