"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// Move base items outside component so they don't recreate on every render
const base = [
  "a consumer brand<br/>winning hearts",
  "startup searching<br/>for credibility",
  "any brand that<br/>appreciates design",
  "a non-profit<br/>mobilizing action",
  "a B2B brand<br/>simplifying complexity",
];

export default function WeDesignMobile() {
  // build with edge clones: [last, ...base, first]
  const items = useMemo(() => {
    const first = base[0];
    const last = base[base.length - 1];
    return [last, ...base, first];
  }, []);

  // start at index 1 (first real slide)
  const [index, setIndex] = useState(1);
  // when true, disables animation to allow instant “teleport” jumps
  const [noAnim, setNoAnim] = useState(false);

  // compute the "real" slide (0..base.length-1) based on current index
  const real = useMemo(() => {
    if (index === 0) return base.length - 1; // left clone -> last real
    if (index === items.length - 1) return 0; // right clone -> first real
    return index - 1; // real slides are shifted by +1
  }, [index, items.length]);

  // auto-advance every 2.2s (slightly calmer)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => i + 1), 2200);
    return () => clearInterval(id);
  }, []);

  // seamless loop: when animation ends on a clone, jump (no animation) to matching real
  const handleAnimComplete = () => {
    if (index === items.length - 1) {
      // Reached the right clone (first item clone), jump to real first item
      setNoAnim(true);
      setTimeout(() => {
        setIndex(1);
        setTimeout(() => setNoAnim(false), 50);
      }, 0);
    } else if (index === 0) {
      // Reached the left clone (last item clone), jump to real last item
      setNoAnim(true);
      setTimeout(() => {
        setIndex(items.length - 2);
        setTimeout(() => setNoAnim(false), 50);
      }, 0);
    }
  };

  // 3-dot window: previous, current, next (cyclic)
  const visibleDots = useMemo(() => {
    const dots = [];
    for (let offset = -1; offset <= 1; offset++) {
      const idx = (real + offset + base.length) % base.length;
      dots.push({ id: idx, position: offset, active: offset === 0 });
    }
    return dots;
  }, [real]);

  return (
    <div className="bg-white pt-8 px-4">
      {/* Centered text - Mobile (fluid, compact) */}
      <h1
        className="text-center mb-5 leading-[1.2]"
        style={{
          fontFamily: "Questrial, sans-serif",
          color: "#000",
          fontSize: "clamp(20px, 6.2vw, 28px)",
        }}
      >
        Your <span className="text-black/50">website is</span> <br />
        <span className="text-black/50">your most</span> powerful touchpoint.
      </h1>

      {/* Green box - compact, fluid */}
      <div className="w-full max-w-[28rem] mx-auto">
        <div
          className="rounded-2xl relative p-8 mb-4 sm:mb-6 flex flex-col justify-center items-center"
          style={{
            backgroundColor: "#E8FC53",
            minHeight: "348px",
            minWidth: "354px",
          }}
        >
          {/* Heading */}
          <div className="mb-6">
            <h2
              className="text-center"
              style={{
                fontFamily: "Syne, sans-serif",
                color: "#000",
                lineHeight: "1.08",
                fontSize: "clamp(32.5px, 11.25vw, 55px)",
              }}
            >
              We <br /> design for
            </h2>
          </div>

          {/* Carousel text - fluid height & type */}
          <div
            className="relative overflow-hidden w-full"
            style={{ height: "clamp(90px, 24vw, 130px)" }}
          >
            <motion.div
              className="flex"
              style={{ x: `-${index * 100}%` }}
              animate={{ x: `-${index * 100}%` }}
              transition={noAnim ? { duration: 0 } : { duration: 0.5, ease: "easeInOut" }}
              onAnimationComplete={handleAnimComplete}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 text-center font-extralight"
                  style={{
                    fontFamily: "Questrial, sans-serif",
                    color: "#000",
                    lineHeight: "1.15",
                    fontSize: "clamp(21.6px, 7.44vw, 33.6px)",
                  }}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dots — smaller & tighter to save vertical space */}
        {/* <div className="flex justify-center gap-2.5 sm:gap-3">
          {visibleDots.map((dot) => {
            const isActive = dot.active;
            const isLeft = dot.position === -1;
            const isRight = dot.position === 1;
            return (
              <motion.button
                key={`dot-${dot.id}`}
                aria-label={`Show slide ${dot.id + 1}`}
                className="rounded-full bg-gray-500"
                style={{
                  width: "clamp(8px, 2.8vw, 12px)",
                  height: "clamp(8px, 2.8vw, 12px)",
                }}
                layout
                initial={{ scale: 1, opacity: 0, x: isRight ? 20 : isLeft ? -20 : 0 }}
                animate={{
                  scale: isActive ? 2.1 : 1,
                  opacity: isActive ? 1 : 0.5,
                  x: 0,
                }}
                exit={{ opacity: 0, x: isLeft ? -20 : isRight ? 20 : 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.45, ease: "easeInOut", layout: { duration: 0.45, ease: "easeInOut" } }}
                onClick={() => setIndex(dot.id + 1)} // because of left clone at 0
              />
            );
          })}
        </div> */}
      </div>
    </div>
  );
}
