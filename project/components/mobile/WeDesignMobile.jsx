"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function WeDesignMobile() {
  // base items (unchanged)
  const base = [
    "a consumer brand<br/>winning hearts",
    "startup searching<br/>for credibility",
    "any brand that<br/>appreciates design",
    "a non-profit<br/>mobilizing action",
    "a B2B brand<br/>simplifying complexity",
  ];

  // build with edge clones: [last, ...base, first]
  const items = useMemo(() => {
    const first = base[0];
    const last = base[base.length - 1];
    return [last, ...base, first];
  }, [base]);

  // start at index 1 (first real slide)
  const [index, setIndex] = useState(1);
  // when true, disables animation to allow instant “teleport” jumps
  const [noAnim, setNoAnim] = useState(false);

  // compute the "real" slide (0..base.length-1) based on current index
  const real = useMemo(() => {
    if (index === 0) return base.length - 1; // left clone -> last real
    if (index === items.length - 1) return 0; // right clone -> first real
    return index - 1; // real slides are shifted by +1
  }, [index, base.length, items.length]);

  // auto-advance every 2s
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // seamless loop: when animation ends on a clone, jump (no animation) to matching real
  const handleAnimComplete = () => {
    if (index === items.length - 1) {
      // at right clone -> jump to first real (1)
      setNoAnim(true);
      setIndex(1);
      // re-enable animation on next frame
      requestAnimationFrame(() => setNoAnim(false));
    } else if (index === 0) {
      // at left clone -> jump to last real (items.length - 2)
      setNoAnim(true);
      setIndex(items.length - 2);
      requestAnimationFrame(() => setNoAnim(false));
    }
  };

  // 3-dot window: previous, current, next (cyclic)
  const visibleDots = useMemo(() => {
    const dots = [];
    for (let offset = -1; offset <= 1; offset++) {
      const idx = (real + offset + base.length) % base.length;
      dots.push({
        id: idx, // stable within base
        position: offset, // -1, 0, 1
        active: offset === 0,
      });
    }
    return dots;
  }, [real, base.length]);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4">
      {/* Centered text - Mobile */}
      <h1
        className="text-center mb-8 text-[24px] sm:text-[28px] leading-[32px] sm:leading-[36px]"
        style={{ fontFamily: "Questrial, sans-serif", color: "#000000" }}
      >
        Your <span className="text-black/50">website is</span> <br />
        <span className="text-black/50">your most</span> powerful touchpoint.
      </h1>

      {/* Green box - Mobile */}
      <div className="w-full max-w-sm mx-auto">
        <div
          className="rounded-2xl relative p-6 mb-6"
          style={{ backgroundColor: "#E8FC53", minHeight: "200px" }}
        >
          {/* Center aligned text - Mobile */}
          <div className="mb-4">
            <h2
              className="text-[44px] mb-4 text-center"
              style={{ fontFamily: "Syne, sans-serif", color: "#000000", lineHeight: "1.1" }}
            >
              We design for
            </h2>
          </div>

          {/* Carousel text - Mobile */}
          <div className="relative h-24 overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${index * 100}%` }}
              transition={{ duration: noAnim ? 0 : 0.5, ease: "easeInOut" }}
              onAnimationComplete={handleAnimComplete}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 text-center"
                  style={{
                    fontFamily: "Questrial, sans-serif",
                    fontSize: "28px",
                    color: "#000000",
                    lineHeight: "1.2",
                  }}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile dots indicator */}
        <div className="flex justify-center gap-4">
          {visibleDots.map((dot) => {
            const isActive = dot.active;
            const isLeft = dot.position === -1;
            const isRight = dot.position === 1;

            return (
              <motion.div
                key={`dot-${dot.id}`}
                className="rounded-full bg-gray-500 cursor-pointer"
                layout
                initial={{
                  scale: 1,
                  opacity: 0,
                  x: isRight ? 30 : isLeft ? -30 : 0,
                }}
                animate={{
                  scale: isActive ? 2.6 : 1,
                  opacity: isActive ? 1 : 0.5,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: isLeft ? -30 : isRight ? 30 : 0,
                  transition: { duration: 0.3 },
                }}
                style={{ width: "15px", height: "15px" }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  layout: { duration: 0.6, ease: "easeInOut" },
                }}
                onClick={() => {
                  // jump to the clicked real slide by setting index to real+1
                  const targetIndex = dot.id + 1; // because of left clone at 0
                  setIndex(targetIndex);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
