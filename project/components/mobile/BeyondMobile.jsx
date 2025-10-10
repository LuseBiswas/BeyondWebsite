"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function BeyondMobile() {
  // timings & easing (match desktop)
  const TRANSITION_MS = 900;   // crossfade duration
  const SLIDE_MS = 5000;       // time per slide
  const EASE = "easeInOut";

  // Mobile slides now mirror desktop: include a STATIC first slide
  const slides = [
    {
      id: 0,
      isStatic: false,
      imageUrl: "/image/bg.png",
      title: "Beyond the Surface",
      subtitle: "It's always"
    },
    {
      id: 1,
      isStatic: false,
      videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025674/shutterstock_3767390_1_nwf9tw.mov",
      title: "Beyond <br/> Attraction",
      subtitle: "It's always"
    },
    {
      id: 2,
      isStatic: false,
      videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025686/shutterstock_3625121845_zvc0xp.mov",
      title: "Beyond <br/>Colours",
      subtitle: "It's always"
    },
    {
      id: 3,
      isStatic: false,
      videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760110792/Website_Videos_kdvmfv.mp4",
      title: "Beyond<br/>Trends",
      subtitle: "It's always"
    },
    {
      id: 4,
      isStatic: false,
      videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025710/shutterstock_3847367763_jbsax0.mov",
      title: "Beyond<br/>Layouts",
      subtitle: "It's always"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const [activeVideoLayer, setActiveVideoLayer] = useState(0); // 0 or 1
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const preloadRef = useRef(null);

  // Swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd,   setTouchEnd]   = useState(null);

  const waitForPlaying = (el) =>
    new Promise((resolve) => {
      if (!el) return resolve();
      if (!el.paused && !el.ended && el.readyState >= 3) return resolve();
      const onPlaying = () => {
        el.removeEventListener("playing", onPlaying);
        resolve();
      };
      const t = setTimeout(() => {
        el.removeEventListener("playing", onPlaying);
        resolve();
      }, 1200);
      el.addEventListener("playing", onPlaying, { once: true });
      el.play().catch(() => {}); // muted + playsInline should allow autoplay
    });

  // Auto-advance loop (deterministic like desktop)
  useEffect(() => {
    let cancelled = false;
    let timer;

    const lookaheadPreload = (index) => {
      const la = slides[(index + 1) % slides.length];
      if (!la.isStatic && preloadRef.current) {
        if (preloadRef.current.src !== la.videoUrl) {
          preloadRef.current.src = la.videoUrl;
        }
        preloadRef.current.load();
      }
    };

    const goTo = async (nextIndex) => {
      if (cancelled) return;

      const next = slides[nextIndex];

      // Lookahead preload
      lookaheadPreload(nextIndex);

      // If next is static: simple swap content
      if (next.isStatic) {
        setSelectedSlide(next);
        setActiveIndex(nextIndex);
        return;
      }

      // Next is video: prep + crossfade
      const currentVideo = activeVideoLayer === 0 ? videoARef.current : videoBRef.current;
      const nextVideo    = activeVideoLayer === 0 ? videoBRef.current : videoARef.current;

      if (!nextVideo) {
        setSelectedSlide(next);
        setActiveIndex(nextIndex);
        return;
      }

      setIsTransitioning(true);
      try {
        if (nextVideo.src !== next.videoUrl) nextVideo.src = next.videoUrl;
        nextVideo.muted = true;
        nextVideo.loop = true;
        nextVideo.playsInline = true;
        nextVideo.preload = "auto";
        // tiny seek helps avoid black-first-frame on some Safari builds
        nextVideo.currentTime = 0.01;
        nextVideo.load();

        await waitForPlaying(nextVideo);

        // 1) Flip visible layer
        setActiveVideoLayer(activeVideoLayer === 0 ? 1 : 0);

        // 2) Update overlay right after flip starts
        requestAnimationFrame(() => setSelectedSlide(next));

        // 3) Pause old after fade
        setTimeout(() => {
          try { currentVideo && currentVideo.pause(); } catch {}
          setIsTransitioning(false);
        }, TRANSITION_MS + 40);

        // 4) Commit index
        setActiveIndex(nextIndex);
      } catch (e) {
        console.error("mobile transition error:", e);
        setSelectedSlide(next);
        setActiveIndex(nextIndex);
        setIsTransitioning(false);
      }
    };

    const advance = async () => {
      const nextIndex = (activeIndex + 1) % slides.length;
      await goTo(nextIndex);
      if (!cancelled) {
        timer = setTimeout(advance, SLIDE_MS);
      }
    };

    // initial schedule
    timer = setTimeout(advance, SLIDE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, activeVideoLayer]);

  // Manual swipe -> jump to target index via same transition logic
  const handleGoTo = async (index) => {
    if (isTransitioning) return;
    if (index === activeIndex) return;

    // Cancel any pending auto-advance by nudging activeIndex afterward (loop effect will reschedule)
    const next = index < 0
      ? slides.length - 1
      : index >= slides.length
        ? 0
        : index;

    // replicate core of goTo() without duplicating code:
    const la = slides[(next + 1) % slides.length];
    if (!la.isStatic && preloadRef.current) {
      if (preloadRef.current.src !== la.videoUrl) {
        preloadRef.current.src = la.videoUrl;
      }
      preloadRef.current.load();
    }

    const target = slides[next];
    if (target.isStatic) {
      setSelectedSlide(target);
      setActiveIndex(next);
      return;
    }

    const currentVideo = activeVideoLayer === 0 ? videoARef.current : videoBRef.current;
    const nextVideo    = activeVideoLayer === 0 ? videoBRef.current : videoARef.current;

    if (!nextVideo) {
      setSelectedSlide(target);
      setActiveIndex(next);
      return;
    }

    setIsTransitioning(true);
    try {
      if (nextVideo.src !== target.videoUrl) nextVideo.src = target.videoUrl;
      nextVideo.muted = true;
      nextVideo.loop = true;
      nextVideo.playsInline = true;
      nextVideo.preload = "auto";
      nextVideo.currentTime = 0.01;
      nextVideo.load();

      await waitForPlaying(nextVideo);

      setActiveVideoLayer(activeVideoLayer === 0 ? 1 : 0);
      requestAnimationFrame(() => setSelectedSlide(target));

      setTimeout(() => {
        try { currentVideo && currentVideo.pause(); } catch {}
        setIsTransitioning(false);
      }, TRANSITION_MS + 40);

      setActiveIndex(next);
    } catch (e) {
      console.error("mobile swipe transition error:", e);
      setSelectedSlide(target);
      setActiveIndex(next);
      setIsTransitioning(false);
    }
  };

  // Touch/swipe handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;
    const dx = touchStart - touchEnd;
    if (dx > 50)  handleGoTo(activeIndex + 1); // left swipe -> next
    if (dx < -50) handleGoTo(activeIndex - 1); // right swipe -> prev
  };

  return (
    <div
      className="bg-white relative min-h-screen overflow-hidden px-4 flex items-center justify-center"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Hidden preload video (lookahead) */}
      <video ref={preloadRef} className="hidden" muted playsInline preload="auto" />

      {/* Video card container */}
      <div className="relative w-full max-w-[360px] mx-auto" style={{ minWidth: "360px", minHeight: "646px" }}>
        {/* Background: static image + dual video layers */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ backgroundColor: "#000" }}>
          {/* Static image */}
          <motion.div
            animate={{ opacity: selectedSlide?.isStatic ? 1 : 0 }}
            transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
            className="w-full h-full"
            style={{ willChange: "opacity" }}
          >
            <Image
              src="/image/bg.png"
              alt="Background"
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>

          {/* Black background layer (for null videos) */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-black"
            animate={{
              opacity: selectedSlide?.isStatic ? 0 : !selectedSlide?.videoUrl ? 1 : 0
            }}
            transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
            style={{
              zIndex: !selectedSlide?.videoUrl ? 2 : 0,
              willChange: "opacity"
            }}
          />

          {/* Video layer A */}
          <motion.video
            ref={videoARef}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{
              opacity: selectedSlide?.isStatic ? 0 : selectedSlide?.videoUrl && activeVideoLayer === 0 ? 1 : 0
            }}
            transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
            muted
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            style={{
              zIndex: activeVideoLayer === 0 ? 2 : 1,
              willChange: "opacity",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden"
            }}
          />

          {/* Video layer B */}
          <motion.video
            ref={videoBRef}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{
              opacity: selectedSlide?.isStatic ? 0 : selectedSlide?.videoUrl && activeVideoLayer === 1 ? 1 : 0
            }}
            transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
            muted
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            style={{
              pointerEvents: "none",
              zIndex: activeVideoLayer === 1 ? 2 : 1,
              willChange: "opacity",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden"
            }}
          />
        </div>

        {/* Overlay content */}
        <div className="relative z-10" style={{ minHeight: "646px" }}>
          <AnimatePresence mode="wait">
            {/* Static content */}
            {selectedSlide?.isStatic && (
              <motion.div
                key="static-mobile"
                className="absolute left-0 right-0 top-0 pt-10 px-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
              >
                <motion.p
                  className="text-white mb-3"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  style={{ fontFamily: "Questrial, sans-serif", fontSize: "28px" }}
                  dangerouslySetInnerHTML={{ __html: selectedSlide.subtitle }}
                />
                <motion.h1
                  className="text-white"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
                  style={{ fontFamily: "Syne, sans-serif", fontSize: "44px", lineHeight: 1.12 }}
                >
                  {selectedSlide.title}
                </motion.h1>
              </motion.div>
            )}

            {/* Video slide content */}
            {selectedSlide && !selectedSlide.isStatic && (
              <motion.div
                key={`video-mobile-${selectedSlide.id}`}
                className="absolute left-0 right-0 top-0 pt-10 px-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
              >
                <motion.p
                  className="text-white mb-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  style={{ fontFamily: "Questrial, sans-serif", fontSize: "28px", lineHeight: 1.35 }}
                  dangerouslySetInnerHTML={{ __html: selectedSlide.subtitle }}
                />
                <motion.h1
                  className="text-white"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
                  style={{ fontFamily: "Syne, sans-serif", fontSize: "44px", lineHeight: 1.12 }}
                  dangerouslySetInnerHTML={{ __html: selectedSlide.title }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
