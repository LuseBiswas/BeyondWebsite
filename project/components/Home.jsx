"use client";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Script from "next/script";
import HomeMobile from "./mobile/HomeMobile";

export default function Home() {
  const videoRef = useRef(null);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  const scrollToPricing = () => {
    const el = document.getElementById("pricing-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBookCall = () => {
    window.open(
      "https://calendly.com/hello-designresponsible/new-meeting?background_color=000000&text_color=ffffff&primary_color=e8fc53&month=2025-10",
      "_blank"
    );
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const start = async () => {
      try { await v.play(); } catch (err) { console.error("Autoplay blocked:", err); }
    };
    if (v.readyState >= 2) start();
    else v.addEventListener("canplay", start, { once: true });
    return () => v.removeEventListener("canplay", start);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay loop muted playsInline preload="auto"
      >
        <source src="/videos/optimized-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Desktop & Tablet (lg and above) */}
      <div
        className="
          hidden lg:block relative z-10
          px-[clamp(20px,3vw,96px)] py-[clamp(20px,2.8vw,48px)]
          min-h-screen
        "
      >
        <div
          className="
            border-[3px] border-white/50 rounded-[32px]
            min-h-[calc(100vh-2*clamp(20px,2.8vw,48px))]
            w-full
            p-[clamp(20px,2.6vw,64px)]
            2xl:p-[clamp(28px,3vw,80px)]
            text-white
            grid grid-rows-[auto_1fr]
            gap-[clamp(16px,2.2vw,40px)]
            relative
          "
        >
          {/* Header row: logo */}
          <div className="flex items-center">
            <img
              src="/image/logo.png"
              alt="Logo"
              className="
                h-[clamp(72px,9vw,160px)]
                2xl:h-[clamp(120px,8vw,200px)]
                w-auto block
              "
            />
          </div>

          {/* Content row */}
          <div
            className="
              flex flex-col justify-end
              gap-[clamp(18px,3.2vw,48px)]
              max-w-[min(92vw,1600px)]
              2xl:max-w-[min(92vw,1800px)]
              mx-[clamp(0px,1vw,12px)]
            "
          >
            <h1
              className="
                font-normal
                text-[clamp(44px,7.2vw,140px)]
                2xl:text-[clamp(56px,7.8vw,160px)]
                leading-[1.04]
                tracking-[-0.012em]
              "
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span className="opacity-60">Beyond websites,</span><br />
              let&apos;s transform.
            </h1>

            <p
              className="
                font-normal
                text-[clamp(20px,2.6vw,34px)]
                2xl:text-[clamp(22px,2.4vw,38px)]
                leading-[clamp(28px,3.4vw,50px)]
                opacity-95
                max-w-[72ch]
              "
              style={{ fontFamily: "Questrial, sans-serif" }}
            >
              Crafted with human-centric design and development <br />
              powered by AI. Your timeless digital presence, delivered <br />
              in just two weeks!
            </p>

            <div className="flex flex-wrap items-center gap-[clamp(12px,2.2vw,28px)]">
              <button
                className="
                  h-[clamp(48px,5.5vw,80px)]
                  px-[clamp(22px,2.8vw,40px)]
                  bg-transparent border-2 border-white text-white
                  text-[clamp(18px,2vw,26px)]
                  2xl:text-[clamp(20px,1.8vw,30px)]
                  rounded-[999px]
                  cursor-pointer
                  hover:bg-white hover:text-black
                  transition-all duration-300
                "
                style={{ fontFamily: "Questrial, sans-serif" }}
                onClick={scrollToPricing}
              >
                See Our Pricing
              </button>

              <button
                className="
                  h-[clamp(48px,5.5vw,80px)]
                  px-[clamp(22px,2.8vw,40px)]
                  bg-white text-black
                  text-[clamp(18px,2vw,26px)]
                  2xl:text-[clamp(20px,1.8vw,30px)]
                  rounded-[999px]
                  cursor-pointer
                  hover:bg-transparent hover:text-white hover:border-2 hover:border-white
                  transition-all duration-300
                  flex items-center justify-center gap-[clamp(8px,1.2vw,14px)]
                "
                style={{ fontFamily: "Questrial, sans-serif" }}
                onClick={handleBookCall}
              >
                Book Call
                <ArrowUpRight className="w-[clamp(22px,2.2vw,36px)] h-[clamp(22px,2.2vw,36px)]" />
              </button>
            </div>
          </div>

          {/* Optional bottom gradient for contrast (kept off by default) */}
          {/* <div className="pointer-events-none absolute inset-x-[clamp(20px,2.6vw,64px)] bottom-[clamp(20px,2.6vw,64px)] h-[18%] bg-gradient-to-t from-black/30 to-transparent rounded-b-[28px]" /> */}
        </div>
      </div>

      {/* Mobile (below lg) */}
      <div className="lg:hidden relative z-10">
        <HomeMobile />
      </div>

      {/* Calendly Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => setCalendlyLoaded(true)}
        onError={() => console.error("Failed to load Calendly script")}
      />
    </div>
  );
}
