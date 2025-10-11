"use client";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Script from "next/script";
import HomeMobile from "./mobile/HomeMobile";
import { getOptimizedVideoUrl } from "../lib/cloudinary";

export default function Home() {
  const videoRef = useRef(null); // no TS generic here
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // Generate optimized video URL
  const optimizedVideoUrl = getOptimizedVideoUrl(
    "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025790/shutterstock_1065158980_1_jalep4.mov",
    {
      quality: "auto",
      format: "mp4"
    }
  );

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleBookCall = () => {
    window.open("https://calendly.com/hello-designresponsible/new-meeting?background_color=000000&text_color=ffffff&primary_color=e8fc53&month=2025-10", "_blank");
  };

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
          <img
            src="/image/logo.png"
            alt="Logo"
            className="absolute top-4 lg:top-6 xl:top-8 2xl:top-12 left-6 lg:left-8 xl:left-12 2xl:left-16 w-[160px] lg:w-[180px] xl:w-[220px] 2xl:w-[320px] h-[70px] lg:h-[79px] xl:h-[97px] 2xl:h-[140px]"
          />
                    <div className="absolute bottom-8 2xl:bottom-12 left-6 lg:left-8 xl:left-12 2xl:left-16 right-6 lg:right-8 xl:right-12 2xl:right-16">
            <h1
              className="text-white font-normal text-[48px] lg:text-[64px] xl:text-[80px] 2xl:text-[120px] mb-8 lg:mb-10 xl:mb-12 2xl:mb-16"
              style={{
                fontFamily: "Syne, sans-serif",
                lineHeight: "1.08"
              }}
            >
              <span className="opacity-60">Beyond websites,</span> <br /> let's
              transform.
            </h1>
            <p
              className="text-white font-normal text-[22px] lg:text-[26px] xl:text-[32px] 2xl:text-[48px] leading-[28px] lg:leading-[34px] xl:leading-[40px] 2xl:leading-[60px] mb-8 lg:mb-10 xl:mb-12 2xl:mb-16"
              style={{
                fontFamily: "Questrial, sans-serif",
              }}
            >
              At Design Responsible, we don't just design websites. <br />
              Because your story deserves more than screens and clicks - <br />
              it deserves to live beyond websites.
            </p>
            <div className="flex gap-3 lg:gap-4 xl:gap-5 2xl:gap-8">
              <button
                className="w-[160px] lg:w-[180px] xl:w-[220px] 2xl:w-[320px] h-[42px] lg:h-[48px] xl:h-[53px] 2xl:h-[75px] bg-transparent border-2 border-white text-white text-[18px] lg:text-[22px] xl:text-[26px] 2xl:text-[38px] rounded-4xl cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
                style={{ fontFamily: "Questrial, sans-serif" }}
                onClick={scrollToPricing}
              >
                See Our Pricing
              </button>
              <button
                className="w-[140px] lg:w-[150px] xl:w-[176px] 2xl:w-[260px] h-[42px] lg:h-[48px] xl:h-[53px] 2xl:h-[75px] bg-white text-black text-[18px] lg:text-[22px] xl:text-[26px] 2xl:text-[38px] rounded-4xl cursor-pointer hover:bg-transparent hover:text-white hover:border-2 hover:border-white transition-all duration-300 flex items-center justify-center gap-1"
                style={{ fontFamily: "Questrial, sans-serif" }}
                onClick={handleBookCall}
              >
                Book Call
                <ArrowUpRight className="w-[24px] lg:w-[28px] xl:w-[32px] 2xl:w-[45px] h-[24px] lg:h-[28px] xl:h-[32px] 2xl:h-[45px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        <HomeMobile />
      </div>

      {/* Calendly Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => setCalendlyLoaded(true)}
        onError={() => console.error('Failed to load Calendly script')}
      />
    </div>
  );
}
