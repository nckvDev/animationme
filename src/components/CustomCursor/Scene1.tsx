'use client';

import React, { useState } from 'react';
import Cursor from './Cursor';

const Scene1 = () => {
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
        className="text-[4.5vw] max-w-[90vw] text-center text-amber-950 p-20"
      >
        The quick brow fox jumps over the lazy dog
      </h1>
      <Cursor isHovered={isHovered} />
    </div>
  );
};

export default Scene1;
