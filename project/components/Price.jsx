"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PriceBox from "./PriceBox";
import PriceMobile from "./mobile/PriceMobile";

export default function Price() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [spotBase, setSpotBase] = useState({ x: 0, y: 0, w: 0, h: 0, r: 60 });

  // card scale factor (match your old ~1.03)
  const hoverScale = 1.04;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const start = async () => { try { await v.play(); } catch (err) {} };
    if (v.readyState >= 2) start();
    else v.addEventListener("canplay", start, { once: true });
    return () => v.removeEventListener("canplay", start);
  }, []);

  const cards = [
    {
      title: "PURELY WEBSITE",
      tag: "Quick",
      price: "4800",
      description: "For startups,<br/> small businesses.",
      cta: "Get started",
      link: "#",
      bulletPoints: [
        "Starter Landing Page<br/>[1-5 Pages]",
        "A high-performing website.",
        "Modern, responsive design.",
        "Essential integrations<br/> with contact forms, analytics,<br/>SEO basics.",
        "Fast turnaround,<br/>future-ready build.",
      ],
    },
    {
      title: "WEBSITE+",
      tag: "Popular",
      price: "6500",
      description:
        "For growing businesses that<br/>need their website to work as<br/>hard as they do.",
      cta: "Get started",
      link: "#",
      bulletPoints: [
        "6–15 pages,<br/>with Content Management<br/>System & Payment setup",
        "Everything in Purely Website",
        "Deeper brand alignment<br/>& storytelling-driven design",
        "Advanced integrations<br/>(CRM, e-commerce,<br/>automation)",
        "Performance optimisation<br/>for speed, SEO, & conversions",
        "Ongoing support & light<br/>content management",
      ],
    },
    {
      title: "BEYOND SITE",
      tag: "Comprehensive +",
      price: "8000+",
      description:
        "For ambitious brands,<br/>non-profits, and enterprises<br/>who want to lead change.",
      cta: "Get Started",
      link: "#",
      bulletPoints: [
        "Custom Website for a tailored digital product or SaaS platform<br/>with core features. Highly<br/>customizable, scalable.",
        "Everything in Website +",
        "Continuous strategy & evolution",
        "Conversion-focused<br/>campaigns, landing pages,<br/>and A/B testing",
        "Content strategy<br/>& storytelling guidance",
        "Dedicated design support<br/>(retainer-style)",
        "Priority access to the DR team",
      ],
    },
  ];

  // measure wrapper rect relative to the section; store as base
  const updateSpotFromEl = (el) => {
    if (!el || !sectionRef.current) return;
    const cardRect = el.getBoundingClientRect();
    const secRect = sectionRef.current.getBoundingClientRect();
    const x = cardRect.left - secRect.left;
    const y = cardRect.top - secRect.top;
    const w = cardRect.width;
    const h = cardRect.height;
    setSpotBase({ x, y, w, h, r: 60 });
  };

  // derive scaled hole around the center
  const getScaledSpot = (scale) => {
    const { x, y, w, h, r } = spotBase;
    const cx = x + w / 2;
    const cy = y + h / 2;
    const W = w * scale;
    const H = h * scale;
    return {
      x: cx - W / 2,
      y: cy - H / 2,
      w: W,
      h: H,
      r, // keep corner radius same (looks good)
    };
  };

  const dimActive = hoveredIndex !== null;
  const target = dimActive ? getScaledSpot(hoverScale) : null;

  return (
    <div
      id="pricing-section"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gray-800"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover pointer-events-none"
        autoPlay loop muted playsInline preload="metadata" crossOrigin="anonymous" poster="/poster.jpg"
      >
        <source src="https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_15.mov" />
        Your browser does not support the video tag.
      </video>

      {/* Masked overlay with Framer animation */}
      <AnimatePresence>
        {dimActive && target && (
          <motion.svg
            key="spot"
            className="hidden lg:block absolute inset-0 z-40 pointer-events-none"
            width="100%"
            height="100%"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <defs>
              <mask id="spotlight-mask">
                {/* White = overlay visible; Black = hole */}
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <motion.rect
                  // animate hole to follow the scaled card
                  initial={false}
                  animate={{
                    x: target.x,
                    y: target.y,
                    width: target.w,
                    height: target.h,
                    rx: spotBase.r,
                    ry: spotBase.r,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.7 }}
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="#2B2B2B"
              opacity="0.8"
              mask="url(#spotlight-mask)"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Desktop & Tablet */}
      <div className="hidden lg:block relative z-30 py-12 lg:py-16 xl:py-20 2xl:py-24 px-4 lg:px-6 xl:px-8 2xl:px-12">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
          {/* Headers (naturally dim under overlay outside the hole) */}
          <h1 className="text-center mb-9 text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px] leading-[1.1]" style={{ fontFamily: "Syne, sans-serif", color: "#FFFFFF" }}>
            Plans made clear. <br /> Designs made unforgettable.
          </h1>
          <p className="text-center mb-16 lg:mb-20 xl:mb-24 2xl:mb-32 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[1.3]" style={{ fontFamily: "Questrial, sans-serif", color: "#FFFFFF" }}>
            No hidden costs. No compromises. <br /> Just thoughtful design at a price that respects your growth.
          </p>

          {/* Cards */}
          <div className="flex justify-center items-start gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 px-4 lg:px-8 xl:px-12 2xl:px-16">
            {cards.map((card, i) => (
              <div
                key={i}
                className="relative isolate p-1 lg:p-2"
                onMouseEnter={(e) => { setHoveredIndex(i); updateSpotFromEl(e.currentTarget); }}
                onMouseMove={(e) => { if (hoveredIndex === i) updateSpotFromEl(e.currentTarget); }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Scale the card with Framer so it's in sync with the hole */}
                <motion.div
                  initial={false}
                  animate={{ scale: hoveredIndex === i ? hoverScale : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.7 }}
                  className={hoveredIndex === i ? "relative z-50" : "relative z-20"}
                >
                  <PriceBox {...card} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <PriceMobile />
      </div>
    </div>
  );
}
