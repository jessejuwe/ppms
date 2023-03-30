'use client';

import React, { useCallback } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Button, useToast, VStack, Select } from '@chakra-ui/react';
import { Flex, Spacer, FormControl, FormLabel } from '@chakra-ui/react';
import { Card, CardBody } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { uploadStudRegData } from '@/redux/actions/dashboard-actions';
import { dashboardActions } from '@/redux/slices/dashboard-slice';
import { uiActions } from '@/redux/slices/ui-slice';
import { initialValues } from '@/model/StudReg';
import { StudRegModel } from '@/model';
import { StudRegSchema } from '@/app/utils/validationSchema';
import { SUPPORT_SCHEME } from '@/helpers/form-helper';

const StudentRegistration: React.FC = () => {
  const dispatch = useAppDispatch();

  const toast = useToast();
  const notification = useAppSelector(state => state.ui.notification);

  const handleClear = useCallback(() => {
    dispatch(uiActions.closeNotification());
  }, [dispatch]);

  return (
    <AnimatePresence>
      <motion.div
        className="student-reg-form"
        key="student-reg-form"
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
              // validationSchema={StudRegSchema}
              onSubmit={(values, action) => {
                action.setSubmitting(true);

                const studentData: StudRegModel = {
                  fullName: values.fullName,
                  school_name: values.school_name,
                  department: values.department,
                  address: values.address,
                  state_of_origin: values.state_of_origin,
                  local_govt: values.local_govt,
                  community: values.community,
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  support_scheme: values.support_scheme,
                  school_id: values.school_id,
                  admission_letter: values.admission_letter,
                  last_semester_result: values.last_semester_result,
                  timeStamp: serverTimestamp(),
                };

                // Upload Student data in Firebase
                dispatch(uploadStudRegData(studentData));

                if (notification) {
                  if (toast.isActive('stud_reg')) return;
                  toast({
                    id: 'stud_reg',
                    title: notification.title,
                    description: notification.message,
                    status: notification.status,
                    duration: 5000,
                    isClosable: true,
                    onCloseComplete: handleClear,
                    position: 'bottom-left',
                  });
                }

                action.setSubmitting(false);
                // action.resetForm();
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Flex align="center" justify="space-between">
                    <VStack className="stack">
                      <Field
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                        className={`input ${
                          errors.fullName && touched.fullName ? 'error' : ''
                        }`}
                      />

                      <Field
                        name="school_name"
                        type="text"
                        placeholder="School Name"
                        className={`input ${
                          errors.school_name && touched.school_name
                            ? 'error'
                            : ''
                        }`}
                      />

                      <Field
                        name="department"
                        type="text"
                        placeholder="Department"
                        className={`input ${
                          errors.department && touched.department ? 'error' : ''
                        }`}
                      />

                      <Field
                        name="email"
                        type="email"
                        placeholder="Email address"
                        className={`input ${
                          errors.email && touched.email ? 'error' : ''
                        }`}
                      />

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
                    </VStack>

                    <Spacer />

                    <VStack className="stack">
                      <Field
                        name="address"
                        type="text"
                        placeholder="Address"
                        className={`input ${
                          errors.address && touched.address ? 'error' : ''
                        }`}
                      />

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

                      <Field>
                        {({ field }: FieldProps) => (
                          <FormControl id="support_scheme">
                            <Select
                              variant="outline"
                              id="support_scheme"
                              name="support_scheme"
                              placeholder="Support Scheme"
                              onChange={field.onChange}
                              rounded="md"
                              className="select-option"
                            >
                              {SUPPORT_SCHEME.map((item, index) => (
                                <option key={index} value={item.value}>
                                  {item.title}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                  </Flex>

                  <FormControl id="school_id">
                    <FormLabel htmlFor="school_id" mb="0">
                      School ID Card:
                    </FormLabel>
                    <Field
                      name="school_id"
                      id="school_id"
                      type="file"
                      accept=".pdf, image/png, image/jpg, image/jpeg"
                    />
                  </FormControl>

                  <FormControl id="admission_letter">
                    <FormLabel htmlFor="admission_letter" mb="0">
                      Admission Letter:
                    </FormLabel>
                    <Field
                      name="admission_letter"
                      id="admission_letter"
                      type="file"
                      accept=".pdf, image/png, image/jpg, image/jpeg"
                    />
                  </FormControl>

                  <FormControl id="last_semester_result">
                    <FormLabel htmlFor="last_semester_result" mb="0">
                      Last Semester Result:
                    </FormLabel>
                    <Field
                      name="last_semester_result"
                      id="last_semester_result"
                      type="file"
                      accept=".pdf, image/png, image/jpg, image/jpeg"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="solid"
                    loadingText="Registering ..."
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Register Student
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

export default StudentRegistration;
