"use client";
import Image from "next/image";

export default function WorkflowMobile() {
  const cards = [
    {
      image: "/image/work/work1.png",
      title: "Tools",
      description: "We've figured out a perfect working eco-system that is lead by human centric design and development that is led by AI making us one of the fastest to deliver a digital transformation that is just not vanilla.",
    },
    {
      image: "/image/work/work2.png",
      title: "Workflow",
      description: "Design → Develop → Launch!",
      subDescription: "We prioritise communication at all the stages, for transparency, confidence and simply projecting the right brand emotion that reflects on your site!",
    },
    {
      image: "/image/work/work3.png",
      title: "Output",
      description: "Each phase ends with a solid output. 1. Design Phase → Figma Prototype 2. Development Phase → Final Production Code 3. Launch Phase → Hosted Website + 30 day live support.",
    },
  ];

  return (
    <div className="bg-white py-12 sm:py-16 px-4">
      {/* Header */}
      <h1
        className="text-center mb-3 sm:mb-4"
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(24px, 6vw, 36px)",
          color: "#000000",
          lineHeight: "1.2",
        }}
      >
        Before you think about it, This is how!
      </h1>

      {/* Sub Header */}
      <p
        className="text-center mb-8 sm:mb-12"
        style={{
          fontFamily: "Questrial, sans-serif",
          fontSize: "clamp(14px, 3.5vw, 16px)",
          color: "#666666",
          lineHeight: "1.5",
        }}
      >
        We communicate to design, develop and launch with Precision.
      </p>

      {/* Cards */}
      <div className="flex flex-col gap-8 sm:gap-12 items-center">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col items-center w-full max-w-md">
            {/* Card Box */}
            <div
              className="rounded-2xl overflow-hidden mb-4"
              style={{
                width: "clamp(280px, 85vw, 400px)",
                height: "clamp(200px, 60vw, 300px)",
                backgroundColor: "#F2F2F2",
              }}
            >
              <Image
                src={card.image}
                alt={card.title}
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Title */}
            <h3
              className="text-center mb-2"
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(18px, 4.5vw, 22px)",
                fontWeight: 600,
                color: "#000000",
                lineHeight: "1.2",
              }}
            >
              {card.title}
            </h3>

            {/* Description */}
            <p
              className="text-center"
              style={{
                fontFamily: "Questrial, sans-serif",
                fontSize: "clamp(14px, 3.5vw, 16px)",
                color: "#000000",
                lineHeight: "1.5",
              }}
            >
              {card.description}
            </p>

            {/* Sub Description */}
            {card.subDescription && (
              <p
                className="text-center mt-2"
                style={{
                  fontFamily: "Questrial, sans-serif",
                  fontSize: "clamp(12px, 3vw, 14px)",
                  color: "#000000",
                  lineHeight: "1.5",
                }}
              >
                {card.subDescription}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

