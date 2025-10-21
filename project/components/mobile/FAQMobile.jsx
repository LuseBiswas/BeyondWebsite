"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackBookCall, trackFAQExpand } from "@/lib/gtag";

export default function FAQMobile() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does it take to complete a website?",
      answer:
        "Timeline varies by project complexity.<br/>A Purely Website typically takes 2-3 weeks, Website+ takes 3-4 weeks, and Beyond Site takes 4-6 weeks.<br/>We'll provide a detailed timeline during our initial consultation.",
      bullets: [
        "Purely Website: ~2–3 weeks",
        "Website+: ~3–4 weeks",
        "Beyond Site: ~4–6 weeks",
      ],
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer:
        "Yes! All our packages include post-launch support.<br/>Website+ includes ongoing support and light content management, while Beyond Site offers dedicated design support with priority access to our team.",
    },
    {
      question: "Can you work with our existing brand guidelines?",
      answer:
        "Absolutely! We can work with your existing brand guidelines and ensure your website aligns perfectly with your brand identity.<br/>If you need brand development, we also offer deeper brand alignment services.",
      bullets: [
        "Use your existing fonts, colors, and components",
        "Extend guidelines when needed",
        "Optional brand refresh",
      ],
    },
    {
      question: "What platforms do you build websites on?",
      answer:
        "We work with various platforms including WordPress, Webflow, and custom solutions depending on your needs.<br/>We'll recommend the best platform based on your requirements, budget, and long-term goals.",
      bullets: ["WordPress", "Webflow", "Custom (Next.js/Node)"],
    },
    {
      question: "Do you handle website hosting and domain setup?",
      answer:
        "Yes, we can assist with hosting recommendations and domain setup.<br/>We work with reliable hosting providers and can guide you through the entire process to ensure your website is properly deployed.",
    },
  ];

  const toggleFAQ = (index) => {
    const isOpening = openIndex !== index;
    setOpenIndex(openIndex === index ? null : index);
    
    // Track only when opening (expanding) an FAQ
    if (isOpening) {
      trackFAQExpand(faqs[index].question);
    }
  };

  const openCalendly = () => {
    trackBookCall('faq_section_mobile');
    window.open('https://calendly.com/hello-designresponsible/lets-chat-beyond-website?background_color=000000&text_color=ffffff&primary_color=e8fc53', '_blank');
  };

  return (
    <div style={{ backgroundColor: "#3D3D3D" }} className="min-h-screen py-10 px-4 sm:py-12">
      <div className="mx-auto w-full max-w-[46rem]"> {/* ~736px on big phones/tablets */}
        {/* Main Header */}
        <h1
          className="text-center mb-4 sm:mb-6 leading-[1.1]"
          style={{
            fontFamily: "Syne, sans-serif",
            color: "#FFFFFF",
            // fluid between very small phones and tablets
            fontSize: "clamp(28px, 9vw, 44px)",
          }}
        >
          We believe <br /> clarity builds trust.
        </h1>

        {/* Sub Header */}
        <p
          className="text-center mb-8 sm:mb-12 leading-[1.35]"
          style={{
            fontFamily: "Questrial, sans-serif",
            color: "#FFFFFF",
            fontSize: "clamp(16px, 5.2vw, 28px)",
          }}
        >
          Here's what most of our clients ask, <br /> before they start their journey.
        </p>

        {/* FAQ Section */}
        <div className="flex flex-col items-stretch gap-3 sm:gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                layout
                className="w-full rounded-2xl sm:rounded-3xl overflow-hidden"
                style={{ backgroundColor: "#323131" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Question */}
                <button
                  className="w-full px-4 py-4 sm:px-5 sm:py-5 text-left flex justify-between items-center hover:bg-black/10 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <h3
                    className="leading-[1.25] pr-3"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: "#FFFFFF",
                      fontSize: "clamp(18px, 5.6vw, 28px)",
                    }}
                  >
                    {faq.question}
                  </h3>

                  {/* Plus / Minus with a little fade/scale */}
                  <motion.span
                    initial={false}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 flex-shrink-0"
                    aria-hidden
                  >
                    {isOpen ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Minus className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Plus className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                      </motion.span>
                    )}
                  </motion.span>
                </button>

                {/* Answer (animated mount/unmount) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-3">
                        <p
                          className="leading-[1.5]"
                          style={{
                            fontFamily: "Questrial, sans-serif",
                            color: "#FFFFFF",
                            fontSize: "clamp(15px, 4.5vw, 22px)",
                          }}
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                        {Array.isArray(faq.bullets) && faq.bullets.length > 0 && (
                          <ul className="list-disc pl-5 sm:pl-6">
                            {faq.bullets.map((item, i) => (
                              <li
                                key={i}
                                className="leading-[1.55]"
                                style={{
                                  fontFamily: "Questrial, sans-serif",
                                  color: "#FFFFFF",
                                  fontSize: "clamp(14px, 4vw, 18px)",
                                }}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

                  {/* CTA Section */}
          <div className="text-center mt-12">
            {/* Sub Heading */}
            <h2
              className="text-center mb-8 leading-[1.35]"
              style={{
                fontFamily: "Questrial, sans-serif",
                color: "#FFFFFF",
                fontSize: "clamp(16px, 5.2vw, 28px)",
              }}
            >
              Didn't find your answer? <br /> Let's talk it through.
            </h2>

                          {/* CTA Button with Glowing Border */}
              <div className="relative inline-block">
                {/* Gradient border layer */}
                <div
                  className="absolute rounded-4xl sm:rounded-3xl pointer-events-none"
                  style={{
                    inset: "-3px",
                    padding: "3px",
                    background: `linear-gradient(90deg, #009A98 0%, #1E7072 23.56%, #4E599D 41.83%, #33369E 61.06%, #0D8174 92.79%)`,
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                
                <button
                  className="relative text-white px-5 sm:px-6 rounded-4xl sm:rounded-4xl font-normal transition-all duration-300 h-[45px] sm:h-[50px] flex items-center justify-center hover:opacity-80 cursor-pointer"
                  style={{ 
                    fontFamily: "Questrial, sans-serif", 
                    backgroundColor: "#595959",
                    fontSize: "clamp(16px, 4.8vw, 24px)",
                  }}
                  onClick={openCalendly}
                >
                  Quick 15 Minute Call
                </button>
              </div>

              {/* Email Sub Heading */}
              <p
                className="text-center mt-6 sm:mt-8 leading-[1.35]"
                style={{
                  fontFamily: "Questrial, sans-serif",
                  color: "#FFFFFF",
                  fontSize: "clamp(14px, 4.2vw, 20px)",
                }}
              >
                Alternatively, email us at: <br />  hello@designresponsible.com
              </p>
          </div>

          {/* (Optional) tiny bottom spacer on very small screens */}
          <div className="h-6 sm:h-8" />
      </div>
    </div>
  );
}
