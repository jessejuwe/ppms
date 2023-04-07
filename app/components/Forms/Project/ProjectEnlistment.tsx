'use client';

import React, { useCallback } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import { Button, useToast, VStack } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Card, CardBody } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { uploadProjectEnlistmentData } from '@/redux/actions/dashboard-actions';
import { uiActions } from '@/redux/slices/ui-slice';
import { initialValues } from '@/model/ProjectEnlistment';
import { ProjectEnlistmentModel } from '@/model';
import { ProjectEnlistmentSchema } from '@/app/utils/validationSchema';
import { currentDate } from '@/app/utils/currentDate';

const ProjectEnlistment: React.FC = () => {
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
        className="project-enlistment-form"
        key="project-enlistment-form"
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
              // validationSchema={ProjectEnlistmentSchema}
              onSubmit={(values, action) => {
                action.setSubmitting(true);

                const data: ProjectEnlistmentModel = {
                  proj_code: values.proj_code,
                  proj_contractor: values.proj_contractor,
                  contract_duration: values.contract_duration,
                  contract_sum: values.contract_sum,
                  date_of_award: values.date_of_award,
                  dept_in_charge: values.dept_in_charge,
                  payment_status: values.payment_status,
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

                // Upload Project Enlistment data in Firebase
                dispatch(uploadProjectEnlistmentData(data, user));

                if (notification?.status == 'error') {
                  if (toast.isActive('project_enlistment')) return;
                  toast({
                    id: 'project_enlistment',
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
                  if (toast.isActive('project_enlistment')) return;
                  toast({
                    id: 'project_enlistment',
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
                  <div className="spacer">
                    <VStack className="stack">
                      <Field
                        name="proj_code"
                        type="text"
                        placeholder="Project Code"
                        className={`input ${
                          errors.proj_code && touched.proj_code ? 'error' : ''
                        }`}
                      />

                      <Field
                        name="proj_contractor"
                        type="text"
                        placeholder="Project Contractor"
                        className={`input ${
                          errors.proj_contractor && touched.proj_contractor
                            ? 'error'
                            : ''
                        }`}
                      />

                      <Field
                        name="dept_in_charge"
                        type="text"
                        placeholder="Department in Charge"
                        className={`input ${
                          errors.dept_in_charge && touched.dept_in_charge
                            ? 'error'
                            : ''
                        }`}
                      />
                    </VStack>

                    <VStack className="stack">
                      <Field
                        name="contract_duration"
                        type="text"
                        placeholder="Contract Duration"
                        className={`input ${
                          errors.contract_duration && touched.contract_duration
                            ? 'error'
                            : ''
                        }`}
                      />

                      <Field
                        name="contract_sum"
                        type="text"
                        placeholder="Contract Sum"
                        className={`input ${
                          errors.contract_sum && touched.contract_sum
                            ? 'error'
                            : ''
                        }`}
                      />

                      <Field
                        name="payment_status"
                        type="text"
                        placeholder="Payment Status"
                        className={`input ${
                          errors.payment_status && touched.payment_status
                            ? 'error'
                            : ''
                        }`}
                      />
                    </VStack>
                  </div>

                  <FormControl id="date_of_award">
                    <FormLabel htmlFor="date_of_award" mb="0">
                      Date of Award:
                    </FormLabel>
                    <Field
                      id="date_of_award"
                      name="date_of_award"
                      type="date"
                      // value={currentDate}
                      min="2020-01-01"
                      max="2050-12-31"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="solid"
                    loadingText="Enlistening ..."
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Enlist Project
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

export default ProjectEnlistment;
