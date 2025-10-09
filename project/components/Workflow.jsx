"use client";
import Card from "./Card";
import WorkflowMobile from "./mobile/WorkflowMobile";

export default function Workflow() {
  return (
    <>
      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block bg-white py-16 lg:py-20 xl:py-24 2xl:py-32 px-4">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
          {/* Header */}
          <h1
            className="text-center mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 text-[28px] lg:text-[36px] xl:text-[44px] 2xl:text-[56px]"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "#000000",
              lineHeight: "1.2",
            }}
          >
            Before you think about it, This is how!
          </h1>

          {/* Sub Header */}
          <p
            className="text-center mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]"
            style={{
              fontFamily: "Questrial, sans-serif",
              color: "#666666",
              lineHeight: "1.5",
            }}
          >
            We communicate to design, develop and launch with Precision.
          </p>

          {/* Cards Container */}
          <div className="flex justify-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
          <Card
            image="/image/work/work1.png"
            imageMove={true}
            centerImage="/image/work/Perfectbutton.png"
            centerImageWidth={120}
            centerImageHeight={120}
            title="Tools"
            description="We've figured out a perfect working<br/>eco-system that is lead by human centric design<br/> and development that is led by AI<br/>making us one of the fastest to deliver a digital<br/> transformation that is just not vanilla. "
            
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
            subDescription="We prioritise communication<br/>at all the stages, for transparency,<br/>confidence and simply projecting the right <br/>brand emotion that reflects on your site!"
          />
          <Card
            image="/image/work/Mock-up2.png"
            imageMove={true}
            title="Output"
            description="Each phase ends with a solid output.<br/>1 . Design Phase →  Figma Prototype<br/>2. Development Phase →  Final Production Code<br/>3. Launch Phase →  Hosted Website<br/>+ 30 day live support."
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

