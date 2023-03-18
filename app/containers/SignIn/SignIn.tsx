'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  useToast,
} from '@chakra-ui/react';
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
import ReactGoogleButton from 'react-google-button';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { signInUser, signInUserGoogle } from '@/redux/actions/auth-actions';
import { uiActions } from '@/redux/slices/ui-slice';
import { images } from '@/constants';
import { SigninSchema } from '@/app/utils/validationSchema';

const initialValues = { email: '', password: '' };

const SignIn: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.auth.loggedIn);
  const notification = useAppSelector(state => state.ui.notification);

  // focusing on input field on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleGoogleSignIn = useCallback(() => {
    if (loggedIn) {
      if (toast.isActive('already-signed-in')) return;
      toast({
        id: 'already-signed-in',
        title: 'Already signed in',
        description: 'Current user needs to sign out.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-left',
      });

      return;
    }

    dispatch(signInUserGoogle());

    // go to dashboard
    router.push('/dashboard');
  }, [loggedIn, dispatch, router, toast]);

  const alert = notification ? (
    <Alert status={notification.status}>
      <AlertIcon />
      <Box width="full">
        <AlertTitle>{notification.title}</AlertTitle>
        <AlertDescription>{notification.message}</AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={() => dispatch(uiActions.closeNotification())}
      />
    </Alert>
  ) : (
    <div></div>
  );

  return (
    <>
      <AnimatePresence>
        <main className="sign-in-align">
          <motion.div
            className="alert-section"
            key="alert-section"
            initial={{ y: 65, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileInView={{ y: [65, 0], opacity: [0, 1] }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            exit={{ y: 65, opacity: 0 }}
          >
            {notification && alert}
          </motion.div>
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
                        if (toast.isActive('already-signed-in')) return;
                        toast({
                          id: 'already-signed-in',
                          title: 'Already signed in',
                          description: 'Current user needs to sign out.',
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                          position: 'bottom-left',
                        });

                        action.setSubmitting(false);
                        return;
                      }

                      // signing user in
                      dispatch(signInUser(values.email, values.password));

                      action.setSubmitting(false);

                      if (!loggedIn) return;

                      action.resetForm();

                      // go to dashboard
                      router.push('/dashboard');

                      if (toast.isActive('sign-in')) return;

                      toast({
                        id: 'sign-in',
                        title: 'Sign in successful',
                        description: 'Welcome to your dashboard.',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                        position: 'bottom-left',
                      });
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
                  <ReactGoogleButton
                    className="google-button"
                    onClick={handleGoogleSignIn}
                  />
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
          </div>
        </main>
      </AnimatePresence>
    </>
  );
};

export default React.memo(SignIn);
