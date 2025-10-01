"use client";
import { CircleCheckBig } from "lucide-react";

export default function PriceBox({
  title,
  tag,
  price,
  description,
  cta,
  link,
  bulletPoints,
}) {
  return (
    <div className="flex flex-col gap-8 cursor-pointer relative group">
      {/* Card: scales and keeps the blur */}
      <div
        className="
          relative w-[320px] lg:w-[360px] xl:w-[420px] 2xl:w-[480px]
          rounded-[40px] lg:rounded-[45px] xl:rounded-[50px] 2xl:rounded-[60px]
          p-6 lg:p-7 xl:p-8 2xl:p-10
          backdrop-blur-sm backdrop-saturate-150
          bg-white/6 transition-transform duration-300
          transform-gpu will-change-transform
          group-hover:scale-[1.03] hover:drop-shadow-2xl
        "
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      >
        {/* Gradient border (unchanged) */}
        <div
          className="absolute pointer-events-none rounded-[45px] lg:rounded-[50px] xl:rounded-[55px] 2xl:rounded-[65px]"
          style={{
            inset: "-3px",
            padding: "3px",
            background: `
              linear-gradient(108.74deg,
                rgba(105,120,255,0.8) 0%,
                rgba(255,255,255,0.8) 36.46%,
                rgba(255,255,255,0.6) 73.96%,
                rgba(13,220,170,0.8) 100%
              )
            `,
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            zIndex: 0,
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6 lg:mb-7 xl:mb-8 2xl:mb-10">
            <h3
              className="text-white text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[28px] font-normal uppercase tracking-wide"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {title}
            </h3>
            {tag && (
              <span
                className="bg-white/20 text-white px-1 rounded-full text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-normal flex items-center justify-center h-[24px] lg:h-[26px] xl:h-[28px] 2xl:h-[32px]"
                style={{ fontFamily: "Questrial, sans-serif" }}
              >
                {tag}
              </span>
            )}
          </div>

          <div
            className="text-white text-[60px] lg:text-[68px] xl:text-[76px] 2xl:text-[88px] font-normal mb-6 lg:mb-7 xl:mb-8 2xl:mb-10 leading-none flex items-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ${price}
          </div>

          <p
            className="text-white/80 text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[28px] font-normal mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 leading-relaxed"
            style={{ fontFamily: "Syne, sans-serif" }}
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* CTA ABOVE bullet points */}
          <div className="relative inline-block mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 group/button">
            <div
              className="absolute rounded-3xl lg:rounded-4xl pointer-events-none opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"
              style={{
                inset: "-2px",
                padding: "2px",
                background: `
                  linear-gradient(108.74deg,
                    rgba(105,120,255,0.8) 0%,
                    rgba(255,255,255,0.8) 36.46%,
                    rgba(255,255,255,0.6) 73.96%,
                    rgba(13,220,170,0.8) 100%
                  )
                `,
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <button
              className="relative text-white px-4 lg:px-5 xl:px-6 2xl:px-8 rounded-3xl lg:rounded-4xl text-[24px] lg:text-[27px] xl:text-[30px] 2xl:text-[36px] font-normal transition-opacity duration-300 h-[50px] lg:h-[55px] xl:h-[61px] 2xl:h-[70px] flex items-center justify-center cursor-pointer bg-black/90 border-2 border-white hover:opacity-85"
              style={{ fontFamily: "Questrial, sans-serif" }}
              onClick={() => link && window.open(link, "_blank")}
            >
              {cta}
            </button>
          </div>

          {/* Bullet Points BELOW CTA + divider after the first bullet */}
          {bulletPoints?.length > 0 && (
            <div className="space-y-3 lg:space-y-4 2xl:space-y-5">
              {bulletPoints.map((point, index) => (
                <div key={index}>
                  {/* bullet row */}
                  <div className="flex items-center gap-3 lg:gap-4 2xl:gap-5">
                    <CircleCheckBig className="flex-shrink-0 w-[24px] lg:w-[28px] xl:w-[31px] 2xl:w-[36px] h-[24px] lg:h-[28px] xl:h-[31px] 2xl:h-[36px] text-white" />
                    <span
                      className="text-white/90 text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] font-normal"
                      style={{ fontFamily: "Questrial, sans-serif" }}
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  </div>

                  {/* pure white 3px divider after first bullet */}
                  {index === 0 && (
                    <div
                      role="separator"
                      className="
                        mx-2 lg:mx-3 xl:mx-4 2xl:mx-5
                        my-3 lg:my-4 2xl:my-5
                        h-[3px] bg-white rounded-full
                      "
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
