'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ value, duration = 2, suffix = '' }: { value: number, duration?: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, duration, motionValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Stats() {
  return (
    <section className="py-20 bg-gray-900/50 backdrop-blur-md border-y border-gray-800 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="flex flex-col items-center">
            <h4 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              <AnimatedCounter value={25} suffix="+" />
            </h4>
            <p className="text-gray-400 font-medium tracking-wide">URL Features</p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
              <AnimatedCounter value={3} />
            </h4>
            <p className="text-gray-400 font-medium tracking-wide">ML Models</p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">
              <AnimatedCounter value={10} suffix="K+" />
            </h4>
            <p className="text-gray-400 font-medium tracking-wide">Training Samples</p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
              &lt;1s
            </h4>
            <p className="text-gray-400 font-medium tracking-wide">Analysis Time</p>
          </div>

        </div>
      </div>
    </section>
  );
}
