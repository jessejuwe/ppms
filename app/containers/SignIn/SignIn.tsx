'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
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

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { fetchLoginData } from '@/redux/actions/auth-actions';
import { uiActions } from '@/redux/slices/ui-slice';
import { authActions } from '@/redux/slices/auth-slice';
import { userActions } from '@/redux/slices/user-slice';
import { images } from '@/constants';
import { SigninSchema } from '@/app/utils/validationSchema';
import { SignInData } from '@/model';

const initialValues = { email: '', password: '' };

const SignIn: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);

  const [fetchedData, setFetchedData] = useState<SignInData[]>();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const notification = useAppSelector(state => state.ui.notification);
  // const users = useAppSelector(state => state.auth.users);

  // dynamic import for lazy loading
  const Modal = dynamic(() => import('../../components/UI/Modal/Modal'));

  const handleProceed = () => {
    dispatch(uiActions.closeNotification());
    router.push('/sign-up');
  };

  // retrieving user data from backend once app loads
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchLoginData());
      data && setFetchedData(data);
    };

    fetchData();
  }, [dispatch]);

  // focusing on input field on load
  useEffect(() => {
    inputRef.current?.focus();
    return () => {};
  }, []);

  // const loadedUsers: SignInData[] = [];

  // // Data Transformation Logic for users data
  // for (const key in users) {
  //   loadedUsers.push({
  //     key,
  //     id: users[key].id,
  //     name: users[key].name,
  //     email: users[key].email,
  //     password: users[key].password,
  //   });
  // }

  return (
    <>
      <div className="">
        {notification && (
          <Modal
            status={notification.status}
            title={notification.title}
            message={notification.message}
            focus={finalRef}
            btnText="Sign up"
            altAction={handleProceed}
          />
        )}
      </div>
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
                    onSubmit={(values, action) => {
                      action.setSubmitting(true);

                      // find the user
                      const userExists =
                        fetchedData &&
                        fetchedData.find(user => user.email === values.email);

                      // Guard clause
                      if (!userExists) {
                        console.log('user not found');
                        dispatch(
                          uiActions.updateNotification({
                            status: 'error',
                            title: 'Authentication failed',
                            message: 'Username not found. Sign up.',
                          })
                        );

                        action.setSubmitting(false);
                        return;
                      }

                      // Guard clause
                      if (userExists.password !== values.password) {
                        dispatch(
                          uiActions.updateNotification({
                            status: 'error',
                            title: 'Authentication failed',
                            message: 'Password incorrect. Try again.',
                          })
                        );

                        action.setSubmitting(false);
                        return;
                      }

                      // update UI based on user
                      dispatch(
                        userActions.enableUser({
                          name: userExists.name,
                          username: userExists.email,
                          password: userExists.password,
                        })
                      );

                      // log user in after validation
                      dispatch(authActions.login());

                      action.resetForm();
                      action.setSubmitting(false);

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

export default SignIn;
