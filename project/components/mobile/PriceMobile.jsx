"use client";
import { useRef, useEffect } from "react";
import PriceBox from "../PriceBox";

export default function PriceMobile() {
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

  const openCalendly = () => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/riteshbiswasut'
      });
    } else {
      console.error('Calendly is not loaded yet');
      alert('Please wait a moment and try again');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800">
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        poster="/poster.jpg"
      >
        <source src="https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_15.mov" />
        Your browser does not support the video tag.
      </video>

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
          <div className="space-y-8 flex flex-col items-center">
            <PriceBox 
              title="PURELY WEBSITE"
              tag="Quick"
              price="4000"
              description="Best suited for startups,<br/> small businesses."
              cta="Get started"
              onCtaClick={openCalendly}
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