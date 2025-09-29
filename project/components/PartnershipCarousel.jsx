"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PartnershipCarouselMobile from "./mobile/PartnershipCarouselMobile";

export default function PartnershipCarousel() {
  const carouselData = [
    {
      title: "Discover",
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_9.mov",
      videoText: "We listen deeply.",
      marginBottom: "9rem"
    },
    {
      title: "Design",
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_8.mov",
      videoText: "We shape with <br/> empathy and strategy",
      marginBottom: "9rem"
    },
    {
      title: "Deliver",
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_7.mp4",
      videoText: "We launch with precision",
      marginBottom: "9rem"
    },
    {
      title: "Evolve",
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/10.mov",
      videoText: "Because your growth <br/> doesn’t stop here."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-carousel functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselData.length);
    }, 6000); // Change slide every 4 seconds

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

  return (
    <>
      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block">
        <div className="bg-white min-h-screen flex flex-col items-center justify-center py-16 px-8">
      {/* Top text - Responsive */}
      <p
        className="text-center mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[36px] lg:leading-[40px] xl:leading-[48px] 2xl:leading-[60px]"
        style={{
          fontFamily: "Questrial, sans-serif",
          color: "#000000"
        }}
      >
        Our process is simple, human, <br /> 
        and built around you.
      </p>

      {/* Main heading - Responsive */}
      <h1
        className="text-center mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px]"
        style={{
          fontFamily: "Syne, sans-serif",
          color: "#000000",
          lineHeight: "1.1"
        }}
      >
        <span className="text-gray-500">This is </span>not just a project. <br />
        It's a partnership.
      </h1>

      {/* Navigation tabs - Responsive */}
      <div className="flex gap-32 lg:gap-40 xl:gap-48 2xl:gap-56 mb-8 lg:mb-10 xl:mb-12 2xl:mb-16">
        {carouselData.map((item, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`transition-all duration-300 text-[24px] lg:text-[26px] xl:text-[30px] 2xl:text-[36px] ${
              activeIndex === index 
                ? "text-black font-medium" 
                : "text-gray-500 hover:text-gray-700"
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

      {/* Video container - Responsive */}
      <div 
        className="relative overflow-hidden rounded-2xl lg:rounded-3xl xl:rounded-4xl" 
        style={{ 
          width: "clamp(700px, 80vw, 1254px)", 
          height: "clamp(400px, 45vw, 659px)" 
        }}
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
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              key={carouselData[activeIndex].videoUrl}
            >
              <source src={carouselData[activeIndex].videoUrl} />
              Your browser does not support the video tag.
            </video>

                        {/* Video overlay text */}
            <div className="absolute inset-0 flex items-end justify-center">
                              <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
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
          </motion.div>
        </AnimatePresence>
              </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        <PartnershipCarouselMobile />
      </div>
    </>
  );
} 