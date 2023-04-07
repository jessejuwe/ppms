'use client';

import React, { useCallback } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import { Button, useToast, VStack } from '@chakra-ui/react';
import { Card, CardBody } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { uploadProjectExecutionData } from '@/redux/actions/dashboard-actions';
import { uiActions } from '@/redux/slices/ui-slice';
import { initialValues } from '@/model/ProgramExecution';
import { ProgramExecutionModel } from '@/model';
import { ProgramExecutionSchema } from '@/app/utils/validationSchema';
import { currentDate } from '@/app/utils/currentDate';

const ProgramExecution: React.FC = () => {
  const dispatch = useAppDispatch();

  const toast = useToast();
  const notification = useAppSelector(state => state.ui.notification);
  const user = useAppSelector(state => state.auth.user);

  const handleClear = useCallback(() => {
    dispatch(uiActions.closeNotification());
  }, [dispatch]);

  return (
    <AnimatePresence>
      <motion.div
        className="program-execution-form"
        key="program-execution-form"
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
              // validationSchema={ProgramExecutionSchema}
              onSubmit={(values, action) => {
                action.setSubmitting(true);

                const data: ProgramExecutionModel = {
                  prog_code: values.prog_code,
                  prog_name: values.prog_name,
                  prog_coordinator: values.prog_coordinator,
                  prog_duration: values.prog_duration,
                  projected_cost: values.projected_cost,
                  date_of_assignment: values.date_of_assignment,
                  timeStamp: serverTimestamp(),
                };

                if (!user) {
                  if (toast.isActive('user_not_found')) return;
                  toast({
                    id: 'user_not_found',
                    title: 'User not found',
                    description: `No user was found. Make sure you're logged in.`,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom-left',
                  });

                  return;
                }

                // Upload candidate data in Firebase
                dispatch(uploadProjectExecutionData(data, user));

                if (notification?.status == 'error') {
                  if (toast.isActive('program_execution')) return;
                  toast({
                    id: 'program_execution',
                    title: notification.title,
                    description: notification.message,
                    status: notification.status,
                    duration: 4000,
                    isClosable: true,
                    onCloseComplete: handleClear,
                    position: 'bottom-left',
                  });

                  action.setSubmitting(false);
                  return;
                }

                if (notification?.status == 'success') {
                  if (toast.isActive('program_execution')) return;
                  toast({
                    id: 'program_execution',
                    title: notification.title,
                    description: notification.message,
                    status: notification.status,
                    duration: 4000,
                    isClosable: true,
                    onCloseComplete: handleClear,
                    position: 'bottom-left',
                  });

                  action.setSubmitting(false);
                  action.resetForm();
                }
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <VStack className="stack">
                    <Field
                      name="prog_code"
                      type="text"
                      placeholder="Program Code"
                      className={`input ${
                        errors.prog_code && touched.prog_code ? 'error' : ''
                      }`}
                    />

                    <Field
                      name="prog_name"
                      type="text"
                      placeholder="Program Name"
                      className={`input ${
                        errors.prog_name && touched.prog_name ? 'error' : ''
                      }`}
                    />

                    <Field
                      name="prog_coordinator"
                      type="text"
                      placeholder="Program Coordinator"
                      className={`input ${
                        errors.prog_coordinator && touched.prog_coordinator
                          ? 'error'
                          : ''
                      }`}
                    />

                    <Field
                      name="prog_duration"
                      type="text"
                      placeholder="Program Duration"
                      className={`input ${
                        errors.prog_duration && touched.prog_duration
                          ? 'error'
                          : ''
                      }`}
                    />

                    <Field
                      name="projected_cost"
                      type="text"
                      placeholder="Projected Cost"
                      className={`input ${
                        errors.projected_cost && touched.projected_cost
                          ? 'error'
                          : ''
                      }`}
                    />
                  </VStack>

                  <FormControl id="date_of_assignment">
                    <FormLabel htmlFor="date_of_assignment" mb="0">
                      Assigned On:
                    </FormLabel>
                    <Field
                      id="date_of_assignment"
                      name="date_of_assignment"
                      type="date"
                      // value={currentDate}
                      min="2020-01-01"
                      max="2050-12-31"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="solid"
                    loadingText="Submitting ..."
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProgramExecution;
