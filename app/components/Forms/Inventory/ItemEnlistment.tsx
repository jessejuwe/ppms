'use client';

import React, { useCallback } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import { Button, useToast, VStack } from '@chakra-ui/react';
import { Card, CardBody } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { uploadItemEnlistmentData } from '@/redux/actions/dashboard-actions';
import { dashboardActions } from '@/redux/slices/dashboard-slice';
import { uiActions } from '@/redux/slices/ui-slice';
import { initialValues } from '@/model/ItemEnlistment';
import { ItemEnlistmentModel } from '@/model';
import { ItemEnlistmentSchema } from '@/app/utils/validationSchema';

const ItemEnlistment: React.FC = () => {
  const dispatch = useAppDispatch();

  const toast = useToast();
  const notification = useAppSelector(state => state.ui.notification);

  const handleGoBack = useCallback(() => {
    dispatch(dashboardActions.setActive({ alpha: 'Dashboard', beta: null }));
  }, [dispatch]);

  const handleClear = useCallback(() => {
    dispatch(uiActions.closeNotification());
  }, [dispatch]);

  return (
    <AnimatePresence>
      <motion.div
        className="item-enlistment-form"
        key="item-enlistment-form"
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
              // validationSchema={ItemEnlistmentSchema}
              onSubmit={(values, action) => {
                action.setSubmitting(true);

                const data: ItemEnlistmentModel = {
                  item_code: values.item_code,
                  item_model: values.item_model,
                  item_qty: values.item_qty,
                  category: values.category,
                  vendor: values.vendor,
                  timeStamp: serverTimestamp(),
                };

                // Upload Item Enlistment data in Firebase
                dispatch(uploadItemEnlistmentData(data));

                if (notification) {
                  if (toast.isActive('item_enlistment')) return;
                  toast({
                    id: 'item_enlistment',
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
                action.resetForm();
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <VStack className="stack">
                    <Field
                      name="item_code"
                      type="text"
                      placeholder="Item Code"
                      className={`input ${
                        errors.item_code && touched.item_code ? 'error' : ''
                      }`}
                    />

                    <Field
                      name="item_model"
                      type="text"
                      placeholder="Item Model"
                      className={`input ${
                        errors.item_model && touched.item_model ? 'error' : ''
                      }`}
                    />

                    <Field
                      name="item_qty"
                      type="text"
                      placeholder="Item Quantity"
                      className={`input ${
                        errors.item_qty && touched.item_qty ? 'error' : ''
                      }`}
                    />

                    <Field
                      name="category"
                      type="text"
                      placeholder="Category"
                      className={`input ${
                        errors.category && touched.category ? 'error' : ''
                      }`}
                    />

                    <Field
                      name="vendor"
                      type="text"
                      placeholder="Vendor"
                      className={`input ${
                        errors.vendor && touched.vendor ? 'error' : ''
                      }`}
                    />
                  </VStack>

                  <Button
                    type="submit"
                    variant="solid"
                    loadingText="Enlistening ..."
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Enlist Item
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

export default ItemEnlistment;
