"use client";
import Card from "./Card";
import WorkflowMobile from "./mobile/WorkflowMobile";

export default function Workflow() {
  return (
    <>
      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block bg-white pb-16 lg:pb-20 xl:pb-24 2xl:pb-32 px-4">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
          {/* Header */}
          <h1
            className="text-center mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px]"
            style={{
              
              fontFamily: "Syne, sans-serif",
              color: "#000000",
              lineHeight: "1.2",
            }}
          >
            No need to ask, <br /> here’s how!
          </h1>

          {/* Sub Header */}
          <p
            className="text-center mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px]"
            style={{
              fontFamily: "Questrial, sans-serif",
              color: "#666666",
              lineHeight: "1.5",
            }}
          >
            Design + hosted website just under 2 weeks. 
          </p>

          {/* Cards Container */}
          <div className="flex justify-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
          <Card
            image="/image/work/work1.png"
            imageMove={true}
            imageWidth={500}
            imageHeight={384}
            centerImage="/image/work/Perfectbutton.png"
            centerImageWidth={200}
            centerImageHeight={200}
            title="Tools"
            description="We’ve got a perfect<br/> working eco-system lead by<br/>human centric design<br/>and development led by AI."
            subDescription="In other words, fast!"
            
          />
          <Card
            image="/image/work/Wireframes.png"
            imageWidth={311}
            imageHeight={238}
            customImage="/image/work/123.png"
            customImageWidth={278}
            customImageHeight={128}
            customImageTop={"30%"}
            customImageMove={true}
            title="Workflow"
            description="Design → Develop → Launch!"
            subDescription="We prioritise communication<br/>for transparency, confidence<br/>and simply projecting<br/>the right brand emotion!"
          />
          <Card
            image="/image/work/Mock-up2.png"
            imageMove={true}
            title="Output"
            description="Each phase ends with a solid output."
            subDescription="Design Phase<br/>→ Figma prototype<br/>with best practices<br/><br/>
            Development Phase<br/>→  Launch-ready code<br/><br/>Launch Phase<br/>→ website code(in node.js)<br/>hosted on vercel."
            overflowImage={true}
            imageScale={1.5}
            imageOffsetX={30}
          />
        </div>
      </div>
    </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        <WorkflowMobile />
      </div>
    </>
  );
}

