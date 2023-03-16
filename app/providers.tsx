'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/redux/store/store';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  primary: { 900: '#209CEE', 800: '#5AF', 700: '#5DBBF8' },
  secondary: { 900: '#1a365d', 800: '#153e75', 700: '#2a69ac' },
};

const fonts = {
  heading: `'Karla', sans-serif`,
  body: `'Inter', sans-serif`,
  // body: `'Tilt Neon', sans-serif`,
  // body: `'Source Sans Pro', sans-serif`,
  // body: `'Manrope', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
