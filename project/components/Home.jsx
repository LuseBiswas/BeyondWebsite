"use client";
import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import HomeMobile from "./mobile/HomeMobile";

export default function Home() {
  const videoRef = useRef(null); // no TS generic here

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
        preload="metadata" // was "auto"
        crossOrigin="anonymous" // helps with cross-origin fetch
        poster="/poster.jpg" // optional but recommended
      >
        <source src="https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_5.mov" />
        {/* or explicitly: type="video/quicktime" */}
        Your browser does not support the video tag.
      </video>

      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block relative z-10 px-4 lg:px-8 xl:px-12 2xl:px-16 py-5 min-h-screen">
        <div className="border-[3px] border-white/50 rounded-4xl h-[calc(100vh-4rem)] w-full p-4 lg:p-6 xl:p-8 2xl:p-12 relative text-white">
          <img
            src="/image/logo.png"
            alt="Logo"
            className="absolute top-4 lg:top-6 xl:top-8 2xl:top-12 left-6 lg:left-8 xl:left-12 2xl:left-16 w-[180px] lg:w-[220px] xl:w-[257px] 2xl:w-[320px] h-[79px] lg:h-[97px] xl:h-[113px] 2xl:h-[140px]"
          />
                    <div className="absolute bottom-8 2xl:bottom-12 left-6 lg:left-8 xl:left-12 2xl:left-16 right-6 lg:right-8 xl:right-12 2xl:right-16">
            <h1
              className="text-white font-normal text-[60px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px] mb-12 2xl:mb-16"
              style={{
                fontFamily: "Syne, sans-serif",
                lineHeight: "1.08"
              }}
            >
              <span className="opacity-60">Beyond websites,</span> <br /> let's
              transform.
            </h1>
            <p
              className="text-white font-normal text-[26px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[32px] lg:leading-[40px] xl:leading-[48px] 2xl:leading-[60px] mb-12 2xl:mb-16"
              style={{
                fontFamily: "Questrial, sans-serif",
              }}
            >
              At Design Responsible, we don't just design websites. <br />
              Because your story deserves more than screens and clicks - <br />
              it deserves to live beyond websites.
            </p>
            <div className="flex gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
              <button
                className="w-[180px] lg:w-[220px] xl:w-[250px] 2xl:w-[320px] h-[45px] lg:h-[53px] xl:h-[61px] 2xl:h-[75px] bg-transparent border-2 border-white text-white text-[22px] lg:text-[26px] xl:text-[30px] 2xl:text-[38px] rounded-4xl cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
                style={{ fontFamily: "Questrial, sans-serif" }}
                onClick={() => window.open("#pricing", "_blank")}
              >
                See Our Pricing
              </button>
              <button
                className="w-[150px] lg:w-[176px] xl:w-[203px] 2xl:w-[260px] h-[45px] lg:h-[53px] xl:h-[61px] 2xl:h-[75px] bg-white text-black text-[22px] lg:text-[26px] xl:text-[30px] 2xl:text-[38px] rounded-4xl cursor-pointer hover:bg-transparent hover:text-white hover:border-2 hover:border-white transition-all duration-300 flex items-center justify-center gap-1"
                style={{ fontFamily: "Questrial, sans-serif" }}
                onClick={() => window.open("#book-call", "_blank")}
              >
                Book Call
                <ArrowUpRight className="w-[28px] lg:w-[32px] xl:w-[36px] 2xl:w-[45px] h-[28px] lg:h-[32px] xl:h-[36px] 2xl:h-[45px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        <HomeMobile />
      </div>
    </div>
  );
}
