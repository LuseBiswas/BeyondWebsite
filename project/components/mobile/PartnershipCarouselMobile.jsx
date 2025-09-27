"use client";

export default function PartnershipCarouselMobile() {
  const carouselData = [
    { title: "Discover", videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_9.mov", videoText: "We listen <br/> deeply.", textPos: "30%" },
    { title: "Design",   videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_8.mov", videoText: "We shape <br/> with empathy <br/> and strategy", textPos: "35%" },
    { title: "Deliver",  videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_7.mp4", videoText: "We launch <br/> with precision", textPos: "40%" },
    { title: "Evolve",   videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/10.mov",   videoText: "Because your <br/> growth doesn't <br/> stop here.", textPos: "35%" },
  ];

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      {/* Sub header */}
      <p
        className="text-center mb-4 sm:mb-6 leading-[1.35] text-[clamp(16px,5.2vw,28px)] lg:text-[38px]"
        style={{ fontFamily: "Questrial, sans-serif", color: "#000" }}
      >
        Our process is simple, human, <br />
        and built around you.
      </p>

      {/* Main header */}
      <h1
        className="text-center mb-8 sm:mb-12 leading-[1.1] text-[clamp(28px,9vw,44px)] lg:text-[96px]"
        style={{ fontFamily: "Syne, sans-serif", color: "#000" }}
      >
        <span className="text-gray-500">This is not</span>
        <br /> just a project. <br />
        It&apos;s a partnership.
      </h1>

      {/* Stacked video cards */}
      <div className="mx-auto w-full max-w-[30rem] space-y-6 sm:space-y-8">
        {carouselData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Title */}
            <h2
              className="text-center mb-3 sm:mb-4 font-medium text-[clamp(18px,5.6vw,24px)]"
              style={{ fontFamily: "Questrial, sans-serif", color: "#000" }}
            >
              {item.title}
            </h2>

            {/* Video card */}
            <div
              className="relative overflow-hidden rounded-2xl w-full"
              style={{ aspectRatio: "341 / 467", backgroundColor: "#f3f4f6" }}
            >
              <video
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: `50% ${item.textPos || "35%"}` }}
                autoPlay loop muted playsInline preload="metadata" crossOrigin="anonymous"
              >
                <source src={item.videoUrl} />
                Your browser does not support the video tag.
              </video>

              {/* Readability gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 45%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.65) 100%)" }}
              />

              {/* Overlay text */}
              <div className="absolute inset-0 flex items-end justify-center pb-10 sm:pb-14">
                <h3
                  className="text-white text-center text-[clamp(24px,8vw,44px)]"
                  style={{ fontFamily: "Syne, sans-serif", lineHeight: "1.1", textShadow: "0 4px 8px rgba(0, 0, 0, 0.35)" }}
                  dangerouslySetInnerHTML={{ __html: item.videoText }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-6 sm:h-8" />
    </div>
  );
}
