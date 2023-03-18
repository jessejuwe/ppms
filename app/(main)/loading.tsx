'use client';

import { SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-screen w-full bg-primary-brightest">
      <div className="flex flex-col justify-center items-center gap-2">
        <SkeletonCircle size="10" />
        <SkeletonText
          mt={4}
          noOfLines={4}
          spacing={4}
          skeletonHeight={3}
          startColor="secondary.700"
          endColor="secondary.900"
        />
      </div>
    </div>
  );
}
