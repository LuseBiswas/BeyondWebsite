"use client";
import Card from "../Card";

export default function WorkflowMobile() {

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
        <Card
          image="/image/work/work1.png"
          imageMove={true}
          centerImage="/image/work/Perfectbutton.png"
          centerImageWidth={80}
          centerImageHeight={80}
          title="Tools"
          description="We've figured out a perfect working eco-system that is lead by human centric design and development that is led by AI making us one of the fastest to deliver a digital transformation that is just not vanilla."
        />
        
        <Card
          image="/image/work/Wireframes.png"
          imageWidth={250}
          imageHeight={190}
          customImage="/image/work/123.png"
          customImageWidth={220}
          customImageHeight={100}
          customImageTop="30%"
          customImageMove={true}
          title="Workflow"
          description="Design → Develop → Launch!"
          subDescription="We prioritise communication at all the stages, for transparency, confidence and simply projecting the right brand emotion that reflects on your site!"
        />
        
        <Card
          image="/image/work/Mock-up2.png"
          imageMove={true}
          title="Output"
          description="Each phase ends with a solid output. 1. Design Phase → Figma Prototype 2. Development Phase → Final Production Code 3. Launch Phase → Hosted Website + 30 day live support."
          overflowImage={true}
          imageScale={1.3}
          imageOffsetX={20}
        />
      </div>
    </div>
  );
}

