"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import Head from "next/head";
import { getOptimizedVideoUrl } from "../../lib/cloudinary";

export default function PartnershipCarouselMobile() {
  const carouselData = [
    { title: "Discover", videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027731/shutterstock_3627320917_kprijd.mov", videoText: "We listen <br/> deeply.", textPos: "30%" },
    { title: "Design",   videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760111025/River_k5zwtq.mp4", videoText: "We shape <br/> with empathy <br/> and strategy", textPos: "35%" },
    { title: "Deliver",  videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027725/shutterstock_1105052247_wrlamw.mov", videoText: "We launch <br/> with precision", textPos: "40%" },
    { title: "Evolve",   videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027734/shutterstock_3833232295_kqnwyv.mov", videoText: "Because your <br/> growth doesn't <br/> stop here.", textPos: "35%" },
  ];

  // ---- State / Refs ----
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);  // Start paused
  const [ready, setReady] = useState(() => new Set());        // indexes that fired canplaythrough (or timed-in)
  const [pendingIndex, setPendingIndex] = useState(null);     // target slide while we wait
  const [hasStarted, setHasStarted] = useState(false);        // Track if carousel has started
  const preloaderEls = useRef({});                            // hidden <video> elements pool
  const visibleRefs = useRef({});                             // visible <video> per index
  const sectionRef = useRef(null);                            // For intersection observer
  
  // ---- Touch/Swipe State ----
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const len = carouselData.length;
  const idx = (i) => (i + len) % len;
  const neighbors = (i) => [idx(i - 1), i, idx(i + 1)];

  // ---- Cloudinary optimized URLs ----
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
    // keep stable unless the list of URLs really changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(carouselData.map((i) => i.videoUrl))]
  );

  // ---- Warm / Preload a given index (hidden <video>) ----
  const warmIndex = (i) => {
    if (!optimizedUrls[i] || preloaderEls.current[i]) return;

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

    // Mark ready on canplaythrough, with a small timeout safety net
    el.addEventListener("canplaythrough", markReady, { once: true });
    const safety = setTimeout(markReady, 1200);
    el.addEventListener("loadeddata", () => { /* noop; canplaythrough usually follows */ });
    el.addEventListener("error", () => { clearTimeout(safety); });

    preloaderEls.current[i] = el;
    el.load();
  };

  // Warm current ±1 whenever active changes; opportunistically warm +2 on idle
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

  // If we were waiting on a slide and it becomes ready, switch now
  useEffect(() => {
    if (pendingIndex != null && ready.has(pendingIndex)) {
      setActiveIndex(pendingIndex);
      setPendingIndex(null);
    }
  }, [pendingIndex, ready]);

  // ---- Request a slide (user tap or autoplay) ----
  const requestSlide = (target) => {
    setIsAutoPlaying(false);

    if (optimizedUrls[target] && !ready.has(target)) {
      warmIndex(target);
      setPendingIndex(target);

      // Fallback: switch after 900ms even if not ready (rare)
      window.clearTimeout(requestSlide._t);
      requestSlide._t = window.setTimeout(() => {
        setActiveIndex(target);
        setPendingIndex(null);
      }, 900);
    } else {
      setActiveIndex(target);
      setPendingIndex(null);
    }

    // resume autoplay after 8s of inactivity
    window.clearTimeout(requestSlide._resume);
    requestSlide._resume = window.setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // ---- Autoplay ----
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

  // Ensure visible video plays as soon as it shows (iOS quirks)
  useEffect(() => {
    const v = visibleRefs.current[activeIndex];
    if (v) {
      const play = () => v.play().catch(() => {});
      play();
      const t = setTimeout(play, 80);
      return () => clearTimeout(t);
    }
  }, [activeIndex]);

  // ---- Touch/Swipe Handlers ----
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      // Swipe left -> next slide
      requestSlide(idx(activeIndex + 1));
    }
    if (isRightSwipe) {
      // Swipe right -> previous slide
      requestSlide(idx(activeIndex - 1));
    }
  };

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
    <div ref={sectionRef} className="bg-white min-h-screen pt-8 px-4">
      {/* Preconnect: faster TLS/DNS to Cloudinary */}
      <Head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
      </Head>

      {/* Sub header */}
      <p
        className="text-center mb-8 sm:mb-10 leading-[1.35] text-[clamp(26px,8.2vw,32px)]"
        style={{ fontFamily: "Questrial, sans-serif", color: "#000" }}
      >
        Our process is <br /> simple, human, and built <br /> around you.
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-6 sm:gap-8 mb-4 sm:mb-6">
        {carouselData.map((item, i) => (
          <button
            key={i}
            onClick={() => requestSlide(i)}
            className={`transition-all duration-300 text-[clamp(16px,4.5vw,20px)] ${
              activeIndex === i ? "text-black font-medium" : "text-gray-500"
            }`}
            style={{
              fontFamily: "Questrial, sans-serif",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Video viewport */}
      <div className="mx-auto w-full max-w-[30rem] mb-12 sm:mb-16">
        <div
          className="relative overflow-hidden rounded-2xl w-full cursor-pointer select-none"
          style={{ aspectRatio: "341 / 467", backgroundColor: "#000" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
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
                <>
                  <video
                    ref={(el) => {
                      if (el) visibleRefs.current[activeIndex] = el;
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: `50% ${carouselData[activeIndex].textPos || "35%"}` }}
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

                  {/* Readability gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.0) 45%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.65) 100%)",
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-black" />
              )}

              {/* Overlay text */}
              <div className="absolute inset-0 flex items-end justify-center pb-10 sm:pb-14">
                <motion.h3
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="text-white text-center text-[clamp(24px,8vw,44px)]"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    lineHeight: "1.1",
                    textShadow: "0 4px 8px rgba(0, 0, 0, 0.35)",
                  }}
                  dangerouslySetInnerHTML={{ __html: carouselData[activeIndex].videoText }}
                />
              </div>

              {/* Tiny skeleton if switch happens pre-ready (rare) */}
              {optimizedUrls[activeIndex] && !ready.has(activeIndex) && (
                <div className="absolute inset-0 animate-pulse bg-[rgba(255,255,255,0.03)]" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main header */}
      <h1
        className="text-center leading-[1.1] text-[clamp(28px,9vw,44px)]"
        style={{ fontFamily: "Syne, sans-serif", color: "#000" }}
      >
        <span className="text-gray-500">This is not</span>
        <br /> just a project. <br />
        It&apos;s a partnership.
      </h1>

      <div className="h-12 sm:h-16" />

      {/* Hidden preloader pool: current ±1 */}
      <div style={{ display: "none" }} aria-hidden>
        {neighbors(activeIndex).map((i) =>
          optimizedUrls[i] ? (
            <video
              key={`preload-${i}`}
              ref={(el) => {
                if (el && !preloaderEls.current[i]) {
                  preloaderEls.current[i] = el;
                  el.preload = "auto";
                  el.muted = true;
                  el.playsInline = true;
                  el.loop = true;
                  el.crossOrigin = "anonymous";
                  el.src = optimizedUrls[i];

                  const markReady = () =>
                    setReady((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));

                  el.addEventListener("canplaythrough", markReady, { once: true });
                  el.load();
                }
              }}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
