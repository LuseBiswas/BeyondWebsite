"use client";
import { useRef, useEffect } from "react";
import PriceBox from "../PriceBox";
import { getOptimizedVideoUrl } from "../../lib/cloudinary";

export default function PriceMobile() {
  const videoRef = useRef(null);

  // Generate optimized video URL
  const optimizedVideoUrl = getOptimizedVideoUrl(
    "https://res.cloudinary.com/drbcb1ziy/video/upload/v1760031462/shutterstock_3642258413_jjy2hh.mov",
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

  const openCalendly = () => {
    window.open('https://calendly.com/hello-designresponsible/new-meeting', '_blank');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
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

      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black/70 z-[5]"></div>

      {/* Mobile Content */}
      <div className="relative z-10 py-12 px-4">
        <div className="w-full">
          {/* Headers Container */}
          <div className="max-w-sm mx-auto mb-12">
            {/* Main Header */}
            <h1
              className="text-center mb-6 text-[42px] leading-[1.1]"
              style={{
                fontFamily: "Syne, sans-serif",
                color: "#FFFFFF"
              }}
            >
              Plans made clear. <br /> Designs <br />made unforgettable.
            </h1>

            {/* Sub Header */}
            <p
              className="text-center text-[24px] leading-[1.3]"
              style={{
                fontFamily: "Questrial, sans-serif",
                color: "#FFFFFF"
              }}
            >
              No hidden costs. No compromises. <br /> Just thoughtful design at a <br/> price that respects your growth.
            </p>
          </div>

          {/* Stacked Pricing Cards */}
          <div className="space-y-8 flex flex-col items-center [&_.group:hover_.opacity-0]:!opacity-100 [&_.opacity-0]:!opacity-100">
            <PriceBox 
              title="PURELY WEBSITE"
              tag="Quick"
              price="4000"
              description="Best suited for startups,<br/> small businesses."
              cta="Get started"
              onCtaClick={openCalendly}
              backgroundImage="/image/price/img_1.png"
              bulletPoints={[
                "A high-performing website.",
                "Modern, responsive design.",
                "Essential integrations<br/> with contact forms, analytics,<br/>SEO basics.",
                "Fast turnaround,<br/>future-ready build.",
              ]}
            />
            <PriceBox 
              title="WEBSITE+"
              tag="Popular"
              price="5000"
              description="Best suited for growing<br/>businesses that need their<br/>website to work as hard<br/>as they do."
              cta="Get started"
              onCtaClick={openCalendly}
              backgroundImage="/image/price/img_2.png"
              bulletPoints={[
                "Everything in Purely Website",
                "Deeper brand alignment<br/>& storytelling-driven design",
                "Advanced integrations<br/>(CRM, e-commerce,<br/>automation)",
                "Performance optimisation<br/>for speed, SEO, & conversions",
                "Ongoing support & light<br/>content management",
              ]}
            />
            <PriceBox 
              title="BEYOND SITE"
              tag="Comprehensive +"
              price="7000"
              description="Best suited for ambitious<br/>brands, non-profits, and<br/>enterprises who want to<br/>lead change."
              cta="Get Started"
              onCtaClick={openCalendly}
              backgroundImage="/image/price/img_3.png"
              bulletPoints={[
                "Everything in Website +",
                "Continuous strategy & evolution",
                "Conversion-focused<br/>campaigns, landing pages,<br/>and A/B testing",
                "Content strategy<br/>& storytelling guidance",
                "Dedicated design support<br/>(retainer-style)",
                "Priority access to the DR team",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 