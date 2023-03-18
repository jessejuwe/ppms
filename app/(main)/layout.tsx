'use client';

import React, { useEffect } from 'react';

import { Providers } from '../providers';
import Fonts from '../fonts/Fonts';
import { NavBar, Footer } from '../../exports/exports';
import '../../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // useEffect for scrolling to top onload
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <html lang="en">
      <body>
        <Providers>
          <Fonts />
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
