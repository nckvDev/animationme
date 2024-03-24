import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const Footer = () => {
  const container = useRef(null);
  const texts = useRef<(SVGTextPathElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    scrollYProgress.on('change', (e) => {
      texts.current.forEach((text, i) => {
        text?.setAttribute('startOffset', -40 + i * 43 + e * 43 + '%');
      });
    });
  }, []);

  return (
    <div ref={container}>
      <svg className="mb-40" viewBox="0 0 250 90">
        <path id="curve" fill="none" d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68" />
        <text className="text-[6px] uppercase" style={{ color: 'red' }}>
          {[...Array(3)].map((_, i) => {
            return (
              <textPath key={i} ref={(ref) => (texts.current[i] = ref)} href="#curve" startOffset={i * 43 + '%'}>
                Curabitur mattis efficitur velit
              </textPath>
            );
          })}
        </text>
      </svg>
      <Logos scrollProgress={scrollYProgress} />
    </div>
  );
};

export default Footer;

const Logos = ({ scrollProgress }: any) => {
  const y = useTransform(scrollProgress, [0, 1], [-700, 0]);

  return (
    <div className="h-[250px] bg-black">
      <motion.div style={{ y }} className="h-full flex items-center justify-center gap-5">
        {[...Array(5)].map((_, i) => {
          return <div key={i} className="text-white">{`Hello-${i} `}</div>;
        })}
      </motion.div>
    </div>
  );
};
