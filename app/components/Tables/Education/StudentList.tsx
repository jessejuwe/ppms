'use client';

import React from 'react';
import { collection, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { firestore } from '@/firebase/clientApp';
import { useAppSelector } from '@/redux/hooks/hooks';

const StudentList: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);

  const id = `users_dashboard/${user?.email}/student_registration`;
  const col = collection(firestore, id);
  const dataQuery = query(col);

  const [values, loading, error] = useCollectionData(dataQuery);

  return (
    <AnimatePresence>
      <motion.div
        className="student-list"
        key="student-list"
        initial={{ y: 65, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delayChildren: 0.5,
        }}
        exit={{ y: 65, opacity: 0 }}
      >
        <TableContainer>
          <Table variant="striped" colorScheme="blue" size="md">
            <TableCaption>List of Prospective Students</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>School</Th>
                <Th>Department</Th>
                <Th>Address</Th>
                <Th>Place of Origin</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Support Scheme</Th>
              </Tr>
            </Thead>
            <Tbody>
              {error && (
                <Tr>
                  <Td>error ⛔</Td>
                  <Td>error ⛔</Td>
                  <Td>error ⛔</Td>
                  <Td>error ⛔</Td>
                  <Td>error ⛔</Td>
                  <Td>error ⛔</Td>
                  <Td>error ⛔</Td>
                  <Td>error ⛔</Td>
                </Tr>
              )}
              {loading && (
                <Tr>
                  <Td>loading ⚡</Td>
                  <Td>loading ⚡</Td>
                  <Td>loading ⚡</Td>
                  <Td>loading ⚡</Td>
                  <Td>loading ⚡</Td>
                  <Td>loading ⚡</Td>
                  <Td>loading ⚡</Td>
                  <Td>loading ⚡</Td>
                </Tr>
              )}
              {!loading && values?.length == 0 && (
                <Tr>
                  <Td>no data</Td>
                  <Td>no data</Td>
                  <Td>no data</Td>
                  <Td>no data</Td>
                  <Td>no data</Td>
                  <Td>no data</Td>
                  <Td>no data</Td>
                  <Td>no data</Td>
                </Tr>
              )}
              {!loading &&
                values &&
                values.map((data, index) => (
                  <Tr key={index}>
                    <Td>{data.fullName}</Td>
                    <Td>{data.school_name}</Td>
                    <Td>{data.department}</Td>
                    <Td>{data.address}</Td>
                    <Td>{`${data.community}, ${data.local_govt}, ${data.state_of_origin}`}</Td>
                    <Td>{data.email}</Td>
                    <Td>{data.phoneNumber}</Td>
                    <Td>{data.support_scheme}</Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Name</Th>
                <Th>School</Th>
                <Th>Department</Th>
                <Th>Address</Th>
                <Th>Place of Origin</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Support Scheme</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default StudentList;
