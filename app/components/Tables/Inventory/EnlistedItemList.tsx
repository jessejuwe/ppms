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

const EnlistedItemList: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);

  const id = `users_dashboard/${user?.email}/item_enlistment`;
  const col = collection(firestore, id);
  const dataQuery = query(col);

  const [values, loading, error] = useCollectionData(dataQuery);

  return (
    <AnimatePresence>
      <motion.div
        className="enlisted-item-list"
        key="enlisted-item-list"
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
            <TableCaption>List of Enlisted Items</TableCaption>
            <Thead>
              <Tr>
                <Th>Item Code</Th>
                <Th>Item Model</Th>
                <Th>Item Quantity</Th>
                <Th>Category</Th>
                <Th>Vendor</Th>
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
                </Tr>
              )}
              {loading && (
                <Tr>
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
                </Tr>
              )}
              {!loading &&
                values &&
                values.map((data, index) => (
                  <Tr key={index}>
                    <Td>{data.item_code}</Td>
                    <Td>{data.item_model}</Td>
                    <Td>{data.item_qty}</Td>
                    <Td>{data.category}</Td>
                    <Td>{data.vendor}</Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Item Code</Th>
                <Th>Item Model</Th>
                <Th>Item Quantity</Th>
                <Th>Category</Th>
                <Th>Vendor</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnlistedItemList;
