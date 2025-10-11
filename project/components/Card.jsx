"use client";
import Image from "next/image";

export default function Card({ 
  image, 
  imageWidth = 368,
  imageHeight = 264,
  title, 
  description, 
  subDescription, 
  overflowImage = false, 
  imageScale = 1.2, 
  imageOffsetX = 0,
  centerImage = null,
  centerImageWidth = 300,
  centerImageHeight = 300,
  centerImageMove = false,
  imageMove = false,
  customImage = null,
  customImageTop = "50%",
  customImageLeft = "50%",
  customImageWidth = 200,
  customImageHeight = 200,
  customImageMove = false
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Card Box */}
      <div
        className={`rounded-2xl mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 relative ${overflowImage ? 'overflow-visible' : 'overflow-hidden'}`}
        style={{
          width: "clamp(340px, 28vw, 560px)",
          height: "clamp(260px, 20vw, 420px)",
          backgroundColor: "#F2F2F2",
        }}
      >
        {/* Regular Image */}
        {image && (
          <div className={`${overflowImage ? 'relative flex items-end justify-center' : 'flex items-center justify-center'} ${imageMove ? "animate-bounce-subtle" : ""}`} style={{ width: "100%", height: "100%" }}>
            <div style={{ 
              width: overflowImage ? `${imageWidth * imageScale}px` : `${imageWidth}px`,
              height: overflowImage ? `${imageHeight * imageScale}px` : `${imageHeight}px`,
              maxWidth: '100%',
              maxHeight: '100%',
              position: 'relative'
            }}>
              <Image
                src={image}
                alt={title || "Card image"}
                fill
                className="object-contain"
                style={overflowImage ? { 
                  transform: `scale(${imageScale}) translateX(${imageOffsetX}px)`, 
                  transformOrigin: 'bottom'
                } : {}}
              />
            </div>
          </div>
        )}

        {/* Center Image - Overlays on top */}
        {centerImage && (
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${centerImageMove ? "animate-bounce-subtle" : ""}`}>
            <Image
              src={centerImage}
              alt={title || "Center image"}
              width={centerImageWidth}
              height={centerImageHeight}
              className="object-contain"
            />
          </div>
        )}

        {/* Custom Image with custom positioning */}
        {customImage && (
          <div
            className={`absolute ${customImageMove ? "animate-bounce-subtle-custom" : ""}`}
            style={{
              top: customImageTop,
              left: customImageLeft,
              transform: "translate(-50%, -50%)",
              width: `${customImageWidth}px`,
              height: `${customImageHeight}px`,
              position: 'absolute'
            }}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image
                src={customImage}
                alt="Custom image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <h3
        className="text-center mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 text-[26px] lg:text-[30px] xl:text-[34px] 2xl:text-[38px]"
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
        className="text-center text-[20px] lg:text-[23px] xl:text-[26px] 2xl:text-[28px]"
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
          className="mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 text-center text-[20px] lg:text-[23px] xl:text-[26px] 2xl:text-[28px]"
          style={{
            fontFamily: "Questrial, sans-serif",
            color: "#000000",
            lineHeight: "1.5",
          }}
          dangerouslySetInnerHTML={{ __html: subDescription }}
        />
      )}
      
      {/* Custom CSS for subtle bounce animation */}
      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes bounce-subtle-custom {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
        }
        
        :global(.animate-bounce-subtle) {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        
        :global(.animate-bounce-subtle-custom) {
          animation: bounce-subtle-custom 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

