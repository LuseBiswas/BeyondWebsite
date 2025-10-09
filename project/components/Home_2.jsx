"use client";
import { useRef, useEffect } from "react";
import Home2Mobile from "./mobile/Home2Mobile";
import { getOptimizedVideoUrl } from "../lib/cloudinary";

export default function Home_2() {
  const videoRef = useRef(null); // no TS generic here

  // Generate optimized video URL
  const optimizedVideoUrl = getOptimizedVideoUrl(
    "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760026792/shutterstock_3468863127_h7embb.mov",
    {
      quality: "auto",
      format: "mp4"
    }
  );

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playsInline = true;

    const start = async () => {
      try {
        await v.play();
      } catch (err) {
        console.error("Autoplay blocked or failed:", err);
      }
    };

    if (v.readyState >= 2) start();
    else v.addEventListener("canplay", start, { once: true });

    return () => v.removeEventListener("canplay", start);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800">
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover pointer-events-none"
        style={{ top: '-32px', left: '-46px', transform: 'scale(1.1)' }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src={optimizedVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block relative z-10 px-4 lg:px-8 xl:px-12 2xl:px-16 py-5 min-h-screen">
        <div className="border-[3px] border-white/50 rounded-4xl h-[calc(100vh-4rem)] w-full p-4 lg:p-6 xl:p-8 2xl:p-12 relative text-white">
          {/* Top left text */}
          <div className="absolute top-4 lg:top-6 xl:top-8 2xl:top-12 left-6 lg:left-8 xl:left-12 2xl:left-16">
            <div 
              className="text-white font-normal text-right text-[40px] lg:text-[48px] xl:text-[54px] 2xl:text-[64px] leading-[32px] lg:leading-[36px] xl:leading-[38px] 2xl:leading-[42px]"
              style={{ 
                fontFamily: 'Questrial, sans-serif',
                fontWeight: 400
              }}
              dangerouslySetInnerHTML={{ __html: 'too <br/> often' }}
            />
          </div>

          {/* Top right texts */}
          <div className="absolute top-4 lg:top-6 xl:top-8 2xl:top-12 right-6 lg:right-8 xl:right-12 2xl:right-16 flex gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
            <div 
              className="text-white font-normal text-[20px] lg:text-[26px] xl:text-[30px] 2xl:text-[36px] leading-[28px] lg:leading-[34px] xl:leading-[38px] 2xl:leading-[44px]"
              style={{ 
                fontFamily: 'Questrial, sans-serif',
                fontWeight: 400
              }}
            >
              Treated as decoration
            </div>
            <div 
              className="text-white font-normal text-[20px] lg:text-[26px] xl:text-[30px] 2xl:text-[36px] leading-[28px] lg:leading-[34px] xl:leading-[38px] 2xl:leading-[44px]"
              style={{ 
                fontFamily: 'Questrial, sans-serif',
                fontWeight: 400
              }}
            >
              Pixels arranged
            </div>
            <div 
              className="text-white font-normal text-[20px] lg:text-[26px] xl:text-[30px] 2xl:text-[36px] leading-[28px] lg:leading-[34px] xl:leading-[38px] 2xl:leading-[44px]"
              style={{ 
                fontFamily: 'Questrial, sans-serif',
                fontWeight: 400
              }}
            >
              Colours chosen
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-8 2xl:bottom-12 left-6 lg:left-8 xl:left-12 2xl:left-16 right-6 lg:right-8 xl:right-12 2xl:right-16">
            <h1
              className="text-white font-normal text-[60px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px] mb-12 2xl:mb-16"
              style={{
                fontFamily: "Syne, sans-serif",
                lineHeight: "1.08"
              }}
                          >
                <span className="opacity-60">But </span> beauty <span className="opacity-60">alone</span> <br /> 
                doesn't last.
              </h1>
            <p
              className="text-white font-normal text-[26px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[32px] lg:leading-[40px] xl:leading-[48px] 2xl:leading-[60px]"
              style={{
                fontFamily: "Questrial, sans-serif",
              }}
            >
              Design with empathy, purpose,<br /> 
              and responsibility - so your website becomes <br /> 
              not just attractive, but alive.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        <Home2Mobile />
      </div>
    </div>
  );
} 