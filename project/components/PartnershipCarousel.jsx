"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import Head from "next/head";
import PartnershipCarouselMobile from "./mobile/PartnershipCarouselMobile";
import { getOptimizedVideoUrl } from "../lib/cloudinary";

export default function PartnershipCarousel() {
  const carouselData = [
    {
      title: "Discover",
      videoUrl:
        "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027731/shutterstock_3627320917_kprijd.mov",
      videoText: "We listen deeply.",
      marginBottom: "9rem",
    },
    {
      title: "Design",
      videoUrl:
        "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760111025/River_k5zwtq.mp4",
      videoText: "We shape with <br/> empathy and strategy",
      marginBottom: "9rem",
    },
    {
      title: "Deliver",
      videoUrl:
        "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027725/shutterstock_1105052247_wrlamw.mov",
      videoText: "We launch with precision",
      marginBottom: "9rem",
    },
    {
      title: "Evolve",
      videoUrl:
        "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027734/shutterstock_3833232295_kqnwyv.mov",
      videoText: "Because your growth <br/> doesn't stop here.",
    },
  ];

  // ---------- State ----------
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false); // Start paused
  const [ready, setReady] = useState(() => new Set());
  const [pendingIndex, setPendingIndex] = useState(null);
  const [hasStarted, setHasStarted] = useState(false); // Track if carousel has started
  const videoEls = useRef({});
  const visibleRefs = useRef({});
  const sectionRef = useRef(null); // For intersection observer

  // ---------- Optimized URLs ----------
  const optimizedUrls = useMemo(
    () =>
      carouselData.map((item) =>
        item.videoUrl
          ? getOptimizedVideoUrl(item.videoUrl, {
              quality: "auto:good",
              format: "mp4",
            })
          : null
      ),
    // keep stable without re-creating on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(carouselData.map((i) => i.videoUrl))]
  );

  const len = carouselData.length;
  const idx = (i) => (i + len) % len;
  const neighbors = (i) => [idx(i - 1), i, idx(i + 1)];

  const requestSlide = (target) => {
    setIsAutoPlaying(false);
    if (optimizedUrls[target] && !ready.has(target)) {
      warmIndex(target);
      setPendingIndex(target);
      window.clearTimeout(requestSlide._t);
      requestSlide._t = window.setTimeout(() => {
        setActiveIndex(target);
        setPendingIndex(null);
      }, 900);
    } else {
      setActiveIndex(target);
      setPendingIndex(null);
    }
    window.clearTimeout(requestSlide._resume);
    requestSlide._resume = window.setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const warmIndex = (i) => {
    if (!optimizedUrls[i] || videoEls.current[i]) return;
    const el = document.createElement("video");
    el.preload = "auto";
    el.muted = true;
    el.playsInline = true;
    el.loop = true;
    el.crossOrigin = "anonymous";
    el.src = optimizedUrls[i];

    const markReady = () => {
      setReady((prev) => {
        if (prev.has(i)) return prev;
        const next = new Set(prev);
        next.add(i);
        return next;
      });
      el.removeEventListener("canplaythrough", markReady);
    };

    el.addEventListener("canplaythrough", markReady, { once: true });
    setTimeout(markReady, 1200); // safety net
    videoEls.current[i] = el;
    el.load();
  };

  useEffect(() => {
    neighbors(activeIndex).forEach(warmIndex);
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => warmIndex(idx(activeIndex + 2)))
      : setTimeout(() => warmIndex(idx(activeIndex + 2)), 200);
    return () => {
      window.cancelIdleCallback?.(idle);
      clearTimeout(idle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, optimizedUrls.join("|")]);

  useEffect(() => {
    if (pendingIndex != null && ready.has(pendingIndex)) {
      setActiveIndex(pendingIndex);
      setPendingIndex(null);
    }
  }, [pendingIndex, ready]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      const next = idx(activeIndex + 1);
      if (optimizedUrls[next] && !ready.has(next)) {
        warmIndex(next);
        setPendingIndex(next);
        window.clearTimeout(requestSlide._t);
        requestSlide._t = window.setTimeout(() => {
          setActiveIndex(next);
          setPendingIndex(null);
        }, 900);
      } else {
        setActiveIndex(next);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeIndex, ready, optimizedUrls]);

  useEffect(() => {
    const v = visibleRefs.current[activeIndex];
    if (v) {
      const play = () => v.play().catch(() => {});
      play();
      const t = setTimeout(play, 80);
      return () => clearTimeout(t);
    }
  }, [activeIndex]);

  // Intersection Observer: Start autoplay when section comes into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            // Section is visible and hasn't started yet
            setIsAutoPlaying(true);
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [hasStarted]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
      </Head>

      {/* Desktop / Tablet */}
      <div className="hidden lg:block">
        <section ref={sectionRef} className="bg-white min-h-screen flex flex-col items-center justify-center px-[clamp(16px,3vw,64px)] pb-[clamp(32px,4vw,96px)]">
          <p
            className="
              text-center
              mb-[clamp(16px,2.6vw,40px)]
              font-normal
              text-[clamp(28px,3.2vw,48px)]
              leading-[1.15]
              text-black
              opacity-95
              max-w-[85ch]
            "
            style={{ fontFamily: "Questrial, sans-serif" }}
          >
            Our process is simple, human, <br />
            and built around you.
          </p>

          <h1
            className="
              text-center
              mb-[clamp(24px,3.2vw,64px)]
              font-normal
              text-[clamp(56px,7vw,120px)]
              leading-[1.06]
              tracking-[-0.012em]
              text-black
              max-w-[18ch]
            "
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-gray-500">This is </span>not just a project. <br />
            It&apos;s a partnership.
          </h1>

          {/* Tabs (wrap safely, fluid gaps) */}
          <div
            className="
              flex flex-wrap items-center justify-center
              gap-[clamp(16px,4vw,48px)]
              mb-[clamp(16px,2.6vw,40px)]
              px-[clamp(8px,1.5vw,16px)]
            "
          >
            {carouselData.map((item, index) => (
              <button
                key={index}
                onClick={() => requestSlide(index)}
                className={`
                  transition-all duration-300
                  text-[clamp(18px,1.8vw,30px)]
                  leading-[1.2]
                  ${activeIndex === index ? "text-black font-medium" : "text-gray-500 hover:text-gray-700"}
                `}
                style={{
                  fontFamily: "Questrial, sans-serif",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.25rem 0.5rem",
                }}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Viewport (fluid size + safe inner padding for overlay text) */}
          <div
            className="
              relative overflow-hidden
              rounded-[20px] lg:rounded-[24px] xl:rounded-[28px] 2xl:rounded-[32px]
            "
            style={{
              width: "clamp(720px,82vw,1400px)",
              height: "clamp(420px,46vw,780px)",
              backgroundColor: "#000",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {optimizedUrls[activeIndex] ? (
                  <video
                    ref={(el) => {
                      if (el) visibleRefs.current[activeIndex] = el;
                    }}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    controls={false}
                    crossOrigin="anonymous"
                  >
                    <source src={optimizedUrls[activeIndex]} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full bg-black" />
                )}

                {/* Overlay text (padded & clamped so it never hugs edges) */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="
                      text-white text-center
                      px-[clamp(12px,2vw,28px)]
                      text-[clamp(44px,6vw,120px)]
                      leading-[1.08]
                    "
                    style={{
                      fontFamily: "Syne, sans-serif",
                      textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                      marginBottom:
                        carouselData[activeIndex].marginBottom ||
                        "clamp(24px,3vw,64px)",
                      maxWidth: "18ch",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: carouselData[activeIndex].videoText,
                    }}
                  />
                </div>

                {/* Subtle skeleton when switching before ready (rare) */}
                {optimizedUrls[activeIndex] && !ready.has(activeIndex) && (
                  <div className="absolute inset-0 animate-pulse bg-[rgba(255,255,255,0.03)]" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <PartnershipCarouselMobile />
      </div>

      {/* Hidden preloader pool */}
      <div style={{ display: "none" }} aria-hidden>
        {neighbors(activeIndex).map((i) =>
          optimizedUrls[i] ? (
            <video
              key={`preload-${i}`}
              ref={(el) => {
                if (el && !videoEls.current[i]) {
                  videoEls.current[i] = el;
                  el.preload = "auto";
                  el.muted = true;
                  el.playsInline = true;
                  el.loop = true;
                  el.crossOrigin = "anonymous";
                  el.src = optimizedUrls[i];
                  const markReady = () =>
                    setReady((prev) =>
                      prev.has(i) ? prev : new Set(prev).add(i)
                    );
                  el.addEventListener("canplaythrough", markReady, { once: true });
                  el.load();
                }
              }}
            />
          ) : null
        )}
      </div>
    </>
  );
}
