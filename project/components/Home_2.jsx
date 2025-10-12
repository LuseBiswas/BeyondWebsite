"use client";
import { useRef, useEffect } from "react";
import Home2Mobile from "./mobile/Home2Mobile";
import { getOptimizedVideoUrl } from "../lib/cloudinary";

export default function Home_2() {
  const videoRef = useRef(null);

  const optimizedVideoUrl = getOptimizedVideoUrl(
    "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760026792/shutterstock_3468863127_h7embb.mov",
    { quality: "auto", format: "mp4" }
  );

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const start = async () => {
      try { await v.play(); } catch (err) { console.error("Autoplay blocked or failed:", err); }
    };
    if (v.readyState >= 2) start();
    else v.addEventListener("canplay", start, { once: true });
    return () => v.removeEventListener("canplay", start);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800">
      {/* Background video fills safely across breakpoints */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
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

      {/* Desktop & Tablet (lg and above) */}
      <div className="hidden lg:block relative z-10 px-[clamp(20px,3vw,96px)] py-[clamp(20px,2.8vw,48px)] min-h-screen">
        <div
          className="
            border-[3px] border-white/50 rounded-[32px]
            min-h-[calc(100vh-2*clamp(20px,2.8vw,48px))]
            w-full text-white
            p-[clamp(20px,2.6vw,64px)] 2xl:p-[clamp(28px,3vw,80px)]
            grid grid-rows-[auto_1fr_auto] gap-[clamp(16px,2.2vw,40px)]
            relative
          "
        >
          {/* HEADER ROW: top-left + top-right in one bar (no absolute positioning) */}
          <div className="flex items-start justify-between gap-[clamp(12px,2vw,32px)]">
            {/* Top-left text */}
            <div
              className="
                text-right font-normal
                text-[clamp(32px,4.8vw,64px)]
                leading-[1.05]
                tracking-[-0.01em]
              "
              style={{ fontFamily: "Questrial, sans-serif", fontWeight: 400 }}
            >
              <span>too</span>
              <br />
              <span>often</span>
            </div>

            {/* Top-right texts (wrap if space is tight) */}
            <div className="flex flex-wrap items-start justify-end gap-[clamp(10px,1.8vw,24px)] max-w-[min(60vw,900px)]">
              {["Treated as decoration", "Pixels arranged", "Colours chosen"].map((t) => (
                <div
                  key={t}
                  className="
                    font-normal
                    text-[clamp(18px,2.2vw,36px)]
                    leading-[clamp(24px,3vw,44px)]
                    opacity-95
                  "
                  style={{ fontFamily: "Questrial, sans-serif", fontWeight: 400 }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* SPACER ROW (1fr) — keeps the bottom content anchored at the base */}
          <div />

          {/* BOTTOM ROW: main heading + paragraph */}
          <div className="max-w-[min(92vw,1600px)] 2xl:max-w-[min(92vw,1800px)]">
            <h1
              className="
                font-normal
                text-[clamp(56px,7vw,120px)]
                2xl:text-[clamp(72px,7.6vw,140px)]
                leading-[1.06]
                tracking-[-0.012em]
                mb-[clamp(16px,2.4vw,32px)]
              "
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span className="opacity-60">But </span>beauty <span className="opacity-60">alone</span>
              <br />
              doesn&apos;t last.
            </h1>

            <p
              className="
                font-normal
                text-[clamp(20px,2.6vw,38px)]
                2xl:text-[clamp(22px,2.4vw,48px)]
                leading-[clamp(28px,3.4vw,60px)]
                max-w-[72ch] opacity-95
              "
              style={{ fontFamily: "Questrial, sans-serif" }}
            >
              Design with empathy, purpose,
              <br />
              and responsibility — so your website becomes
              <br />
              not just attractive, but alive.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile (below lg) */}
      <div className="lg:hidden relative z-10">
        <Home2Mobile />
      </div>
    </div>
  );
}
