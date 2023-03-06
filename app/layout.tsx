'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// import './fonts/Inter-Regular.tff';
// import './fonts/Karla-Regular.tff';
// import './fonts/Manrope-Regular.tff';
// import './fonts/SourceSansPro-Regular.tff';
// import './fonts/TiltNeon-Regular.tff';

import { NavBar, Footer } from '../exports/exports';
import '../styles/globals.css';

// export const metadata = {
//   title: {
//     default: 'PPMS',
//     template: '%s | PPMS',
//   },
//   description: 'Programs and Project Management System',
//   icons: {
//     icon: [
//       { url: '/favicon.ico' },
//       { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
//       { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
//     ],
//     shortcut: '/favicon.ico',
//     apple: [
//       { url: '/apple-touch-icon.png' },
//       { url: '/apple-touch-icon.png', sizes: '180x180' },
//     ],
//   },
//   robots: {
//     index: true,
//   },
//   generator: 'Next.js',
//   applicationName: 'PPMS',
//   referrer: 'origin-when-cross-origin',
//   keywords: ['Program', 'Project', 'Management', 'System'],
//   authors: [
//     { name: 'Sam Juwe' },
//     { name: 'Jesse Juwe', url: 'https://jessejuwe.vercel.app' },
//   ],
//   colorScheme: 'dark',
//   creator: 'Jesse Juwe',
//   publisher: 'Vercel',
//   manifest: '/site.webmanifest',
// };

const colors = {
  primary: { 900: '#209CEE', 800: '#5AF', 700: '#5DBBF8' },
  secondary: { 900: '#1a365d', 800: '#153e75', 700: '#2a69ac' },
};

const fonts = {
  inter: `'Inter', sans-serif`,
  karla: `'Karla', sans-serif`,
  tiltNeon: `'Tilt Neon', sans-serif`,
  sourceSansPro: `'Source Sans Pro', sans-serif`,
  manrope: `'Manrope', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);

    return () => {};
  }, [pathName]);

  return (
    <html lang="en">
      <body>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <NavBar />
            {children}
            <Footer />
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
