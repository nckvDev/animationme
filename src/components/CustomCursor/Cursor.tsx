'use client';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

interface ICursor {
  isHovered: boolean;
}

const Cursor = ({ isHovered }: ICursor) => {
  const size = isHovered ? 400 : 30;
  const circle = useRef(null);
  const mouse = useRef({
    x: 0,
    y: 0,
  });
  const delayedMouse = useRef({
    x: 0,
    y: 0,
  });

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.current = {
      x: clientX,
      y: clientY,
    };

    moveCircle(mouse.current.x, mouse.current.y);
  };

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const moveCircle = (x: number, y: number) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);
    window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
    window.addEventListener('mousemove', manageMouseMove);
    return () => window.removeEventListener('mousemove', manageMouseMove);
  }, []);

  return (
    <div
      ref={circle}
      className="fixed top-0 left-0 bg-[#BCE4F2] rounded-full mix-blend-difference pointer-events-none"
      style={{
        width: size,
        height: size,
        filter: `blur(${isHovered ? 30 : 0}px)`,
        transition: 'height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out',
      }}
    />
  );
};

export default Cursor;
