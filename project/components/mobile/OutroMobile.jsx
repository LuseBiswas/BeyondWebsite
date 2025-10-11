"use client";
import { ArrowUpRight } from "lucide-react";

export default function OutroMobile() {
  const scrollToPricing = () => {
    // Scroll to the pricing section (where PriceBox components are used)
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleBookCall = () => {
    window.open("https://calendly.com/hello-designresponsible/new-meeting?background_color=000000&text_color=ffffff&primary_color=e8fc53&month=2025-10", "_blank");
  };

  return (
    <div className="bg-black py-10 px-4">
      <div className="max-w-md mx-auto">
        {/* Main Header */}
        <h1
          className="text-center mb-12 text-[44px] leading-[1.1]"
          style={{ fontFamily: "Syne, sans-serif", color: "#FFFFFF" }}
        >
          <span className="text-[#FFFFFFA6]"> Let's go <br /> beyond websites, </span><br />let's transform.
        </h1>

        {/* CTA Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
          {/* CTA 1 - See Our Pricing */}
          <button
            className="flex-1 text-white border-2 border-white bg-black px-3 sm:px-4 rounded-3xl font-normal transition-all duration-300 h-[50px] flex items-center justify-center hover:bg-white hover:text-black cursor-pointer whitespace-nowrap"
            style={{ 
              fontFamily: "Questrial, sans-serif",
              fontSize: "clamp(15px, 4.2vw, 20px)"
            }}
            onClick={scrollToPricing}
          >
            See our pricing
          </button>

          {/* CTA 2 - Book a Call */}
          <button
            className="flex-1 text-black bg-white px-3 sm:px-4 rounded-3xl font-normal transition-all duration-300 h-[50px] flex items-center justify-center hover:bg-gray-100 cursor-pointer gap-1 whitespace-nowrap"
            style={{ 
              fontFamily: "Questrial, sans-serif",
              fontSize: "clamp(15px, 4.2vw, 20px)"
            }}
            onClick={handleBookCall}
          >
            Book a Call
            <ArrowUpRight style={{ width: "clamp(16px, 4vw, 20px)", height: "clamp(16px, 4vw, 20px)" }} />
          </button>
        </div>
      </div>
    </div>
  );
} 