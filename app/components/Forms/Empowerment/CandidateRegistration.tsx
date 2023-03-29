'use client';

import React, { useState, useCallback } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Button, FormControl, useToast, VStack } from '@chakra-ui/react';
import {
  Flex,
  Spacer,
  Card,
  CardBody,
  CardFooter,
  Text,
  Select,
} from '@chakra-ui/react';
import { Tooltip } from 'flowbite-react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { uploadCandRegData } from '@/redux/actions/dashboard-actions';
import { dashboardActions } from '@/redux/slices/dashboard-slice';
import { initialValues } from '@/model/CandReg';
import { CandReg } from '@/model';
import { CandRegSchema } from '@/app/utils/validationSchema';
import {
  handy_skills,
  highest_qualification,
  technical_skills,
} from '@/helpers/form-helper';
import { uiActions } from '@/redux/slices/ui-slice';

const CandidateRegistration: React.FC = () => {
  const [option, setOption] = useState('');
  const dispatch = useAppDispatch();

  const toast = useToast();
  const notification = useAppSelector(state => state.ui.notification);

  const handleGoBack = useCallback(() => {
    dispatch(dashboardActions.setActive({ alpha: 'Dashboard', beta: null }));
  }, [dispatch]);

  const handleClear = useCallback(() => {
    dispatch(uiActions.closeNotification());
  }, [dispatch]);

  let content: JSX.Element | any;

  if (option == '') {
    content = '';
  } else if (option == 'BSc' || option == 'MSc' || option == 'PhD') {
    content = technical_skills.map((item, index) => (
      <option key={index} value={item.value}>
        {item.title}
      </option>
    ));
  } else {
    content = handy_skills.map((item, index) => (
      <option key={index} value={item.value}>
        {item.title}
      </option>
    ));
  }

  return (
    <AnimatePresence>
      <motion.div
        className="candidate-reg-form"
        key="candidate-reg-form"
        initial={{ x: 65, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delayChildren: 0.5,
        }}
        exit={{ x: 100, opacity: 0 }}
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
          <CardBody className="card-body">
            <Formik
              initialValues={initialValues}
              //   validationSchema={CandRegSchema}
              onSubmit={(values, action) => {
                action.setSubmitting(true);

                const candidateData: CandReg = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  highest_qualification: option,
                  school_attended: values.school_attended,
                  address: values.address,
                  state_of_origin: values.state_of_origin,
                  local_govt: values.local_govt,
                  town: values.town,
                  community: values.community,
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  skill_of_interest: values.skill_of_interest,
                  acquired_skills: values.acquired_skills,
                  preferred_location: values.preferred_location,
                  timeStamp: serverTimestamp(),
                };

                // Upload candidate data in Firebase
                dispatch(uploadCandRegData(candidateData));

                if (notification) {
                  if (toast.isActive('cand_reg')) return;
                  toast({
                    id: 'cand_reg',
                    title: notification.title,
                    description: notification.message,
                    status: notification.status,
                    duration: 5000,
                    isClosable: true,
                    onCloseComplete: handleClear,
                    position: 'bottom-left',
                  });
                }

                setOption('');

                action.setSubmitting(false);
                action.resetForm();
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Flex align="center" justify="space-between">
                    <VStack className="stack">
                      <Field
                        name="firstName"
                        type="text"
                        placeholder="Firstname"
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
                          type="tel"
                          placeholder="Phone Number"
                          className={`input ${
                            errors.phoneNumber && touched.phoneNumber
                              ? 'error'
                              : ''
                          }`}
                        />
                      </Tooltip>

                      <Field>
                        {({ field }: FieldProps) => (
                          <FormControl id="highest_qualification">
                            <Select
                              variant="outline"
                              id="highest_qualification"
                              name="highest_qualification"
                              placeholder="Highest Qualification"
                              onChange={e => {
                                field.onChange;
                                setOption(e.target.value);
                              }}
                              rounded="md"
                              className="select-option"
                            >
                              {highest_qualification.map((item, index) => (
                                <option key={index} value={item.value}>
                                  {item.title}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Field>

                      <Tooltip
                        content="Example: Unilag, Covenant University, ..."
                        placement="top"
                        style="dark"
                        animation="duration-300"
                        trigger="hover"
                      >
                        <Field
                          name="school_attended"
                          type="text"
                          placeholder="School Attended"
                          className={`input ${
                            errors.school_attended && touched.school_attended
                              ? 'error'
                              : ''
                          }`}
                        />
                      </Tooltip>

                      <Tooltip
                        content="Example: 05 Arila Street, Soluyi Community, Festac, Lagos"
                        placement="top"
                        style="dark"
                        animation="duration-300"
                        trigger="hover"
                      >
                        <Field
                          name="address"
                          type="text"
                          placeholder="Address"
                          className={`input ${
                            errors.address && touched.address ? 'error' : ''
                          }`}
                        />
                      </Tooltip>
                    </VStack>

                    <Spacer />

                    <VStack className="stack">
                      <Tooltip
                        content="Example: Delta"
                        placement="top"
                        style="dark"
                        animation="duration-300"
                        trigger="hover"
                      >
                        <Field
                          name="state_of_origin"
                          type="text"
                          placeholder="State of Origin"
                          className={`input ${
                            errors.state_of_origin && touched.state_of_origin
                              ? 'error'
                              : ''
                          }`}
                        />
                      </Tooltip>

                      <Tooltip
                        content="Example: Aniocha North"
                        placement="top"
                        style="dark"
                        animation="duration-300"
                        trigger="hover"
                      >
                        <Field
                          name="local_govt"
                          type="text"
                          placeholder="Local Government Area (L.G.A.)"
                          className={`input ${
                            errors.local_govt && touched.local_govt
                              ? 'error'
                              : ''
                          }`}
                        />
                      </Tooltip>

                      <Tooltip
                        content="Example: Issele-Uku"
                        placement="top"
                        style="dark"
                        animation="duration-300"
                        trigger="hover"
                      >
                        <Field
                          name="town"
                          type="text"
                          placeholder="Town"
                          className={`input ${
                            errors.town && touched.town ? 'error' : ''
                          }`}
                        />
                      </Tooltip>

                      <Tooltip
                        content="Example: Iduminie"
                        placement="top"
                        style="dark"
                        animation="duration-300"
                        trigger="hover"
                      >
                        <Field
                          name="community"
                          type="text"
                          placeholder="Community"
                          className={`input ${
                            errors.community && touched.community ? 'error' : ''
                          }`}
                        />
                      </Tooltip>

                      <Field>
                        {({ field }: FieldProps) => (
                          <FormControl id="skill_of_interest">
                            <Select
                              variant="outline"
                              id="skill_of_interest"
                              name="skill_of_interest"
                              placeholder="Skill of Interest"
                              onChange={field.onChange}
                              rounded="md"
                              className="select-option"
                            >
                              {content}
                            </Select>
                          </FormControl>
                        )}
                      </Field>

                      <Tooltip
                        content="Example: Pottery, Bead Making, Tye and Dye, ..."
                        placement="top"
                        style="dark"
                        animation="duration-300"
                        trigger="hover"
                      >
                        <Field
                          name="acquired_skills"
                          type="text"
                          placeholder="Acquired Skills"
                          className={`input ${
                            errors.acquired_skills && touched.acquired_skills
                              ? 'error'
                              : ''
                          }`}
                        />
                      </Tooltip>

                      <Tooltip
                        content="Example: Lagos"
                        placement="top"
                        style="dark"
                        animation="duration-300"
                        trigger="hover"
                      >
                        <Field
                          name="preferred_location"
                          type="text"
                          placeholder="Preferred Location"
                          className={`input ${
                            errors.preferred_location &&
                            touched.preferred_location
                              ? 'error'
                              : ''
                          }`}
                        />
                      </Tooltip>
                    </VStack>
                  </Flex>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    variant="solid"
                    loadingText="Submitting ..."
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Register Candidate
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
          <CardFooter>
            <Text
              fontSize="sm"
              onClick={handleGoBack}
              className="hover:underline cursor-pointer"
            >
              Back to Dashboard
            </Text>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default CandidateRegistration;
