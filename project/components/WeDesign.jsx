"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import WeDesignMobile from "./mobile/WeDesignMobile";

export default function WeDesign() {
  const carouselItems = [
    "a consumer brand winning hearts",
    "startup searching for credibility", 
    "any brand that appreciates design",
    "a non-profit mobilizing action",
    "a B2B brand simplifying complexity"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <>
      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block bg-white py-16 lg:py-20 xl:py-24 2xl:py-32">
        {/* Centered text - Responsive */}
        <h1
          className="text-center mb-8 lg:mb-10 xl:mb-12 2xl:mb-16 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[36px] lg:leading-[40px] xl:leading-[48px] 2xl:leading-[60px]"
          style={{
            fontFamily: "Questrial, sans-serif",
            color: "#000000"
          }}
        >
          Your <span className="text-black/50">website is</span> <br />
          <span className="text-black/50">your most</span> powerful touchpoint.
        </h1>

        {/* Container for green box and dots - centered together */}
        <div className="flex items-center justify-center px-4">
          {/* Green box - Responsive */}
          <div
            className="rounded-2xl lg:rounded-3xl relative flex items-center"
            style={{
              backgroundColor: "#E8FC53",
              width: "clamp(800px, 85vw, 1400px)",
              height: "clamp(300px, 32vw, 520px)",
              marginRight: "clamp(40px, 8vw, 100px)"
            }}
          >
            {/* Left side text - Responsive */}
            <div className="absolute left-4 lg:left-6 xl:left-8 2xl:left-12">
              <h2
                className="text-[48px] lg:text-[60px] xl:text-[76px] 2xl:text-[96px]"
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: "#000000",
                  lineHeight: "1.1"
                }}
              >
                We design for
              </h2>
            </div>

            {/* Right side carousel - Responsive */}
            <div className="absolute right-4 lg:right-6 xl:right-8 2xl:right-12 top-0 h-full flex flex-col justify-center overflow-hidden" style={{ width: "clamp(400px, 45vw, 600px)" }}>
              <div className="relative flex flex-col justify-center" style={{ height: "clamp(250px, 30vw, 320px)" }}>
                {carouselItems.map((item, index) => {
                  const position = (index - currentIndex + carouselItems.length) % carouselItems.length;
                  const yOffset = (position - 2) * 60;
                  
                  let opacity;
                  let scale;
                  
                  if (position === 2) {
                    opacity = 1;
                    scale = 1;
                  } else if (position === 0 || position === 4) {
                    opacity = 0.2;
                    scale = 0.8;
                  } else {
                    opacity = 0.4;
                    scale = 0.9;
                  }
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute w-full text-center text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]"
                      animate={{ 
                        y: yOffset, 
                        opacity: opacity,
                        scale: scale,
                        transition: { 
                          duration: 0.8,
                          ease: "easeInOut"
                        }
                      }}
                      style={{
                        fontFamily: "Questrial, sans-serif",
                        color: "#000000",
                        lineHeight: "1.2"
                      }}
                    >
                      {item}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Dotted indicators outside the box on the right - Responsive */}
            <div className="absolute top-0 h-full flex flex-col justify-center" style={{ right: "clamp(-60px, -12vw, -80px)" }}>
              <div className="relative flex flex-col justify-center" style={{ height: "clamp(250px, 30vw, 320px)" }}>
                {carouselItems.map((item, index) => {
                  const position = (index - currentIndex + carouselItems.length) % carouselItems.length;
                  const yOffset = (position - 2) * 60;
                  
                  let size;
                  let opacity;
                  
                  if (position === 2) {
                    size = { width: '39px', height: '39px' };
                    opacity = 1;
                  } else if (position === 1 || position === 3) {
                    size = { width: '15px', height: '15px' };
                    opacity = 0.7;
                  } else if (position === 0) {
                    size = { width: '11px', height: '11px' };
                    opacity = 0.2;
                  } else {
                    size = { width: '11px', height: '11px' };
                    opacity = 0.2;
                  }
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute rounded-full"
                      animate={{ 
                        y: yOffset,
                        width: size.width,
                        height: size.height,
                        opacity: opacity,
                        transition: { 
                          duration: 0.8,
                          ease: "easeInOut"
                        }
                      }}
                      style={{
                        backgroundColor: "#818181",
                        left: "90%",
                        transform: "translateX(-50%)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        <WeDesignMobile />
      </div>
    </>
  );
} 