"use client";
import { useRef, useEffect } from "react";
import { Menu } from "lucide-react";

export default function Home2Mobile() {
  const videoRef = useRef(null);

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
        style={{
          
          left: 'clamp(-150px, -23vw, -200px)',
          width: '120vw',
          height: '120vh',
          transform: 'scale(clamp(1.4, 2.0, 1.8))'
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        poster="/poster.jpg"
      >
        <source src="https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_6.mov" />
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
                fontFamily: 'Questrial, sans-serif',
                fontSize: '38px',
                fontWeight: 400,
                lineHeight: '28px'
              }}
              dangerouslySetInnerHTML={{ __html: 'too <br/> often' }}
            />
          </div>

          {/* Top right box with hamburger menu */}
          <div className="absolute top-0 right-0">
            <div 
              className="bg-[#D9D9D9C4] backdrop-blur-sm relative rounded-tr-2xl rounded-bl-2xl"
              style={{
                width: '229px',
                height: '430px'
              }}
                          >
                {/* Hamburger menu icon in top right corner of the box */}
                <div className="absolute top-4 right-4">
                  <Menu 
                    className="text-black"
                    style={{
                      width: '43px',
                      height: '28px'
                    }}
                  />
                </div>

                {/* Text content inside the box */}
                <div className="absolute top-20 right-4 left-4 text-right">
                  <div className="flex flex-col gap-4">
                    <div 
                      className="text-black font-normal text-right"
                      style={{ 
                        fontFamily: 'Questrial, sans-serif',
                        fontWeight: 400,
                        fontSize: '24px',
                        lineHeight: '28px',
                        letterSpacing: '0%'
                      }}
                      dangerouslySetInnerHTML={{ __html: 'Just treated <br/> as decoration' }}
                    />
                    <div 
                      className="text-black font-normal text-right"
                      style={{ 
                        fontFamily: 'Questrial, sans-serif',
                        fontWeight: 400,
                        fontSize: '24px',
                        lineHeight: '28px',
                        letterSpacing: '0%'
                      }}
                    >
                      Vibrant colours
                    </div>
                    <div 
                      className="text-black font-normal text-right"
                      style={{ 
                        fontFamily: 'Questrial, sans-serif',
                        fontWeight: 400,
                        fontSize: '24px',
                        lineHeight: '28px',
                        letterSpacing: '0%'
                      }}
                      dangerouslySetInnerHTML={{ __html: 'Pixels arranged <br/> without purpose' }}
                    />
                    
                    {/* Button */}
                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-white text-black font-normal rounded-4xl"
                        style={{
                          width: '127px',
                          height: '48px',
                          fontFamily: 'Questrial, sans-serif',
                          fontSize: '18px',
                          fontWeight: 400
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
          <div className="absolute bottom-16 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
            <h1
              className="text-white font-normal mb-6"
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "44px",
                lineHeight: "1.08"
              }}
            >
              <span className="opacity-60">But</span> beauty <span className="opacity-60">alone</span> <br /> doesn't last.
            </h1>
            <p
              className="text-white font-normal"
              style={{
                fontFamily: "Questrial, sans-serif",
                fontSize: "28px"
              }}
            >
              Design with empathy,<br /> 
              purpose, and responsibility <br /> 
              - so your website becomes <br /> 
              not just attractive, but alive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 