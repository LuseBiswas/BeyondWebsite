"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function PartnershipCarouselMobile() {
  const carouselData = [
    { title: "Discover", videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_9.mov", videoText: "We listen <br/> deeply.", textPos: "30%" },
    { title: "Design",   videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_8.mov", videoText: "We shape <br/> with empathy <br/> and strategy", textPos: "35%" },
    { title: "Deliver",  videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_7.mp4", videoText: "We launch <br/> with precision", textPos: "40%" },
    { title: "Evolve",   videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/10.mov",   videoText: "Because your <br/> growth doesn't <br/> stop here.", textPos: "35%" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(new Set([0]));
  const videoRefs = useRef({});

  // Preload adjacent videos
  useEffect(() => {
    const preloadIndexes = [
      activeIndex,
      (activeIndex + 1) % carouselData.length,
      (activeIndex - 1 + carouselData.length) % carouselData.length
    ];

    preloadIndexes.forEach(index => {
      if (!loadedVideos.has(index)) {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.src = carouselData[index].videoUrl;
        video.load();
        setLoadedVideos(prev => new Set([...prev, index]));
      }
    });
  }, [activeIndex, carouselData, loadedVideos]);

  // Auto-carousel functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselData.length]);

  // Pause auto-play when user interacts
  const handleTabClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 8 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  };

  // Ensure video plays when it becomes active
  useEffect(() => {
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      currentVideo.play().catch(() => {});
    }
  }, [activeIndex]);

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      {/* Sub header */}
      <p
        className="text-center mb-8 sm:mb-10 leading-[1.35] text-[clamp(26px,8.2vw,32px)] lg:text-[38px]"
        style={{ fontFamily: "Questrial, sans-serif", color: "#000" }}
      >
        Our process is <br /> simple, human, and built <br /> around you.
      </p>

      {/* Navigation tabs */}
      <div className="flex justify-center gap-6 sm:gap-8 mb-10 sm:mb-12">
        {carouselData.map((item, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`transition-all duration-300 text-[clamp(16px,4.5vw,20px)] ${
              activeIndex === index 
                ? "text-black font-medium" 
                : "text-gray-500"
            }`}
            style={{
              fontFamily: "Questrial, sans-serif",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Video carousel */}
      <div className="mx-auto w-full max-w-[30rem] mb-12 sm:mb-16">
        <div
          className="relative overflow-hidden rounded-2xl w-full"
          style={{ aspectRatio: "341 / 467", backgroundColor: "#f3f4f6" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            >
              <video
                ref={(el) => { if (el) videoRefs.current[activeIndex] = el; }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: `50% ${carouselData[activeIndex].textPos || "35%"}` }}
                autoPlay 
                loop 
                muted 
                playsInline 
                preload="auto"
                crossOrigin="anonymous"
                key={carouselData[activeIndex].videoUrl}
              >
                <source src={carouselData[activeIndex].videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Readability gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 45%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.65) 100%)" }}
              />

              {/* Overlay text */}
              <div className="absolute inset-0 flex items-end justify-center pb-10 sm:pb-14">
                <motion.h3
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-white text-center text-[clamp(24px,8vw,44px)]"
                  style={{ fontFamily: "Syne, sans-serif", lineHeight: "1.1", textShadow: "0 4px 8px rgba(0, 0, 0, 0.35)" }}
                  dangerouslySetInnerHTML={{ __html: carouselData[activeIndex].videoText }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

       {/* Main header */}
       <h1
        className="text-center leading-[1.1] text-[clamp(28px,9vw,44px)] lg:text-[96px]"
        style={{ fontFamily: "Syne, sans-serif", color: "#000" }}
      >
        <span className="text-gray-500">This is not</span>
        <br /> just a project. <br />
        It&apos;s a partnership.
      </h1>

      <div className="h-12 sm:h-16" />
    </div>
  );
}
