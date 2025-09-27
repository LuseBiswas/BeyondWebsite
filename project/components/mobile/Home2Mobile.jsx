"use client";
import { useRef, useEffect } from "react";
import { Menu } from "lucide-react";

export default function Home2Mobile() {
  const videoRef = useRef(null);

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
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
            <div
              className="text-white font-normal text-right"
              style={{
                fontFamily: "Questrial, sans-serif",
                fontWeight: 400,
                // fluid, readable on tiny screens
                fontSize: "clamp(22px, 7vw, 38px)",
                lineHeight: "1.1",
              }}
              dangerouslySetInnerHTML={{ __html: "too <br/> often" }}
            />
          </div>

          {/* Top right floating box with hamburger menu */}
          <div className="absolute top-0 right-0">
            <div
              className="bg-[#D9D9D9C4] backdrop-blur-sm relative rounded-tr-2xl rounded-bl-2xl"
              style={{
                // fluid size; avoids overflow on very small phones
                width: "clamp(180px, 42vw, 229px)",
                height: "clamp(320px, 56vh, 430px)",
              }}
            >
              {/* Hamburger menu icon in top right corner of the box */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <Menu
                  className="text-black"
                  style={{
                    width: "clamp(28px, 7vw, 43px)",
                    height: "clamp(20px, 5vw, 28px)",
                  }}
                />
              </div>

              {/* Text content inside the box */}
              <div className="absolute top-16 sm:top-20 right-3 sm:right-4 left-3 sm:left-4 text-right">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div
                    className="text-black font-normal text-right"
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
                    className="text-black font-normal text-right"
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
                    className="text-black font-normal text-right"
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
                      className="bg-white text-black font-normal rounded-4xl"
                      style={{
                        width: "clamp(110px, 32vw, 127px)",
                        height: "clamp(40px, 11vw, 48px)",
                        fontFamily: "Questrial, sans-serif",
                        fontSize: "clamp(14px, 4.2vw, 18px)",
                        fontWeight: 400,
                      }}
                    >
                      But, Why?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
