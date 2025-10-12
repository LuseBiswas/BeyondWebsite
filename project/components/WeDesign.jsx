"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import WeDesignMobile from "./mobile/WeDesignMobile";

export default function WeDesign() {
  const carouselItems = useMemo(
    () => [
      "a consumer brand winning hearts",
      "startup searching for credibility",
      "any brand that appreciates design",
      "a non-profit mobilizing action",
      "a B2B brand simplifying complexity",
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);

    let id;
    if (!mq.matches) {
      id = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
      }, 2200);
    }
    return () => {
      if (id) clearInterval(id);
      mq.removeEventListener?.("change", onChange);
    };
  }, [carouselItems.length]);

  // Animation timing (slightly slower for larger readability)
  const TRANSITION = { duration: 0.8, ease: "easeInOut" };

  return (
    <>
      {/* Desktop & Tablet */}
      <div className="hidden lg:block bg-white py-[clamp(32px,4vw,96px)]">
        <div className="mx-auto w-full max-w-[min(96vw,1600px)] px-[clamp(16px,3vw,64px)]">
          <h1
            className="
              text-center mb-[clamp(20px,3vw,48px)]
              font-normal
              text-[clamp(28px,3.6vw,56px)]
              leading-[1.15]
              tracking-[-0.01em]
              text-black
            "
            style={{ fontFamily: "Questrial, sans-serif" }}
          >
            Your <span className="text-black/50">website is</span> <br />
            <span className="text-black/50">your most</span> powerful touchpoint.
          </h1>
        </div>

        {/* Green panel */}
        <div className="flex items-center justify-center px-[clamp(16px,3vw,64px)]">
          <div
            className="
              relative w-full
              rounded-[20px] lg:rounded-[24px] xl:rounded-[28px] 2xl:rounded-[32px]
              grid grid-cols-1 lg:grid-cols-[auto_1fr]
              items-center
              gap-[clamp(16px,2.4vw,40px)]
              px-[clamp(20px,3vw,64px)]
              py-[clamp(24px,4vw,72px)]
              mx-auto
            "
            style={{
              backgroundColor: "#E8FC53",
              maxWidth: "min(92vw, 1600px)",
            }}
          >
            {/* Left title */}
            <div className="justify-self-start">
              <h2
                className="
                  font-normal
                  text-[clamp(40px,6vw,96px)]
                  leading-[1.08]
                  tracking-[-0.012em]
                  text-black
                  whitespace-pre-line
                "
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                We design for
              </h2>
            </div>

            {/* Right carousel */}
            <div className="justify-self-end w-full">
              <div
                className="
                  relative mx-auto
                  flex flex-col items-center justify-center
                  overflow-hidden
                "
                style={{
                  width: "clamp(420px,45vw,720px)",
                  height: "clamp(220px,28vw,360px)",
                }}
                aria-live="polite"
              >
                {carouselItems.map((item, index) => {
                  const position =
                    (index - currentIndex + carouselItems.length) %
                    carouselItems.length;

                  // vertical offset per row (px). tuned for our font sizes.
                  const STEP = 60; // you can raise to 68 for chunkier spacing
                  const yOffset = (position - 2) * STEP;

                  let opacity, scale;
                  if (position === 2) {
                    opacity = 1;
                    scale = 1;
                  } else if (position === 0 || position === 4) {
                    opacity = 0.25;
                    scale = 0.86;
                  } else {
                    opacity = 0.55;
                    scale = 0.93;
                  }

                  return (
                    <motion.div
                      key={index}
                      className="
                        absolute w-full text-center
                        text-black
                        font-normal
                        px-[clamp(4px,0.8vw,12px)]
                        text-[clamp(22px,2.2vw,36px)]
                        leading-[1.2]
                      "
                      style={{ fontFamily: "Questrial, sans-serif" }}
                      animate={
                        reducedMotion
                          ? { opacity: position === 2 ? 1 : 0 }
                          : { y: yOffset, opacity, scale }
                      }
                      transition={TRANSITION}
                    >
                      {item}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <WeDesignMobile />
      </div>
    </>
  );
}
