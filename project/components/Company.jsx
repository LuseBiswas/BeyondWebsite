"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import CompanyMobile from "./mobile/CompanyMobile";

export default function Company() {
  // Logos
  const companyImages = [
    { id: 1, src: "/company-logos/AKCH.png", alt: "Company 1" },
    { id: 2, src: "/company-logos/BarDouro_logo.png", alt: "Company 2" },
    { id: 3, src: "/company-logos/Berrilogo.png", alt: "Company 3" },
    { id: 4, src: "/company-logos/C&CHC_logo.png", alt: "Company 4" },
    { id: 5, src: "/company-logos/KI_Logo.png", alt: "Company 5" },
    { id: 6, src: "/company-logos/Leanplum.png", alt: "Company 6" },
    { id: 7, src: "/company-logos/Matterport_logo.png", alt: "Company 7" },
    { id: 8, src: "/company-logos/Quest.png", alt: "Company 8" },
    { id: 9, src: "/company-logos/Trint_logo.png", alt: "Company 9" },
    { id: 10, src: "/company-logos/Unistellar.png", alt: "Company 10" },
  ];

  // How many segments to translate per loop
  const SEGMENTS = 4;

  const containerRef = useRef(null);
  const measureRowRef = useRef(null);
  const firstSegmentRef = useRef(null);

  // Ensure a single segment is >= container width
  const [repeatCount, setRepeatCount] = useState(3);
  const [segmentWidth, setSegmentWidth] = useState(0);

  useEffect(() => {
    const calc = () => {
      const container = containerRef.current;
      const row = measureRowRef.current;
      if (!container || !row) return;

      const containerW = Math.floor(container.offsetWidth);
      const baseW = Math.floor(row.scrollWidth); // width of one base logo row
      if (!baseW) return;

      const needed = Math.max(1, Math.ceil(containerW / baseW));
      setRepeatCount(needed + 1); // +1 buffer avoids DPR rounding seams
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Build one segment (repeat logos until >= container width)
  const segmentLogos = useMemo(() => {
    const arr = [];
    for (let i = 0; i < repeatCount; i++) arr.push(...companyImages);
    return arr;
  }, [repeatCount]);

  // Measure the actual pixel width of ONE segment
  useEffect(() => {
    if (!firstSegmentRef.current) return;
    const w = Math.round(firstSegmentRef.current.getBoundingClientRect().width);
    if (w) setSegmentWidth(w);
  }, [segmentLogos]);

  // Build the full track: [N segments] + [N segments clone]
  const half = useMemo(
    () => Array.from({ length: SEGMENTS }, (_, i) => ({ key: `seg-${i}` })),
    []
  );

  // Keep scrolling speed constant across screen sizes (pixels per second)
  const SPEED_PX_PER_SEC = 60; // tweak to taste
  const durationSec = useMemo(
    () => (segmentWidth > 0 ? (segmentWidth * SEGMENTS) / SPEED_PX_PER_SEC : 60),
    [segmentWidth]
  );

  return (
    <>
      {/* Desktop/Tablet (lg and above) */}
      <div className="hidden lg:block">
        <section className="bg-white py-[clamp(32px,4vw,96px)]">
          <div className="mx-auto w-full max-w-[min(96vw,1600px)] px-[clamp(16px,3vw,64px)]">
            <h2
              className="
                text-center font-normal
                text-[clamp(28px,3.6vw,56px)]
                leading-[1.15]
                tracking-[-0.01em]
                mb-[clamp(20px,3vw,48px)]
              "
              style={{ fontFamily: "Questrial, sans-serif", fontWeight: 400 }}
            >
              We create digital identities that breathe, adapt, and inspire change.
            </h2>
          </div>

          {/* Marquee container */}
          <div
            ref={containerRef}
            className="
              overflow-hidden relative
              bg-gray-50
              h-[clamp(96px,10vw,200px)]
            "
            aria-label="Trusted by companies"
          >
            {/* Hidden measurer for one base row */}
            <div
              ref={measureRowRef}
              className="absolute -z-10 opacity-0 pointer-events-none whitespace-nowrap"
              aria-hidden
            >
              <LogoRow images={companyImages} />
            </div>

            {/* Animated track */}
            <motion.div
              className="flex will-change-transform select-none"
              animate={
                segmentWidth > 0
                  ? { x: [0, -segmentWidth * SEGMENTS] }
                  : { x: [0, 0] }
              }
              transition={{
                ease: "linear",
                duration: durationSec,
                repeat: Infinity,
              }}
            >
              {/* FIRST HALF (measure on first segment) */}
              {half.map((h, i) => (
                <div
                  key={h.key}
                  ref={i === 0 ? firstSegmentRef : null}
                  className="flex"
                >
                  <LogoRow images={segmentLogos} />
                </div>
              ))}

              {/* SECOND HALF (clone for seamless wrap) */}
              {half.map((h) => (
                <div key={`${h.key}-clone`} className="flex">
                  <LogoRow images={segmentLogos} />
                </div>
              ))}
            </motion.div>

            {/* Optional soft fade edges */}
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-[clamp(24px,6vw,160px)] bg-gradient-to-r from-gray-50 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[clamp(24px,6vw,160px)] bg-gradient-to-l from-gray-50 to-transparent z-10" /> */}
          </div>
        </section>
      </div>

      {/* Mobile (below lg) */}
      <div className="lg:hidden">
        <CompanyMobile />
      </div>
    </>
  );
}

function LogoRow({ images }) {
  return (
    <div className="flex whitespace-nowrap">
      {images.map((company, idx) => (
        <div
          key={`${company.id}-${idx}`}
          className="
            flex-shrink-0 mx-[clamp(16px,2vw,40px)]
            flex items-center justify-center
            h-[clamp(96px,10vw,200px)]
          "
          style={{ width: "clamp(140px,12vw,280px)" }}
        >
          <img
            src={company.src}
            alt={company.alt}
            className="
              max-h-[clamp(56px,7vw,140px)]
              object-contain
              opacity-90
            "
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
