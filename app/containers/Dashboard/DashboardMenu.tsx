'use client';

import React, { useCallback } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react';

import { useAppDispatch } from '@/redux/hooks/hooks';
import { uiActions } from '@/redux/slices/ui-slice';
import { dashboardActions } from '@/redux/slices/dashboard-slice';
import { Drawer, DashboardModal } from '@/exports/exports';

const DashboardMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleOpenDrawer = useCallback(
    (drawer: string) => {
      dispatch(dashboardActions.setDrawer(drawer));
      dispatch(uiActions.openDrawer());
    },
    [dispatch]
  );

  return (
    <>
      <Drawer />
      <div className="dashboard-menu">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: 'secondary.700', color: 'white' }}
              >
                <Box as="span" flex="1" textAlign="left">
                  Youth Empowerment
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="start" justify="center">
                <Text>
                  One of the primary aims of HYPPADEC Empowerment initiatives is
                  to reduce the level of unemployment in the HYPPADEC member
                  states, through skill acquisition programmes code named Youth
                  Transformation. Skill acquisition is one of the strategic
                  paths towards helping the youths to actualize their dreams and
                  aid those who are not privileged to secure employment.
                </Text>
                <Button
                  onClick={() => handleOpenDrawer('Youth Empowerment')}
                  variant="outline"
                  size="sm"
                  colorScheme="facebook"
                >
                  See options
                </Button>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: 'secondary.700', color: 'white' }}
              >
                <Box as="span" flex="1" textAlign="left">
                  Community Empowerment
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="start" justify="center">
                <Text>
                  The HYPPADEC Community Support Programme (CSP) strives to
                  improve the wellbeing of individuals living in the affected
                  HYPPADEC communities. CSP aims to identify the communities
                  issues and introduce intervention scheme to resolve the
                  issues. The focus is on the following key areas - Relief
                  Intervention, Poverty Alleviation, Empowerment, Medical
                  Outreach, Fertilizer Distribution, Others areas as may be
                  considered to be of critical importance.
                </Text>
                <Button
                  onClick={() => handleOpenDrawer('Community Empowerment')}
                  variant="outline"
                  size="sm"
                  colorScheme="facebook"
                >
                  See options
                </Button>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: 'secondary.700', color: 'white' }}
              >
                <Box as="span" flex="1" textAlign="left">
                  Education Empowerment
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="start" justify="center">
                <Text>
                  HYPPADEC recognizes that funding education is increasingly
                  becoming a challenge for many students, therefore, the
                  Education Support Programme (ESP) is targeted at providing
                  financial support to indigent students of affected areas of
                  HYPPADEC member states, in tertiary educational institution.
                  This is in line with the overarching mandate of the
                  Commission. Students can take advantage of either the bursary
                  scheme or scholarship funding.
                </Text>
                <Button
                  onClick={() => handleOpenDrawer('Education Empowerment')}
                  variant="outline"
                  size="sm"
                  colorScheme="facebook"
                >
                  See options
                </Button>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: 'secondary.700', color: 'white' }}
              >
                <Box as="span" flex="1" textAlign="left">
                  Emergency Management
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="start" justify="center">
                <Text>
                  The Emergency Management module is aimed at prompting quick
                  responses required to ensure adequate management of emergency
                  situation, most especially as it relates to flooding.
                </Text>
                <Button
                  onClick={() => handleOpenDrawer('Emergency Management')}
                  variant="outline"
                  size="sm"
                  colorScheme="facebook"
                >
                  See options
                </Button>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: 'secondary.700', color: 'white' }}
              >
                <Box as="span" flex="1" textAlign="left">
                  Project Management
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="start" justify="center">
                <Text>Content goes here.</Text>
                <Button
                  onClick={() => handleOpenDrawer('Project Management')}
                  variant="outline"
                  size="sm"
                  colorScheme="facebook"
                >
                  See options
                </Button>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: 'secondary.700', color: 'white' }}
              >
                <Box as="span" flex="1" textAlign="left">
                  Inventory Management
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="start" justify="center">
                <Text>Content goes here.</Text>
                <Button
                  onClick={() => handleOpenDrawer('Inventory Management')}
                  variant="outline"
                  size="sm"
                  colorScheme="facebook"
                >
                  See options
                </Button>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default DashboardMenu;
