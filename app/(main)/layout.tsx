'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { Providers } from '../providers';
import Fonts from '../fonts/Fonts';
import { NavBar, Footer } from '../../exports/exports';
import '../../styles/globals.css';

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
        {/* <div id="backdrop-root"></div>
        <div id="overlay-root"></div> */}
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
