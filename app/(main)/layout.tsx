'use client';

import React from 'react';

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
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
