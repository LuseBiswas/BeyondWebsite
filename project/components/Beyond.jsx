"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import BeyondMobile from "./mobile/BeyondMobile";

export default function Beyond() {
  // --- timings & easing ---
  const TRANSITION_MS = 900;     // crossfade duration
  const SLIDE_MS = 5000;         // time a slide stays before advancing
  const EASE = "easeInOut";

  const carouselData = [
    { id: 0, isStatic: false, videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760112150/shutterstock_3499135879_rew8hi.mov", title: "Beyond the Surface", subtitle: "It's always" },
    { id: 1, isStatic: false, videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760111518/Deepsea_av4ko4.mp4", title: "Beyond <br/> Attraction", subtitle: "into trust, engagement,<br/>and action." },
    { id: 2, isStatic: false, videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025686/shutterstock_3625121845_zvc0xp.mov", title: "Beyond <br/>Colours", subtitle: "into clarity, accessibility,<br/>and emotion." },
    { id: 3, isStatic: false, videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760110792/Website_Videos_kdvmfv.mp4", title: "Beyond<br/>Trends", subtitle: "into timeless design<br/>that adapts to change." },
    { id: 4, isStatic: false, videoUrl: "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025710/shutterstock_3847367763_jbsax0.mov", title: "Beyond<br/>Layouts", subtitle: "into journeys that feel<br/>intuitive and human." }
  ];

  const [activeIndex, setActiveIndex] = useState(0);                 // which slide index we're on
  const [selectedCard, setSelectedCard] = useState(carouselData[0]); // content for overlay
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);       // which video layer is on top (0 or 1)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const backgroundVideoRef = useRef(null);   // layer A
  const backgroundVideoRef2 = useRef(null);  // layer B
  const preloadVideoRef = useRef(null);      // hidden preloader

  // resolves when the element is actually playing
  const waitForPlaying = (el) =>
    new Promise((res) => {
      if (!el) return res();
      if (!el.paused && !el.ended && el.readyState >= 3) return res();
      const onPlaying = () => {
        el.removeEventListener("playing", onPlaying);
        res();
      };
      // safety timer in case 'playing' doesn't fire on some browsers
      const t = setTimeout(() => {
        el.removeEventListener("playing", onPlaying);
        res();
      }, 1200);
      el.addEventListener("playing", onPlaying, { once: true });
      el.play().catch(() => {}); // muted + playsInline should allow autoplay
    });

  // Main loop: prepares next slide and performs crossfade deterministically
  useEffect(() => {
    let cancelled = false;
    let nextTimer;

    const queueNext = () => {
      nextTimer = setTimeout(advance, SLIDE_MS);
    };

    const advance = async () => {
      if (cancelled || isTransitioning) {
        queueNext();
        return;
      }

      const nextIndex = (activeIndex + 1) % carouselData.length;
      const nextCard = carouselData[nextIndex];

      // Preload the video after next (lookahead) to reduce stalls
      const lookahead = carouselData[(nextIndex + 1) % carouselData.length];
      if (!lookahead.isStatic && preloadVideoRef.current) {
        if (preloadVideoRef.current.src !== lookahead.videoUrl) {
          preloadVideoRef.current.src = lookahead.videoUrl;
        }
        preloadVideoRef.current.load();
      }

      // If next is a static slide (image), simple: update content and let the image layer fade in
      if (nextCard.isStatic) {
        setSelectedCard(nextCard);
        setActiveIndex(nextIndex);
        queueNext();
        return;
      }

      // Next is a video: prepare the next video fully, then crossfade
      const currentVideo =
        activeVideoIndex === 0 ? backgroundVideoRef.current : backgroundVideoRef2.current;
      const nextVideo =
        activeVideoIndex === 0 ? backgroundVideoRef2.current : backgroundVideoRef.current;

      if (!nextVideo || !nextCard.videoUrl) {
        // fallback: just update content/index
        setSelectedCard(nextCard);
        setActiveIndex(nextIndex);
        queueNext();
        return;
      }

      setIsTransitioning(true);

      try {
        if (nextVideo.src !== nextCard.videoUrl) nextVideo.src = nextCard.videoUrl;
        nextVideo.muted = true;
        nextVideo.loop = true;
        nextVideo.playsInline = true;
        nextVideo.preload = "auto";
        // tiny seek helps avoid black-first-frame in some Safari builds
        nextVideo.currentTime = 0.01;
        nextVideo.load();

        await waitForPlaying(nextVideo);

        // 1) Flip the visible layer
        setActiveVideoIndex(activeVideoIndex === 0 ? 1 : 0);

        // 2) Update the overlay content right after flip starts (keeps text in sync)
        requestAnimationFrame(() => setSelectedCard(nextCard));

        // 3) Pause the old video after fade ends
        setTimeout(() => {
          try { currentVideo && currentVideo.pause(); } catch {}
          setIsTransitioning(false);
        }, TRANSITION_MS + 40);

        // 4) Commit new index
        setActiveIndex(nextIndex);
        queueNext();
      } catch (e) {
        console.error("transition error:", e);
        setSelectedCard(nextCard);
        setActiveIndex(nextIndex);
        setIsTransitioning(false);
        queueNext();
      }
    };

    // Kick off loop
    queueNext();

    return () => {
      cancelled = true;
      clearTimeout(nextTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, activeVideoIndex, isTransitioning]); // react to state changes

  return (
    <>
      {/* Desktop and Tablet */}
      <div className="hidden lg:block bg-black relative h-[1260px]">
        {/* Background image & videos */}
        <div className="absolute inset-0" style={{ backgroundColor: "#000" }}>
          {/* Static image layer */}
          <motion.div
            animate={{ opacity: selectedCard?.isStatic ? 1 : 0 }}
            transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
            className="w-full h-full"
            style={{ willChange: "opacity" }}
          >
            <Image
              src="/image/bg.png"
              alt="Background"
              fill
              className="object-cover object-top"
              style={{ height: "100%", maxHeight: "1000px" }}
              priority
            />
          </motion.div>

          {/* Black background layer (for null videos) */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-black"
            animate={{
              opacity: selectedCard?.isStatic ? 0 : !selectedCard?.videoUrl ? 1 : 0
            }}
            transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
            style={{
              zIndex: !selectedCard?.videoUrl ? 2 : 0,
              willChange: "opacity"
            }}
          />

          {/* Video layer A */}
          <motion.video
            ref={backgroundVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{
              opacity: selectedCard?.isStatic ? 0 : selectedCard?.videoUrl && activeVideoIndex === 0 ? 1 : 0
            }}
            transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
            muted
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            style={{
              zIndex: activeVideoIndex === 0 ? 2 : 1,
              willChange: "opacity",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden"
            }}
          />

          {/* Video layer B */}
          <motion.video
            ref={backgroundVideoRef2}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{
              opacity: selectedCard?.isStatic ? 0 : selectedCard?.videoUrl && activeVideoIndex === 1 ? 1 : 0
            }}
            transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
            muted
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            style={{
              pointerEvents: "none",
              zIndex: activeVideoIndex === 1 ? 2 : 1,
              willChange: "opacity",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden"
            }}
          />
        </div>

        {/* Hidden preload video (lookahead) */}
        <video ref={preloadVideoRef} className="hidden" muted playsInline preload="auto" />

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center justify-start pt-16">
          <AnimatePresence mode="wait">
            {/* Static slide content */}
            {selectedCard?.isStatic && (
              <motion.div
                key="static-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
              >
                <motion.h1
                  className="text-center mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  style={{ fontFamily: "Syne, sans-serif", color: "#FFFFFF", lineHeight: "1.1" }}
                >
                  {selectedCard.title}
                </motion.h1>

                <motion.p
                  className="text-center mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                  style={{ fontFamily: "Questrial, sans-serif", color: "#FFFFFF" }}
                >
                  {selectedCard.subtitle}
                </motion.p>
              </motion.div>
            )}

            {/* Video slide content (top-anchored, margin from top) */}
            {selectedCard && !selectedCard.isStatic && (
              <motion.div
                key={`video-content-${selectedCard.id}`}
                className="
                  absolute left-0 right-0 top-0 z-20
                  pl-12 lg:pl-16 xl:pl-24 2xl:pl-32
                  pt-24 lg:pt-28 xl:pt-36 2xl:pt-44
                  flex flex-col items-start
                "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
              >
                <div className="max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl">
                  {selectedCard.id === 0 ? (
                    <>
                      <motion.p
                        key={`subtitle-${selectedCard.id}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="
                          text-white mb-4 lg:mb-5 xl:mb-6 2xl:mb-8
                          text-[26px] lg:text-[30px] xl:text-[36px] 2xl:text-[44px]
                          leading-[1.3] lg:leading-[1.35] xl:leading-[1.4] 2xl:leading-[1.45]
                        "
                        style={{ fontFamily: "Questrial, sans-serif", paddingLeft: "1rem" }}
                        dangerouslySetInnerHTML={{ __html: selectedCard.subtitle }}
                      />

                      <motion.h1
                        key={`title-${selectedCard.id}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="
                          text-white
                          text-[56px] lg:text-[72px] xl:text-[92px] 2xl:text-[112px]
                        "
                        style={{ fontFamily: "Syne, sans-serif", lineHeight: "1.1", paddingLeft: "1rem" }}
                        dangerouslySetInnerHTML={{ __html: selectedCard.title }}
                      />
                    </>
                  ) : (
                    <>
                      <motion.h1
                        key={`title-${selectedCard.id}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="
                          text-white mb-4 lg:mb-5 xl:mb-6 2xl:mb-8
                          text-[56px] lg:text-[72px] xl:text-[92px] 2xl:text-[112px]
                        "
                        style={{ fontFamily: "Syne, sans-serif", lineHeight: "1.1", paddingLeft: "1rem" }}
                        dangerouslySetInnerHTML={{ __html: selectedCard.title }}
                      />

                      <motion.p
                        key={`subtitle-${selectedCard.id}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="
                          text-white
                          text-[26px] lg:text-[30px] xl:text-[36px] 2xl:text-[44px]
                          leading-[1.3] lg:leading-[1.35] xl:leading-[1.4] 2xl:leading-[1.45]
                        "
                        style={{ fontFamily: "Questrial, sans-serif", paddingLeft: "1rem" }}
                        dangerouslySetInnerHTML={{ __html: selectedCard.subtitle }}
                      />
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <BeyondMobile />
      </div>
    </>
  );
}
