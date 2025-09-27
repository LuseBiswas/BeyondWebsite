"use client";
import Image from "next/image";

export default function JourneyMobile() {
  const journeySteps = [
    {
      id: 1,
      image: "/image/call.png",
      title: "Call",
      description: "A 30 minute consultation<br/>call at end of which you'll<br/>have a vision and we'll have<br/>a plan."
    },
    {
      id: 2,
      image: "/image/create.png",
      title: "Create",
      description: "We'll have your website<br/>ready, the way you envisioned<br/>and more.<br/><br/>Will deliver a complete<br/>website, ready for hosting<br/>in your preferred platform."
    },
    {
      id: 3,
      image: "/image/celebrate.png",
      title: "Celebrate",
      description: "We'll stay on-call while<br/>we celebrate your new<br/>mile-stones, and optimise<br/>even after the launch."
    }
  ];

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-sm mx-auto">
        {/* Main Header */}
        <h1
          className="text-center mb-6 text-[44px] leading-[1.1]"
          style={{
            fontFamily: "Syne, sans-serif",
            color: "#000000A6"
          }}
        >
          Your Journey, <br /> Made Simple.
        </h1>

        {/* Sub Header */}
        <p
          className="text-center mb-12 text-[28px] leading-[1.3]"
          style={{
            fontFamily: "Questrial, sans-serif",
            color: "#00000094"
          }}
        >
          From First Call <br /> to Website Launch: <br /> Fast, Human, Simple
        </p>

        {/* Stacked Cards */}
        <div className="space-y-8">
          {journeySteps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-lg p-6"
            >
              {/* Card Image */}
              <div className="mb-6 flex justify-center">
                <div 
                  className="rounded-4xl flex items-center justify-center w-[392px] h-[305px]"
                  style={{
                    backgroundColor: "#FAFAFA"
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={443}
                    height={344}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              </div>

              {/* Card Header */}
              <h3
                className="mb-4 text-left text-[32px] leading-[1.2] pl-6"
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: "#000000A6"
                }}
              >
                {step.title}
              </h3>

              {/* Card Description */}
              <p
                className="text-left text-[20px] leading-[1.4] pl-6"
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
  );
} 