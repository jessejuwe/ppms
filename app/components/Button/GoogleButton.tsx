'use client';

import React from 'react';
import { IconButton, Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

type Props = { onClick: () => void };

const GoogleButton = (props: Props) => {
  return (
    <div className="google-button" onClick={props.onClick}>
      <IconButton
        className="icon-btn"
        aria-label="Google sign-in"
        icon={<FcGoogle />}
      />
      <Button className="text-btn">Sign in with Google</Button>
    </div>
  );
};

export default GoogleButton;
