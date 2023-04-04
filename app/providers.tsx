'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/redux/store/store';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { ScrollToTop } from '@/exports/exports';

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
  useEffect(() => {
    // Revealing Elements on Scroll
    const allSections = document.querySelectorAll('.section');

    if (!allSections) return;

    const revealSection = (entries: any, observer: any) => {
      const [entry] = entries;

      // Guard Clause
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    allSections.forEach(section => {
      sectionObserver.observe(section);
      section.classList.add('section--hidden');
    });
  }, []);

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ScrollToTop />
            {children}
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
