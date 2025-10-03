"use client";
import { useRef, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home2Mobile() {
  const videoRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        preload="metadata"
        crossOrigin="anonymous"
        poster="/poster.jpg"
      >
        {/* If the source is MOV, some Androids may not autoplay. MP4 (H.264) is safest. */}
        <source src="https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_6.mov" />
        {/* Optional: add a type if you can convert to mp4 */}
        {/* <source src="/video.mp4" type="video/mp4" /> */}
        Your browser does not support the video tag.
      </video>

      {/* Mobile Layout */}
      <div className="relative z-10 p-3 sm:p-4 min-h-screen">
        <div className="border-2 border-white/50 rounded-2xl h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)] w-full p-4 sm:p-6 relative text-white">
          {/* Top left text - Mobile */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-50">
            <div
              className="font-normal text-right transition-colors duration-300"
              style={{
                fontFamily: "Questrial, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(22px, 7vw, 38px)",
                lineHeight: "1.1",
                color: isMenuOpen ? "#193A43" : "#FFFFFF",
              }}
              dangerouslySetInnerHTML={{ __html: "too <br/> often" }}
            />
          </div>

          {/* Hamburger/Close Icon - Always visible */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50"
          >
            {isMenuOpen ? (
              <X
                className="text-black"
                style={{
                  width: "clamp(28px, 7vw, 43px)",
                  height: "clamp(28px, 7vw, 43px)",
                }}
              />
            ) : (
              <Menu
                className="text-white"
                style={{
                  width: "clamp(28px, 7vw, 43px)",
                  height: "clamp(20px, 5vw, 28px)",
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
                  height: "50vh"
                }}
                exit={{ width: 0, height: 0 }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.43, 0.13, 0.23, 0.96]
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="absolute top-16 sm:top-20 right-3 sm:right-4 left-3 sm:left-4 text-right flex flex-col justify-center"
                  style={{ height: "calc(100% - 5rem)" }}
                >
                  <div className="flex flex-col gap-6 sm:gap-8">
                    <div
                      className="text-[#193A43] font-normal text-right"
                      style={{
                        fontFamily: "Questrial, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(18px, 5.2vw, 24px)",
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
                        fontSize: "clamp(18px, 5.2vw, 24px)",
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
                        fontSize: "clamp(18px, 5.2vw, 24px)",
                        lineHeight: "1.25",
                        letterSpacing: "0%",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: "Pixels arranged <br/> without purpose",
                      }}
                    />

                    {/* Button */}
                    <div className="flex justify-end mt-2 sm:mt-4">
                      <button
                        className="font-normal rounded-4xl"
                        style={{
                          width: "clamp(110px, 32vw, 127px)",
                          height: "clamp(40px, 11vw, 48px)",
                          fontFamily: "Questrial, sans-serif",
                          fontSize: "clamp(14px, 4.2vw, 18px)",
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
          <div className="absolute left-4 sm:left-6 right-4 sm:right-6 bottom-12 sm:bottom-6">
            <h1
              className="text-white font-normal mb-4 sm:mb-6"
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(28px, 8vw, 44px)",
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
                fontSize: "clamp(16px, 5.5vw, 28px)",
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
