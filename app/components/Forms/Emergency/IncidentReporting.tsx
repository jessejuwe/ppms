'use client';

import React, { useCallback } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Button, Switch, useToast, VStack, Select } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';

import { Card, CardBody } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { uploadIncidentReportingData } from '@/redux/actions/dashboard-actions';
import { uiActions } from '@/redux/slices/ui-slice';
import { initialValues } from '@/model/IncidentReporting';
import { IncidentReportingModel } from '@/model';
import { IncidentReportingSchema } from '@/app/utils/validationSchema';
import { EXTENT_OF_DAMAGE, INCIDENT_TYPE } from '@/helpers/form-helper';
import { currentDate } from '@/app/utils/currentDate';

const IncidentReporting: React.FC = () => {
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
        className="incident-reporting-form"
        key="incident-reporting-form"
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
              // validationSchema={IncidentReportingSchema}
              onSubmit={(values, action) => {
                action.setSubmitting(true);

                const data: IncidentReportingModel = {
                  incident_type: values.incident_type,
                  incident_date: values.incident_date,
                  incident_desc: values.incident_desc,
                  extent_of_damage: values.extent_of_damage,
                  state_of_origin: values.state_of_origin,
                  local_govt: values.local_govt,
                  community: values.community,
                  forward_report: values.forward_report,
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

                // Upload Incident Reporting data in Firebase
                dispatch(uploadIncidentReportingData(data, user));

                if (notification?.status == 'error') {
                  if (toast.isActive('incident_reporting')) return;
                  toast({
                    id: 'incident_reporting',
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
                  if (toast.isActive('incident_reporting')) return;
                  toast({
                    id: 'incident_reporting',
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
                      <Field>
                        {({ field }: FieldProps) => (
                          <FormControl id="incident_type">
                            <Select
                              variant="outline"
                              id="incident_type"
                              name="incident_type"
                              placeholder="Incident Type"
                              onChange={field.onChange}
                              rounded="md"
                              className="select-option"
                            >
                              {INCIDENT_TYPE.map((item, index) => (
                                <option key={index} value={item.value}>
                                  {item.title}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Field>

                      <Field
                        name="incident_desc"
                        type="text"
                        placeholder="Incident Description"
                        className={`input ${
                          errors.incident_desc && touched.incident_desc
                            ? 'error'
                            : ''
                        }`}
                      />

                      <Field>
                        {({ field }: FieldProps) => (
                          <FormControl id="extent_of_damage">
                            <Select
                              variant="outline"
                              id="extent_of_damage"
                              name="extent_of_damage"
                              placeholder="Extent of Damage"
                              onChange={field.onChange}
                              rounded="md"
                              className="select-option"
                            >
                              {EXTENT_OF_DAMAGE.map((item, index) => (
                                <option key={index} value={item.value}>
                                  {item.title}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                    </VStack>

                    <VStack className="stack">
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

                      <Field
                        name="local_govt"
                        type="text"
                        placeholder="Local Government Area (L.G.A.)"
                        className={`input ${
                          errors.local_govt && touched.local_govt ? 'error' : ''
                        }`}
                      />

                      <Field
                        name="community"
                        type="text"
                        placeholder="Community"
                        className={`input ${
                          errors.community && touched.community ? 'error' : ''
                        }`}
                      />
                    </VStack>
                  </div>

                  <FormControl id="incident_date">
                    <FormLabel htmlFor="incident_date" mb="0">
                      Incident Date:
                    </FormLabel>
                    <Field
                      id="incident_date"
                      name="incident_date"
                      type="date"
                      // value={currentDate}
                      min="2020-01-01"
                      max="2050-12-31"
                    />
                  </FormControl>

                  <Field>
                    {({ field }: FieldProps) => (
                      <FormControl id="forward_report">
                        <FormLabel htmlFor="forward_report" mb="0">
                          Forward report to state coordinator
                        </FormLabel>
                        <Switch
                          id="forward_report"
                          name="forward_report"
                          onChange={field.onChange}
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    type="submit"
                    variant="solid"
                    loadingText="Registering ..."
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Register Incident
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

export default IncidentReporting;
