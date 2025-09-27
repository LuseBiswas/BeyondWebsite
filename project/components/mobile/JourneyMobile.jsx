"use client";
import Image from "next/image";

export default function JourneyMobile() {
  const journeySteps = [
    {
      id: 1,
      image: "/image/call.png",
      title: "Call",
      description:
        "A 30 minute consultation<br/>call at end of which you'll<br/>have a vision and we'll have<br/>a plan.",
    },
    {
      id: 2,
      image: "/image/create.png",
      title: "Create",
      description:
        "We'll have your website<br/>ready, the way you envisioned<br/>and more.<br/><br/>Will deliver a complete<br/>website, ready for hosting<br/>in your preferred platform.",
    },
    {
      id: 3,
      image: "/image/celebrate.png",
      title: "Celebrate",
      description:
        "We'll stay on-call while<br/>we celebrate your new<br/>mile-stones, and optimise<br/>even after the launch.",
    },
  ];

  return (
    <div className="bg-white py-8 px-4 md:py-10">
      <div className="mx-auto w-full max-w-[30rem] md:max-w-[60rem]">
        {/* Main Header */}
        <h1
          className="text-center mb-4 md:mb-6 leading-[1.1]"
          style={{
            fontFamily: "Syne, sans-serif",
            color: "#000000A6",
            fontSize: "clamp(28px, 9.5vw, 44px)",
          }}
        >
          Your Journey, <br /> Made Simple.
        </h1>

        {/* Sub Header */}
        <p
          className="text-center mb-8 md:mb-10 leading-[1.3]"
          style={{
            fontFamily: "Questrial, sans-serif",
            color: "#00000094",
            fontSize: "clamp(18px, 6vw, 28px)",
          }}
        >
          From First Call <br /> to Website Launch: <br /> Fast, Human, Simple
        </p>

        {/* Cards: 1-col on phones, 2-col on tablets to reduce page height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {journeySteps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.04)]"
            >
              {/* Image block */}
              <div className="mb-5 sm:mb-6">
                <div
                  className="relative rounded-2xl"
                  style={{
                    backgroundColor: "#FAFAFA",
                    // keep a pleasant portrait-ish ratio while flexible
                    aspectRatio: "392 / 305",
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain p-4 sm:p-5"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={step.id === 1}
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className="mb-2 leading-[1.2]"
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: "#000000A6",
                  fontSize: "clamp(22px, 6.4vw, 32px)",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="leading-[1.45]"
                style={{
                  fontFamily: "Questrial, sans-serif",
                  color: "#00000094",
                  fontSize: "clamp(16px, 4.8vw, 20px)",
                }}
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </div>
          ))}
        </div>

        {/* Tiny spacer, smaller on md to keep page tight */}
        <div className="h-6 md:h-4" />
      </div>
    </div>
  );
}
