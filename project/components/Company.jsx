"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import CompanyMobile from "./mobile/CompanyMobile";

export default function Company() {
  // Your logos
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

  // How many "train cars" (segments) you want visible sequentially
  const SEGMENTS = 4; // tweak this

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

      const containerW = container.offsetWidth;
      const baseW = row.scrollWidth; // width of one base logo row
      if (!baseW) return;

      const needed = Math.max(1, Math.ceil(containerW / baseW));
      setRepeatCount(needed + 1); // +1 buffer to avoid DPR rounding gaps
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Build one segment (repeats the logos until >= container width)
  const segmentLogos = useMemo(() => {
    const arr = [];
    for (let i = 0; i < repeatCount; i++) arr.push(...companyImages);
    return arr;
  }, [repeatCount]); // companyImages is static here

  // After render, measure the actual pixel width of ONE segment
  useEffect(() => {
    if (!firstSegmentRef.current) return;
    const w = firstSegmentRef.current.getBoundingClientRect().width;
    if (w) setSegmentWidth(Math.round(w));
  }, [segmentLogos]);

  // Build the full track: [N segments] + [N segments clone]
  const half = useMemo(
    () => Array.from({ length: SEGMENTS }, (_, i) => ({ key: `seg-${i}` })),
    [SEGMENTS]
  );

  const durationSec = 450; // speed (lower = faster)

  return (
    <>
      {/* Desktop/Tablet Layout (lg and above) */}
      <div className="hidden lg:block">
        <div className="bg-white py-16 lg:py-20 xl:py-24 2xl:py-32">
          <div className="container mx-auto px-4">
            <h2
              className="text-center text-[38px] font-normal mb-12"
              style={{ fontFamily: "Questrial, sans-serif", fontWeight: 400 }}
            >
              We create digital identities that breathe, adapt, and inspire change.
            </h2>
          </div>

          <div
            ref={containerRef}
            className="h-[116px] bg-gray-50 overflow-hidden relative"
          >
            {/* Hidden measurer for one base row (to compute repeatCount) */}
            <div
              ref={measureRowRef}
              className="absolute -z-10 opacity-0 pointer-events-none whitespace-nowrap"
              aria-hidden
            >
              <LogoRow images={companyImages} />
            </div>

            {/* Animated track: translate by N × segmentWidth, then loop */}
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
              {/* FIRST HALF (measured ref on the first segment) */}
              {half.map((h, i) => (
                <div
                  key={h.key}
                  ref={i === 0 ? firstSegmentRef : null}
                  className="flex"
                >
                  <LogoRow images={segmentLogos} />
                </div>
              ))}

              {/* SECOND HALF (exact clone for perfect wrap) */}
              {half.map((h, i) => (
                <div key={`${h.key}-clone`} className="flex">
                  <LogoRow images={segmentLogos} />
                </div>
              ))}
            </motion.div>

            {/* Optional soft fade edges */}
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" /> */}
          </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
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
          className="flex-shrink-0 mx-8 flex items-center justify-center h-[116px]"
          style={{ width: 160 }} // fixed cell width = stable measuring, no subpixel drift
        >
          <img
            src={company.src}
            alt={company.alt}
            className="max-h-[80px] object-contain"
          />
        </div>
      ))}
    </div>
  );
}
