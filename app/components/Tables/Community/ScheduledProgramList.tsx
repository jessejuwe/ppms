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

const ScheduledProgramList: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);

  const id = `users_dashboard/${user?.email}/program_execution`;
  const col = collection(firestore, id);
  const dataQuery = query(col);

  const [values, loading, error] = useCollectionData(dataQuery);

  return (
    <AnimatePresence>
      <motion.div
        className="scheduled-program-list"
        key="scheduled-program-list"
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
            <TableCaption>
              List of Programs Scheduled for Execution
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Program Code</Th>
                <Th>Program Name</Th>
                <Th>Program Coordinator</Th>
                <Th>Program Duration</Th>
                <Th>Projected Cost</Th>
                <Th>Date of Assignment</Th>
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
                </Tr>
              )}
              {!loading &&
                values &&
                values.map((data, index) => (
                  <Tr key={index}>
                    <Td>{data.prog_code}</Td>
                    <Td>{data.prog_name}</Td>
                    <Td>{data.prog_coordinator}</Td>
                    <Td>{data.prog_duration}</Td>
                    <Td>{data.projected_cost}</Td>
                    <Td>{data.date_of_assignment}</Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Program Code</Th>
                <Th>Program Name</Th>
                <Th>Program Coordinator</Th>
                <Th>Program Duration</Th>
                <Th>Projected Cost</Th>
                <Th>Date of Assignment</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScheduledProgramList;
