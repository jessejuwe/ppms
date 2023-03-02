'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Nav, NavBar, Footer } from '../exports/exports';
import '../styles/globals.css';

export const metadata = {
  title: {
    default: 'PPMS',
    template: '%s | PPMS',
  },
};

const colors = {
  primary: { 900: '#209CEE', 800: '#5AF', 700: '#5DBBF8' },
  secondary: { 900: '#1a365d', 800: '#153e75', 700: '#2a69ac' },
};

const theme = extendTheme({ colors });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            {/* <Nav /> */}
            <NavBar />
            {children}
            <Footer />
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
