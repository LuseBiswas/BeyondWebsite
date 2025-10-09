"use client";
import { useRef, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getOptimizedVideoUrl } from "../../lib/cloudinary";

export default function Home2Mobile() {
  const videoRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    // Ensure attributes are in place before attempting play (iOS/Safari)
    v.muted = true;
    v.setAttribute("muted", ""); // some iOS versions require the attribute
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.autoplay = true;

    const start = async () => {
      try {
        await v.play();
      } catch (err) {
        // Retry once after a tick; some devices need a small delay
        setTimeout(() => v.play().catch(() => {}), 150);
        // Keep console error for debugging:
        console.error("Autoplay blocked or failed:", err);
      }
    };

    if (v.readyState >= 2) start();
    else v.addEventListener("canplay", start, { once: true });

    return () => v.removeEventListener("canplay", start);
  }, []);

  // Auto-toggle menu effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMenuOpen((prev) => !prev);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isMenuOpen]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800">
      {/* Background Video */}
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

      {/* Mobile Layout */}
      <div className="relative z-10 p-3 sm:p-4 min-h-screen">
        <div className="border-2 border-white/50 rounded-2xl h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)] w-full p-4 sm:p-6 relative text-white">
          {/* Top left text - Mobile */}
          <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 left-4 sm:left-6 md:left-8 lg:left-10 z-50">
            <div
              className="font-normal text-right transition-colors duration-300"
              style={{
                fontFamily: "Questrial, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(22px, 5.5vw, 60px)",
                lineHeight: "1.1",
                color: isMenuOpen ? "#193A43" : "#FFFFFF",
              }}
              dangerouslySetInnerHTML={{ __html: "too <br/> often" }}
            />
          </div>

          {/* Hamburger/Close Icon - Always visible */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 z-50"
          >
            {isMenuOpen ? (
              <X
                className="text-black"
                style={{
                  width: "clamp(28px, 5vw, 56px)",
                  height: "clamp(28px, 5vw, 56px)",
                }}
              />
            ) : (
              <Menu
                className="text-white"
                style={{
                  width: "clamp(28px, 5vw, 56px)",
                  height: "clamp(20px, 3.5vw, 40px)",
                }}
              />
            )}
          </button>

          {/* Expandable Yellow Ribbon */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ width: 0, height: 0 }}
                animate={{ 
                  width: "100%",
                  height: "clamp(450px, 55vh, 700px)"
                }}
                exit={{ width: 0, height: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="absolute top-0 right-0 overflow-hidden origin-top-right"
                style={{
                  backgroundColor: "#FCEE21",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 85%)",
                }}
              >
                {/* Text content inside the ribbon */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute top-16 sm:top-20 md:top-24 lg:top-28 right-3 sm:right-4 md:right-8 lg:right-10 left-3 sm:left-4 md:left-8 lg:left-10 text-right flex flex-col justify-center pb-8 sm:pb-10 md:pb-12"
                  style={{ height: "calc(100% - 8rem)" }}
                >
                  <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                    <div
                      className="text-[#193A43] font-normal text-right"
                      style={{
                        fontFamily: "Questrial, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(18px, 4vw, 36px)",
                        lineHeight: "1.25",
                        letterSpacing: "0%",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: "Just treated <br/> as decoration",
                      }}
                    />
                    <div
                      className="text-[#193A43] font-normal text-right"
                      style={{
                        fontFamily: "Questrial, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(18px, 4vw, 36px)",
                        lineHeight: "1.25",
                        letterSpacing: "0%",
                      }}
                    >
                      Vibrant colours
                    </div>
                    <div
                      className="text-[#193A43] font-normal text-right"
                      style={{
                        fontFamily: "Questrial, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(18px, 4vw, 36px)",
                        lineHeight: "1.25",
                        letterSpacing: "0%",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: "Pixels arranged <br/> without purpose",
                      }}
                    />

                    {/* Button */}
                    <div className="flex justify-end mt-2 sm:mt-4 md:mt-6">
                      <button
                        className="font-normal rounded-4xl"
                        style={{
                          width: "clamp(110px, 24vw, 180px)",
                          height: "clamp(40px, 8vw, 64px)",
                          fontFamily: "Questrial, sans-serif",
                          fontSize: "clamp(14px, 3vw, 24px)",
                          fontWeight: 400,
                          backgroundColor: "#193A43",
                          color: "#FCEE21",
                        }}
                      >
                        But, Why?
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom content - Mobile */}
          <div className="absolute left-4 sm:left-6 md:left-8 lg:left-10 right-4 sm:right-6 md:right-8 lg:right-10 bottom-12 sm:bottom-8 md:bottom-10 lg:bottom-12">
            <h1
              className="text-white font-normal mb-4 sm:mb-6 md:mb-8 lg:mb-10"
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(28px, 6vw, 72px)",
                lineHeight: "1.12",
              }}
            >
              <span className="opacity-60">But</span> beauty{" "}
              <span className="opacity-60">alone</span> <br /> doesn&apos;t last.
            </h1>
            <p
              className="text-white font-normal"
              style={{
                fontFamily: "Questrial, sans-serif",
                fontSize: "clamp(16px, 4vw, 42px)",
                lineHeight: "1.35",
              }}
            >
              Design with empathy,<br />
              purpose, and responsibility <br />
              — so your website becomes <br />
              not just attractive, but alive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}