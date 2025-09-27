"use client";
import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export default function HomeMobile() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; v.setAttribute("muted", "");
    v.playsInline = true; v.setAttribute("playsinline", "");
    v.autoplay = true;

    const start = async () => {
      try { await v.play(); }
      catch { setTimeout(() => v.play().catch(() => {}), 150); }
    };

    if (v.readyState >= 2) start();
    else v.addEventListener("canplay", start, { once: true });
    return () => v.removeEventListener("canplay", start);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        // ⬇️ Tweaks: bias crop to top and zoom slightly, shifting upward
        style={{
          objectPosition: "80% 80%",        // move focus higher (try 25–40%)
          transform: "translateY(-10%) scale(1.1)", // lift & zoom a bit
          transformOrigin: "center top"     // keep zoom anchored at top
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        poster="/poster.jpg"
      >
        <source src="https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_5.mov" />
        Your browser does not support the video tag.
      </video>

      {/* Mobile Content */}
      <div className="relative z-10 p-3 sm:p-4 min-h-screen">
        <div className="border-2 border-white/50 rounded-2xl h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)] w-full p-4 sm:p-6 relative text-white">
          <img
            src="/image/logo.png"
            alt="Logo"
            className="absolute top-4 sm:top-6 left-4 sm:left-6"
            style={{ width: "clamp(160px, 50vw, 242px)", height: "clamp(70px, 22vw, 106px)" }}
          />

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-center">
            <h1
              className="text-white font-normal mb-6 sm:mb-8 text-center"
              style={{ fontFamily: "Syne, sans-serif", lineHeight: "1.08", fontSize: "clamp(28px, 9.5vw, 44px)" }}
            >
              <span className="opacity-60">Beyond websites,</span> <br /> let&apos;s transform.
            </h1>

            <p
              className="text-white font-normal mb-6 sm:mb-8 text-center"
              style={{
                fontFamily: "Questrial, sans-serif",
                fontSize: "clamp(18px, 6vw, 28px)",
                lineHeight: "clamp(24px, 8vw, 36px)",
              }}
            >
              At Design Responsible,<br />
              we don&apos;t just design<br />
              websites. Because your<br />
              story deserves more than<br />
              screens and clicks — it<br />
              deserves to live <br />
              beyond websites.
            </p>

            <div className="flex flex-row gap-3 sm:gap-4 items-center justify-center">
              <button
                className="bg-transparent border-2 border-white text-white rounded-4xl cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
                style={{
                  fontFamily: "Questrial, sans-serif",
                  width: "clamp(120px, 33vw, 145px)",
                  height: "clamp(40px, 11vw, 48px)",
                  fontSize: "clamp(16px, 4.5vw, 20px)",
                }}
                onClick={() => (window.location.hash = "pricing")}
              >
                Our Pricing
              </button>

              <button
                className="bg-white text-black rounded-4xl cursor-pointer hover:bg-transparent hover:text-white hover:border-2 hover:border-white transition-all duration-300 flex items-center justify-center gap-1"
                style={{
                  fontFamily: "Questrial, sans-serif",
                  width: "clamp(122px, 33.4vw, 147px)",
                  height: "clamp(40px, 11vw, 48px)",
                  fontSize: "clamp(16px, 4.5vw, 20px)",
                }}
                onClick={() => (window.location.hash = "book-call")}
              >
                Book Call
                <ArrowUpRight
                  className="inline-block"
                  style={{ width: "clamp(20px, 6vw, 28px)", height: "clamp(20px, 6vw, 28px)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
