'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { Providers } from '../providers';
import Fonts from '../fonts/Fonts';
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
        <Providers>
          <Fonts />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
