"use client";
import Card from "../Card";

export default function WorkflowMobile() {

  return (
    <div className="bg-white pb-8 sm:py-16 px-4">
      {/* Header */}
      <h1
        className="text-center mb-3 sm:mb-4"
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(28px, 9.5vw, 44px)",
          color: "#000000",
          lineHeight: "1.08",
        }}
      >
        No need to ask,<br /> here's how!
      </h1>

      {/* Sub Header */}
      <p
        className="text-center mb-8 sm:mb-12"
        style={{
          fontFamily: "Questrial, sans-serif",
          fontSize: "clamp(18px, 6vw, 28px)",
          color: "#666666",
          lineHeight: "clamp(24px, 8vw, 36px)",
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
          centerImageWidth={130}
          centerImageHeight={130}
          title="Tools"
          description="We've got a perfect working eco-system lead by human centric design and development led by AI."
          subDescription="In other words, fast!"
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
          subDescription="We prioritise communication for transparency, confidence and simply projecting the right brand emotion!"
        />
        
        <Card
          image="/image/work/Mock-up2.png"
          imageMove={true}
          title="Output"
          description="Each phase ends with a solid output."
         subDescription="Design Phase<br/>→ Figma prototype<br/><br/>
            Development Phase<br/>→  Launch-ready code<br/><br/>Launch Phase<br/>→ Hosted website"
          overflowImage={true}
          imageScale={1.3}
          imageOffsetX={20}
        />
      </div>
    </div>
  );
}

