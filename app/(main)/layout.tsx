'use client';

import React, { Suspense } from 'react';

import Loading from './loading';
import { Providers } from '../providers';
import Fonts from '../fonts/Fonts';
import { ScrollToTop, NavBar, Footer } from '@/exports/exports';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Fonts />
          <NavBar />
          <ScrollToTop />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
