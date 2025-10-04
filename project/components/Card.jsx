"use client";
import Image from "next/image";

export default function Card({ image, title, description, subDescription, overflowImage = false, imageScale = 1.2, imageOffsetX = 0 }) {
  return (
    <div className="flex flex-col items-center">
      {/* Card Box */}
      <div
        className={`rounded-2xl mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 ${overflowImage ? 'overflow-visible' : 'overflow-hidden'}`}
        style={{
          width: "clamp(300px, 24vw, 480px)",
          height: "clamp(220px, 17vw, 360px)",
          backgroundColor: "#F2F2F2",
        }}
      >
        {image && (
          <div className={`${overflowImage ? 'relative flex items-end justify-center' : ''}`} style={{ width: "100%", height: "100%" }}>
            <Image
              src={image}
              alt={title || "Card image"}
              width={overflowImage ? 368 * imageScale : 368}
              height={overflowImage ? 264 * imageScale : 264}
              className={overflowImage ? "object-contain" : "object-cover w-full h-full"}
              style={overflowImage ? { 
                transform: `scale(${imageScale}) translateX(${imageOffsetX}px)`, 
                transformOrigin: 'bottom' 
              } : {}}
            />
          </div>
        )}
      </div>

      {/* Header */}
      <h3
        className="text-center mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]"
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 600,
          color: "#000000",
          lineHeight: "1.2",
        }}
      >
        {title}
      </h3>

      {/* Sub Header */}
      <p
        className="text-center text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]"
        style={{
          fontFamily: "Questrial, sans-serif",
          color: "#000000",
          lineHeight: "1.5",
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Additional Description (Optional) */}
      {subDescription && (
        <p
          className="text-center mt-2 lg:mt-3 xl:mt-4 2xl:mt-5 text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]"
          style={{
            fontFamily: "Questrial, sans-serif",
            color: "#000000",
            lineHeight: "1.5",
          }}
          dangerouslySetInnerHTML={{ __html: subDescription }}
        />
      )}
    </div>
  );
}

