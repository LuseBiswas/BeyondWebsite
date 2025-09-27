"use client";

export default function PartnershipCarouselMobile() {
  const carouselData = [
    {
      title: "Discover",
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_9.mov",
      videoText: "We listen <br/> deeply.",
      marginBottom: "6rem"
    },
    {
      title: "Design",
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_8.mov",
      videoText: "We shape <br/> with empathy <br/> and strategy",
      marginBottom: "3rem"
    },
    {
      title: "Deliver",
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_7.mp4",
      videoText: "We launch <br/> with precision",
      marginBottom: "4rem"
    },
    {
      title: "Evolve",
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/10.mov",
      videoText: "Because your <br/> growth doesn't <br/> stop here.",
      marginBottom: "2rem"
    }
  ];

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      {/* Sub header */}
      <p
        className="text-center mb-6"
        style={{
          fontFamily: "Questrial, sans-serif",
          fontSize: "28px",
          color: "#000000",
          lineHeight: "1.4"
        }}
      >
        Our process is simple, human, <br /> 
        and built around you.
      </p>

      {/* Main header */}
      <h1
        className="text-center mb-12"
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "44px",
          color: "#000000",
          lineHeight: "1.1"
        }}
      >
        <span className="text-gray-500">This is not</span><br /> just a project. <br />
        It's a partnership.
      </h1>

      {/* Stacked video cards */}
      <div className="space-y-8">
        {carouselData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Title */}
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: "Questrial, sans-serif",
                fontSize: "24px",
                color: "#000000",
                fontWeight: "500"
              }}
            >
              {item.title}
            </h2>

            {/* Video card */}
            <div 
              className="relative overflow-hidden rounded-2xl"
              style={{ width: "341px", height: "467px" }}
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src={item.videoUrl} />
                Your browser does not support the video tag.
              </video>

              {/* Video overlay text */}
              <div className="absolute inset-0 flex items-end justify-center">
                <h3
                  className="text-white text-center"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: "44px",
                    lineHeight: "1.1",
                    textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    marginBottom: item.marginBottom || "4rem"
                  }}
                  dangerouslySetInnerHTML={{ __html: item.videoText }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 