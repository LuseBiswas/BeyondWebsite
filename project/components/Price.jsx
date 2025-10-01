"use client";
import { useRef, useEffect } from "react";
import PriceBox from "./PriceBox";
import PriceMobile from "./mobile/PriceMobile";

export default function Price() {
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
    <div id="pricing-section" className="relative min-h-screen overflow-hidden bg-gray-800">
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

      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block relative z-10 py-12 lg:py-16 xl:py-20 2xl:py-24 px-4 lg:px-6 xl:px-8 2xl:px-12">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
          {/* Main Header */}
          <h1
            className="text-center mb-9  text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px] leading-[1.1]"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "#FFFFFF"
            }}
          >
            Plans made clear. <br /> Designs made unforgettable.
          </h1>

          {/* Sub Header */}
          <p
            className="text-center mb-16 lg:mb-20 xl:mb-24 2xl:mb-32 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[1.3]"
            style={{
              fontFamily: "Questrial, sans-serif",
              color: "#FFFFFF"
            }}
          >
            No hidden costs. No compromises. <br /> Just thoughtful design at a price that respects your growth.
          </p>

          {/* Pricing Cards */}
          <div className="flex justify-center items-start gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 px-4 lg:px-8 xl:px-12 2xl:px-16">
            <PriceBox 
              title="PURELY WEBSITE"
              tag="Quick"
              price="4800"
              description="For startups,<br/> small businesses."
              cta="Get started"
              link="#"
              bulletPoints={[
                "Starter Landing Page<br/>[1-5 Pages]",
                "A high-performing website.",
                "Modern, responsive design.",
                "Essential integrations<br/> with contact forms, analytics,<br/>SEO basics.",
                "Fast turnaround,<br/>future-ready build.",
              ]}
            />
            <PriceBox 
              title="WEBSITE+"
              tag="Popular"
              price="6500"
              description="For growing businesses that<br/>need their website to work as<br/>hard as they do."
              cta="Get started"
              link="#"
              bulletPoints={[
                "6–15 pages,<br/>with Content Management<br/>System & Payment setup",
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
              price="8000+"
              description="For ambitious brands,<br/>non-profits, and enterprises<br/>who want to lead change."
              cta="Get Started"
              link="#"
              bulletPoints={[
                "Custom Website for a tailored digital product or SaaS platform<br/>with core features. Highly<br/>customizable, scalable.",
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

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        <PriceMobile />
      </div>
    </div>
  );
} 