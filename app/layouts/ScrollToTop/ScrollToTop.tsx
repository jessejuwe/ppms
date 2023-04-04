'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);

    return () => {};
  }, [pathname]);
  return null;
};

export default ScrollToTop;
