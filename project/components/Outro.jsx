"use client";
import { ArrowUpRight } from "lucide-react";
import OutroMobile from "./mobile/OutroMobile";

export default function Outro() {
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
    // You can replace this with actual booking functionality
    window.open("#", "_blank");
  };

  return (
    <>
      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block bg-black">
        <div className="py-12 lg:py-16 xl:py-20 2xl:py-24 px-4 lg:px-6 xl:px-8 2xl:px-12">
          <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
            {/* Main Header */}
            <h1
              className="text-center mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px] leading-[1.1]"
              style={{ fontFamily: "Syne, sans-serif", color: "#FFFFFF" }}
            >
              <span className="text-[#FFFFFFA6]"> Let’s go beyond websites, </span><br />let’s transform.
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
              {/* CTA 1 - See Our Pricing */}
              <button
                className="text-white border-2 border-white bg-black px-6 lg:px-8 xl:px-10 2xl:px-12 rounded-3xl lg:rounded-4xl text-[24px] lg:text-[27px] xl:text-[30px] 2xl:text-[36px] font-normal transition-all duration-300 h-[50px] lg:h-[55px] xl:h-[61px] 2xl:h-[70px] flex items-center justify-center hover:bg-white hover:text-black cursor-pointer"
                style={{ fontFamily: "Questrial, sans-serif" }}
                onClick={scrollToPricing}
              >
                See our pricing
              </button>

              {/* CTA 2 - Book a Call */}
              <button
                className="text-black bg-white px-6 lg:px-8 xl:px-10 2xl:px-12 rounded-3xl lg:rounded-4xl text-[24px] lg:text-[27px] xl:text-[30px] 2xl:text-[36px] font-normal transition-all duration-300 h-[50px] lg:h-[55px] xl:h-[61px] 2xl:h-[70px] flex items-center justify-center hover:bg-gray-100 cursor-pointer gap-1 lg:gap-2"
                style={{ fontFamily: "Questrial, sans-serif" }}
                onClick={handleBookCall}
              >
                Book a Call
                <ArrowUpRight className="w-[20px] lg:w-[24px] xl:w-[28px] 2xl:w-[32px] h-[20px] lg:h-[24px] xl:h-[28px] 2xl:h-[32px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        <OutroMobile />
      </div>
    </>
  );
} 