'use client';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

interface ICursor {
  isHovered: boolean;
}

const colors = ['#C32d27', '#F5C63F', '#457EC4', '#356FDB'];

const GradientCursor = ({ isHovered }: ICursor) => {
  const size = isHovered ? 300 : 30;
  const delay = isHovered ? 0.015 : 0.005;
  const circles = useRef<(HTMLDivElement | null)[]>([]);
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
    circles.current.forEach((circle, i) => {
      gsap.set(circle, { x, y, xPercent: -50, yPercent: -50 });
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {colors.map((color, i, array) => {
        return (
          <div
            key={color}
            ref={(ref) => {
              circles.current[i] = ref;
            }}
            className="fixed top-0 left-0 bg-[#BCE4F2] rounded-full mix-blend-difference pointer-events-none"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              filter: `blur(${isHovered ? 20 : 0}px)`,
              transition: `height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out, transform ${
                (array.length - i) * delay
              }s ease-out`,
            }}
          />
        );
      })}
    </>
  );
};

export default GradientCursor;
