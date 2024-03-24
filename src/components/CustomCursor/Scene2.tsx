'use client';

import React, { useState } from 'react';
import GradientCursor from './GradientCursor';

const Scene2 = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <div className="h-full flex items-center justify-center">
      <h1
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        className="text-[4.5vw] max-w-[90vw] text-center p-20 z-20"
      >
        The quick brow fox jumps over the lazy dog
      </h1>
      <GradientCursor isHovered={isHovered} />
    </div>
  );
};

export default Scene2;
