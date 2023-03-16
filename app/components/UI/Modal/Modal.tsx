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
  ScaleFade,
} from '@chakra-ui/react';

type Props = {
  status: String;
  title: String;
  message: String;
  focus?: any;
  btnText?: string;
  hidden?: boolean;
  altAction?: () => void;
};

const MainModal: React.FC<Props> = props => {
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
    <ScaleFade initialScale={0.9} in={isOpen}>
      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={handleClose}
        initialFocusRef={props.focus}
        scrollBehavior="inside"
        isCentered
        motionPreset="scale"
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
              hidden={props.hidden}
            >
              {props.btnText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScaleFade>
  );
};

export default MainModal;
