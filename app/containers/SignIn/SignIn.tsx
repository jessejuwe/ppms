'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '@chakra-ui/react';
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
import {
  signInUser,
  signInUserGoogle,
  signOutUser,
} from '@/redux/actions/auth-actions';
import { uiActions } from '@/redux/slices/ui-slice';
import { images } from '@/constants';
import { SigninSchema } from '@/app/utils/validationSchema';

const initialValues = { email: '', password: '' };

const SignIn: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.auth.loggedIn);
  const notification = useAppSelector(state => state.ui.notification);

  // dynamic import for lazy loading
  const Modal = dynamic(() => import('../../components/UI/Modal/Modal'));

  const handleProceed = useCallback(() => {
    dispatch(uiActions.closeNotification());
    router.push('/sign-up');
  }, [dispatch, router]);

  const handleSignOut = useCallback(() => {
    dispatch(signOutUser());

    // programmatic navigation to source url
    router.replace('/');
  }, [dispatch, router]);

  // focusing on input field on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleGoogleSignIn = useCallback(() => {
    dispatch(signInUserGoogle());

    // go to dashboard
    router.replace('/dashboard');
  }, [dispatch, router]);

  return (
    <>
      {notification && (
        <Modal
          status={notification.status}
          title={notification.title}
          message={notification.message}
          focus={finalRef}
          btnText={loggedIn ? 'Sign out' : 'Sign up'}
          altAction={loggedIn ? handleSignOut : handleProceed}
        />
      )}
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
                    onSubmit={async (values, action) => {
                      action.setSubmitting(true);

                      if (loggedIn) {
                        dispatch(
                          uiActions.updateNotification({
                            status: 'error',
                            title: 'Already signed in',
                            message: 'User already signed in. Sign out first.',
                          })
                        );

                        action.setSubmitting(false);
                        return;
                      }

                      // signing user in
                      dispatch(signInUser(values.email, values.password));

                      action.setSubmitting(false);

                      action.resetForm();

                      // go to dashboard
                      router.replace('/dashboard');
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
