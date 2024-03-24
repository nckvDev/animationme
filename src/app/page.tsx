'use client';

import Scene1 from '@/components/CustomCursor/Scene1';
import Scene2 from '@/components/CustomCursor/Scene2';
import Footer from '@/components/MoveTextSVG/Footer';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="h-dvh">
      <Scene1 />
      {/* <Scene2 /> */}
      <Footer />
    </main>
  );
}
