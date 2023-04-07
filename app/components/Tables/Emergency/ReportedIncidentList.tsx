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

const ReportedIncidentList: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);

  const id = `users_dashboard/${user?.email}/incident_reporting`;
  const col = collection(firestore, id);
  const dataQuery = query(col);

  const [values, loading, error] = useCollectionData(dataQuery);

  return (
    <AnimatePresence>
      <motion.div
        className="reported-incident-list"
        key="reported-incident-list"
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
            <TableCaption>List of Reported Incidents</TableCaption>
            <Thead>
              <Tr>
                <Th>Incident Type</Th>
                <Th>Incident Date</Th>
                <Th>Incident Description</Th>
                <Th>Extent of Damage</Th>
                <Th>Place of Origin</Th>
                <Th>Forwarded Report</Th>
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
                    <Td>{data.incident_type}</Td>
                    <Td>{data.incident_date}</Td>
                    <Td>{data.incident_desc}</Td>
                    <Td>{data.extent_of_damage}</Td>
                    <Td>{`${data.community}, ${data.local_govt}, ${data.state_of_origin}`}</Td>
                    <Td>{data.forward_report}</Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Incident Type</Th>
                <Th>Incident Date</Th>
                <Th>Incident Description</Th>
                <Th>Extent of Damage</Th>
                <Th>Place of Origin</Th>
                <Th>Forwarded Report</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReportedIncidentList;
