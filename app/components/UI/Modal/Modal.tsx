'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { uiActions } from '@/redux/slices/ui-slice';
import {
  Button,
  Center,
  Heading,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';

type Props = {
  status: String;
  title: String;
  message: String;
  focus?: any;
  btnText?: string;
  altAction?: () => void;
};

const MainModal: React.FC<Props> = props => {
  const loggedIn = useAppSelector(state => state.auth.loggedIn);
  const notification = useAppSelector(state => state.ui.notification);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(uiActions.closeNotification());

  let specialClasses = '';
  let btnClasses = '';

  if (props.status === 'error') specialClasses = 'notification-error';
  if (props.status === 'success') specialClasses = 'notification-success';
  if (props.status === 'pending') specialClasses = 'notification-pending';

  if (props.status === 'error') btnClasses = 'btn-error';
  if (props.status === 'success') btnClasses = 'btn-success';
  if (props.status === 'pending') btnClasses = 'btn-pending';

  const cssClasses = `notification ${specialClasses}`;

  let isOpen = false;

  if (notification) isOpen = true;

  return (
    <>
      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={handleClose}
        initialFocusRef={props.focus}
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader className={cssClasses} textTransform="uppercase">
            {props.status}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Center>
              <VStack>
                <Heading textTransform="capitalize" size="lg">
                  {props.title}
                </Heading>
                <Text>{props.message}</Text>
              </VStack>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Center>
              <Button
                className={`modal-close-btn ${btnClasses}`}
                mr={3}
                onClick={handleClose}
                ref={props.focus}
              >
                Close
              </Button>
              <Button
                variant="ghost"
                className="modal-proceed-btn"
                onClick={props.altAction}
                isDisabled={!loggedIn && props.btnText === 'Proceed'}
              >
                {props.btnText}
              </Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MainModal;
