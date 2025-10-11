"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CompanyMobile() {
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

  // How many “train cars” (segments) per loop
  const SEGMENTS = 4;

  // Sizing knobs (use same for measurer & live row)
  const SIZES = {
    // container (row) height
    rowH: "clamp(64px, 18vw, 116px)",
    // each logo cell width
    cellW: "clamp(82px, 24vw, 140px)",
    // gap between cells
    cellGapClass: "mx-3 sm:mx-4",
    // max logo visual height
    imgMaxH: "clamp(36px, 12vw, 80px)",
  };

  // Speed control: pixels per second (consistent feel across screen sizes)
  const PX_PER_SEC = 22.5;

  const containerRef = useRef(null);
  const measureRowRef = useRef(null);
  const firstSegmentRef = useRef(null);

  const [repeatCount, setRepeatCount] = useState(3);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const [durationSec, setDurationSec] = useState(20);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const handler = () => setReduceMotion(!!mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Compute how many base repeats needed to cover one segment width
  useEffect(() => {
    const calc = () => {
      const container = containerRef.current;
      const row = measureRowRef.current;
      if (!container || !row) return;

      const containerW = container.offsetWidth;
      const baseW = row.scrollWidth;
      if (!baseW) return;

      const needed = Math.max(1, Math.ceil(containerW / baseW));
      setRepeatCount(needed + 1); // +1 buffer for DPR rounding
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Build one segment (repeated logos until >= container width)
  const segmentLogos = useMemo(() => {
    const arr = [];
    for (let i = 0; i < repeatCount; i++) arr.push(...companyImages);
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repeatCount]); // companyImages is static here

  // After render, measure the pixel width of ONE segment
  useEffect(() => {
    if (!firstSegmentRef.current) return;
    const w = firstSegmentRef.current.getBoundingClientRect().width;
    if (w) setSegmentWidth(Math.round(w));
  }, [segmentLogos]);

  // Compute duration so speed is constant in px/s
  useEffect(() => {
    if (segmentWidth <= 0) return;
    const loopDistance = segmentWidth * SEGMENTS; // px
    setDurationSec(loopDistance / PX_PER_SEC); // seconds
  }, [segmentWidth]);

  const half = useMemo(
    () => Array.from({ length: SEGMENTS }, (_, i) => ({ key: `seg-${i}` })),
    [SEGMENTS]
  );

  return (
    <div className="bg-white py-8">
      <div className="mx-auto px-4 w-full max-w-[46rem]">
        <h2
          className="text-center font-normal mb-6 leading-[1.15]"
          style={{
            fontFamily: "Questrial, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(22px, 7vw, 28px)",
          }}
        >
          We create <br /> digital identities that breathe, <br /> adapt, and inspire change.
        </h2>
      </div>

      <div
        ref={containerRef}
        className="overflow-hidden relative w-full"
        style={{ height: SIZES.rowH, backgroundColor: "#F9FAFB" }} // gray-50
      >
        {/* Hidden measurer for one base row (to compute repeatCount) */}
        <div
          ref={measureRowRef}
          className="absolute -z-10 opacity-0 pointer-events-none whitespace-nowrap"
          aria-hidden
        >
          <LogoRow images={companyImages} sizes={SIZES} />
        </div>

        {/* Animated track: translate by N × segmentWidth, then loop */}
        <motion.div
          className="flex will-change-transform select-none"
          animate={
            !reduceMotion && segmentWidth > 0
              ? { x: [0, -segmentWidth * SEGMENTS] }
              : { x: 0 }
          }
          transition={
            !reduceMotion && segmentWidth > 0
              ? { ease: "linear", duration: durationSec, repeat: Infinity }
              : undefined
          }
        >
          {/* FIRST HALF */}
          {half.map((h, i) => (
            <div key={h.key} ref={i === 0 ? firstSegmentRef : null} className="flex">
              <LogoRow images={segmentLogos} sizes={SIZES} />
            </div>
          ))}

          {/* SECOND HALF (exact clone for perfect wrap) */}
          {half.map((h) => (
            <div key={`${h.key}-clone`} className="flex">
              <LogoRow images={segmentLogos} sizes={SIZES} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function LogoRow({ images, sizes }) {
  const { cellW, cellGapClass, rowH, imgMaxH } = sizes;
  return (
    <div className="flex whitespace-nowrap">
      {images.map((company, idx) => (
        <div
          key={`${company.id}-${idx}`}
          className={`flex-shrink-0 ${cellGapClass} flex items-center justify-center`}
          style={{ width: cellW, height: rowH }}
        >
          <img
            src={company.src}
            alt={company.alt}
            style={{ maxHeight: imgMaxH, width: "auto" }}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
