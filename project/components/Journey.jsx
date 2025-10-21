"use client";
import Image from "next/image";
import JourneyMobile from "./mobile/JourneyMobile";

export default function Journey() {
  const journeySteps = [
    {
      id: 1,
      image: "/image/call.png",
      title: "Call",
      alt: "Initial Consultation Call - Step 1",
      description: "A 30 minute consultation<br/>call at end of which you'll<br/>have a vision and we'll have<br/>a plan."
    },
    {
      id: 2,
      image: "/image/create.png",
      title: "Create",
      alt: "Website Creation Process - Step 2",
      description: "We'll have your website<br/>ready, the way you envisioned<br/>and more.<br/><br/>Will deliver a complete<br/>website, ready for hosting<br/>in your preferred platform."
    },
    {
      id: 3,
      image: "/image/celebrate.png",
      title: "Celebrate",
      alt: "Launch Celebration and Support - Step 3",
      description: "We'll stay on-call while<br/>we celebrate your new<br/>mile-stones, and optimise<br/>even after the launch."
    }
  ];

  return (
    <>
      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block bg-white min-h-screen py-16 lg:py-20 xl:py-24 2xl:py-32 px-6 lg:px-4 xl:px-12 2xl:px-16">
      <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto mt-32 lg:mt-36 xl:mt-44 2xl:mt-52">
        {/* Main Header */}
        <h1
          className="text-center mb-8 lg:mb-10 xl:mb-12 2xl:mb-16 text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px] leading-[1.1]"
          style={{
            fontFamily: "Syne, sans-serif",
            color: "#000000A6"
          }}
        >
          Your Journey, Made Simple.
        </h1>

        {/* Sub Header */}
        <p
          className="text-center mb-16 lg:mb-20 xl:mb-24 2xl:mb-32 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[1.3]"
          style={{
            fontFamily: "Questrial, sans-serif",
            color: "#00000094"
          }}
        >
          From First Call to Website Launch: Fast, Human, Simple
        </p>

        {/* Cards Container */}
        <div className="flex justify-center items-start gap-4 lg:gap-6 xl:gap-8 2xl:gap-12">
          {journeySteps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-lg p-4 lg:p-5 xl:p-6 2xl:p-8 w-full max-w-[280px] lg:max-w-[320px] xl:max-w-[380px] 2xl:max-w-[520px] flex-1"
            >
              {/* Card Image */}
              <div className="mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 flex justify-center">
                <div 
                  className="rounded-4xl flex items-center justify-center w-full aspect-square"
                  style={{
                    backgroundColor: "#FAFAFA",
                    maxWidth: "100%"
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={443}
                    height={344}
                    className="object-contain w-full h-full p-4"
                  />
                </div>
              </div>

              {/* Card Header */}
              <h3
                className="mb-3 lg:mb-4 xl:mb-4 2xl:mb-6 text-left text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[48px] leading-[1.2]"
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: "#000000A6"
                }}
              >
                {step.title}
              </h3>

              {/* Card Description */}
              <p
                className="text-left text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[36px] leading-[1.4]"
                style={{
                  fontFamily: "Questrial, sans-serif",
                  color: "#00000094"
                }}
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Mobile Layout (below lg) */}
    <div className="lg:hidden">
      <JourneyMobile />
    </div>
  </>
  );
} 