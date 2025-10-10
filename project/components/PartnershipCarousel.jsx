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
      videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027731/shutterstock_3627320917_kprijd.mov",
      videoText: "We listen deeply.",
      marginBottom: "9rem"
    },
    {
      title: "Design",
      videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760111025/River_k5zwtq.mp4",
      videoText: "We shape with <br/> empathy and strategy",
      marginBottom: "9rem"
    },
    {
      title: "Deliver",
      videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027725/shutterstock_1105052247_wrlamw.mov",
      videoText: "We launch with precision",
      marginBottom: "9rem"
    },
    {
      title: "Evolve",
      videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027734/shutterstock_3833232295_kqnwyv.mov",
      videoText: "Because your growth <br/> doesn't stop here."
    }
  ];

  // ---------- State ----------
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [ready, setReady] = useState(() => new Set());            // which indexes are canplaythrough-ready
  const [pendingIndex, setPendingIndex] = useState(null);         // requested slide while we wait for ready
  const videoEls = useRef({});                                    // hidden preloader <video> elements
  const visibleRefs = useRef({});                                 // visible video elements per index (for .play())

  // ---------- Optimized URLs (stable) ----------
  const optimizedUrls = useMemo(
    () =>
      carouselData.map((item) =>
        item.videoUrl
          ? getOptimizedVideoUrl(item.videoUrl, {
              // Cloudinary-friendly choices for instant start
              // (Auto codec + streaming mp4 keeps it widely compatible)
              quality: "auto:good",
              format: "mp4",
              // if your helper supports flags, consider:
              // flags: "streaming_attachment" (or similar), but optional
            })
          : null
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(carouselData.map((i) => i.videoUrl))]
  );

  const len = carouselData.length;

  // ---------- Helpers ----------
  const idx = (i) => (i + len) % len;
  const neighbors = (i) => [idx(i - 1), i, idx(i + 1)];

  // Request a slide change; if it has a video and isn't ready, wait until ready
  const requestSlide = (target) => {
    setIsAutoPlaying(false);
    if (optimizedUrls[target] && !ready.has(target)) {
      // trigger preload if not started yet
      warmIndex(target);
      setPendingIndex(target);

      // fallback: don't block forever; switch after 900ms if still not ready
      // (rare; usually ready fires quickly once warmed)
      window.clearTimeout(requestSlide._t);
      requestSlide._t = window.setTimeout(() => {
        setActiveIndex(target);
        setPendingIndex(null);
      }, 900);
    } else {
      setActiveIndex(target);
      setPendingIndex(null);
    }

    // resume autoplay in 8s
    window.clearTimeout(requestSlide._resume);
    requestSlide._resume = window.setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // ---------- Warm / Preload ----------
  // Ensure there's a hidden <video> preloading the given index
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
    // in case canplaythrough never fires (network quirks), mark ready after a small buffer
    const t = setTimeout(markReady, 1200);
    el.addEventListener("loadeddata", () => {
      // if loadeddata already fired quickly, let canplaythrough happen; the timeout is a safety net
    });

    videoEls.current[i] = el;
    // Kick the network
    el.load();
  };

  // Warm current + neighbors any time activeIndex changes
  useEffect(() => {
    neighbors(activeIndex).forEach(warmIndex);

    // Opportunistically warm the next of next when idle (very cheap)
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => warmIndex(idx(activeIndex + 2)))
      : setTimeout(() => warmIndex(idx(activeIndex + 2)), 200);

    return () => {
      window.cancelIdleCallback?.(idle);
      clearTimeout(idle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, optimizedUrls.join("|")]);

  // If we were waiting on a slide and it becomes ready, switch immediately
  useEffect(() => {
    if (pendingIndex != null && ready.has(pendingIndex)) {
      setActiveIndex(pendingIndex);
      setPendingIndex(null);
    }
  }, [pendingIndex, ready]);

  // ---------- Autoplay ----------
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      const next = idx(activeIndex + 1);
      // initiate warm & gate switch
      if (optimizedUrls[next] && !ready.has(next)) {
        warmIndex(next);
        setPendingIndex(next);
        // when it becomes ready, the effect above will switch; also add fallback
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

  // Ensure visible video plays as soon as it mounts/shows
  useEffect(() => {
    const v = visibleRefs.current[activeIndex];
    if (v) {
      const play = () => v.play().catch(() => {});
      // try immediately and then after small delay (iOS)
      play();
      const t = setTimeout(play, 80);
      return () => clearTimeout(t);
    }
  }, [activeIndex]);

  return (
    <>
      {/* Preconnect for faster TLS + DNS to Cloudinary */}
      <Head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
      </Head>

      {/* Desktop / Tablet */}
      <div className="hidden lg:block">
        <div className="bg-white min-h-screen flex flex-col items-center justify-center py-16 px-8">
          <p
            className="text-center mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[36px] lg:leading-[40px] xl:leading-[48px] 2xl:leading-[60px]"
            style={{ fontFamily: "Questrial, sans-serif", color: "#000000" }}
          >
            Our process is simple, human, <br />
            and built around you.
          </p>

          <h1
            className="text-center mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px]"
            style={{ fontFamily: "Syne, sans-serif", color: "#000000", lineHeight: "1.1" }}
          >
            <span className="text-gray-500">This is </span>not just a project. <br />
            It&apos;s a partnership.
          </h1>

          {/* Tabs */}
          <div className="flex gap-32 lg:gap-40 xl:gap-48 2xl:gap-56 mb-8 lg:mb-10 xl:mb-12 2xl:mb-16">
            {carouselData.map((item, index) => (
              <button
                key={index}
                onClick={() => requestSlide(index)}
                className={`transition-all duration-300 text-[24px] lg:text-[26px] xl:text-[30px] 2xl:text-[36px] ${
                  activeIndex === index ? "text-black font-medium" : "text-gray-500 hover:text-gray-700"
                }`}
                style={{ fontFamily: "Questrial, sans-serif", background: "none", border: "none", cursor: "pointer" }}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Viewport */}
          <div
            className="relative overflow-hidden rounded-2xl lg:rounded-3xl xl:rounded-4xl"
            style={{
              width: "clamp(700px, 80vw, 1254px)",
              height: "clamp(400px, 45vw, 659px)",
              backgroundColor: "#000"
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

                {/* Overlay text */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="text-white text-center text-[60px] lg:text-[76px] xl:text-[96px] 2xl:text-[120px]"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      lineHeight: "1.1",
                      textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                      marginBottom: carouselData[activeIndex].marginBottom || "4rem"
                    }}
                    dangerouslySetInnerHTML={{ __html: carouselData[activeIndex].videoText }}
                  />
                </div>

                {/* Tiny skeleton if we ever switch before ready (rare) */}
                {optimizedUrls[activeIndex] && !ready.has(activeIndex) && (
                  <div className="absolute inset-0 animate-pulse bg-[rgba(255,255,255,0.03)]" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <PartnershipCarouselMobile />
      </div>

      {/* Hidden preloader pool: current ±1 (keeps memory + CPU low) */}
      <div style={{ display: "none" }} aria-hidden>
        {neighbors(activeIndex).map((i) =>
          optimizedUrls[i] ? (
            <video
              key={`preload-${i}`}
              ref={(el) => {
                // we also mount real hidden <video> in the DOM, which helps some mobile browsers cache better
                if (el && !videoEls.current[i]) {
                  videoEls.current[i] = el;
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
    </>
  );
}
