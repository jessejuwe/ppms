'use client';

import { useEffect, useRef, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Tooltip } from 'flowbite-react';
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
  Button,
} from '@chakra-ui/react';

import { SignInData, SignUpData } from '@/model';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import {
  sendSignUpData,
  fetchUserData,
  sendLoginData,
} from '@/redux/actions/auth-actions';
import { uiActions } from '@/redux/slices/ui-slice';
import { authActions } from '@/redux/slices/auth-slice';
import { userActions } from '@/redux/slices/user-slice';
import { images } from '@/constants';
import { phoneNumberAutoFormat } from '@/app/utils/numberFormatter';
import { SignupSchema } from '@/app/utils/validationSchema';

// prettier-ignore
const initialValues = { firstName: '', lastName: '', email: '', phoneNumber: '', password: '' };

const SignUp: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);
  const [fetchedData, setFetchedData] = useState<SignUpData[]>();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const notification = useAppSelector(state => state.ui.notification);
  const loggedIn = useAppSelector(state => state.auth.loggedIn);

  // dynamic import for lazy loading
  const Modal = dynamic(() => import('../../components/UI/Modal/Modal'));

  const handleProceed = () => loggedIn && router.replace('/dashboard');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setValue(targetValue);
  };

  // retrieving user data from backend once app loads
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchUserData());
      data && setFetchedData(data);
    };

    fetchData();
  }, [dispatch]);

  // setting focus to input element on load
  useEffect(() => {
    inputRef.current?.focus();
    return () => {};
  }, []);

  return (
    <>
      <div className="">
        {notification && (
          <Modal
            status={notification.status}
            title={notification.title}
            message={notification.message}
            focus={finalRef}
            btnText="Proceed"
            altAction={handleProceed}
          />
        )}
      </div>
      <AnimatePresence>
        <main className="sign-up-align">
          <div className="sign-up-section">
            <motion.div
              className="sign-up-section-img"
              key="sign-up-section-img"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                delayChildren: 0.5,
              }}
              exit={{ opacity: 0 }}
            >
              <Image src={images.signUp} alt="sign-up" priority />
            </motion.div>
            <motion.div
              className="sign-up-section-form"
              key="sign-up-section-form"
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
                  <Heading textTransform="uppercase">Sign up</Heading>
                </CardHeader>
                <CardBody className="card-body">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    onSubmit={(values, action) => {
                      action.setSubmitting(true);

                      const userExists =
                        fetchedData &&
                        fetchedData.find(user => user.email === values.email);

                      // Guard clause
                      if (userExists) {
                        dispatch(
                          uiActions.updateNotification({
                            status: 'error',
                            title: 'Authentication failed',
                            message: 'User already exists',
                          })
                        );

                        action.setSubmitting(false);
                        return;
                      }

                      const uploadSignUp: SignUpData = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        phoneNumber: values.phoneNumber,
                        password: values.password,
                      };

                      const uploadSignIn: SignInData = {
                        name: `${values.firstName} ${values.lastName}`,
                        email: values.email,
                        password: values.password,
                      };

                      // upload user data
                      dispatch(sendSignUpData(uploadSignUp));

                      // upload login data
                      dispatch(sendLoginData(uploadSignIn));

                      // update UI based on user
                      dispatch(
                        userActions.enableUser({
                          name: `${values.firstName} ${values.lastName}`,
                          username: values.email,
                          password: values.password,
                        })
                      );

                      // log user in
                      dispatch(authActions.login());

                      action.resetForm();
                      action.setSubmitting(false);
                    }}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <Field
                          name="firstName"
                          type="text"
                          placeholder="Firstname"
                          innerRef={inputRef}
                          className={`input ${
                            errors.firstName && touched.firstName ? 'error' : ''
                          }`}
                        />
                        <Field
                          name="lastName"
                          type="text"
                          placeholder="Lastname"
                          className={`input ${
                            errors.lastName && touched.lastName ? 'error' : ''
                          }`}
                        />
                        <Tooltip
                          content="Example: someone@example.com"
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
                          />
                        </Tooltip>
                        <Tooltip
                          content="Example: 0803XXX1234"
                          placement="top"
                          style="dark"
                          animation="duration-300"
                          trigger="hover"
                        >
                          <Field
                            name="phoneNumber"
                            type="text"
                            // value={value}
                            // onChange={onChange}
                            maxLength={11}
                            placeholder="Phone number"
                            className={`input ${
                              errors.phoneNumber && touched.phoneNumber
                                ? 'error'
                                : ''
                            }`}
                          />
                        </Tooltip>
                        <Tooltip
                          content="Password must contain capital letter(s), number and special characters"
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
                          colorScheme="blue"
                          variant="solid"
                          loadingText="Submitting ..."
                          isLoading={isSubmitting}
                          disabled={isSubmitting}
                        >
                          Register
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
                <CardFooter className="card-footer">
                  <VStack>
                    <Text fontSize="sm">
                      Already have an account? {}{' '}
                      <Link href="/sign-in" className="sign-in-text">
                        Sign in
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

export default SignUp;
