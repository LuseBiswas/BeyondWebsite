"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FAQMobile from "./mobile/FAQMobile";

export default function FAQ() {
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
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block rounded-b-[50px]" style={{ backgroundColor: "#3D3D3D" }}>
        <div className="min-h-screen py-12 lg:py-16 xl:py-20 2xl:py-24 px-4 lg:px-6 xl:px-8 2xl:px-12">
          <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
            {/* Main Header */}
            <h1
              className="text-center mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px] leading-[1.1]"
              style={{ fontFamily: "Syne, sans-serif", color: "#FFFFFF" }}
            >
              We believe <br /> clarity builds trust.
            </h1>

            {/* Sub Header */}
            <p
              className="text-center mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[1.3]"
              style={{ fontFamily: "Questrial, sans-serif", color: "#FFFFFF" }}
            >
              Here's what most of our clients ask, <br /> before they start their journey.
            </p>

            {/* FAQ Section */}
            <div className="flex flex-col items-center space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    layout
                    className="w-full max-w-[775px] lg:max-w-[875px] xl:max-w-[968px] 2xl:max-w-[1100px] rounded-3xl lg:rounded-4xl xl:rounded-4xl 2xl:rounded-5xl overflow-hidden"
                    style={{ backgroundColor: "#323131" }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    {/* Question */}
                    <button
                      className="w-full p-4 lg:p-5 xl:p-6 2xl:p-8 text-left flex justify-between items-center hover:cursor-pointer transition-colors duration-200"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                    >
                      <h3
                        className="text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[46px] leading-[1.2]"
                        style={{ fontFamily: "Syne, sans-serif", color: "#FFFFFF" }}
                      >
                        {faq.question}
                      </h3>

                      {/* Plus / Minus with a little fade/scale */}
                      <motion.span
                        initial={false}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3 lg:ml-4 xl:ml-4 2xl:ml-5 flex-shrink-0"
                        aria-hidden
                      >
                        {isOpen ? (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Minus className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-white" />
                          </motion.span>
                        ) : (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Plus className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-white" />
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
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-4 lg:px-5 xl:px-6 2xl:px-8 pb-4 lg:pb-5 xl:pb-6 2xl:pb-8 space-y-3 lg:space-y-4 xl:space-y-4 2xl:space-y-5">
                            <p
                              className="text-[22px] lg:text-[24px] xl:text-[28px] 2xl:text-[34px] leading-[1.4]"
                              style={{ fontFamily: "Questrial, sans-serif", color: "#FFFFFF" }}
                              // allow <br/> in answer
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                            {Array.isArray(faq.bullets) && faq.bullets.length > 0 && (
                              <ul className="list-disc pl-4 lg:pl-5 xl:pl-6 2xl:pl-8">
                                {faq.bullets.map((item, i) => (
                                  <li
                                    key={i}
                                    className="text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px] leading-[1.5]"
                                    style={{ fontFamily: "Questrial, sans-serif", color: "#FFFFFF" }}
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
            <div className="text-center mt-16 lg:mt-20 xl:mt-24 2xl:mt-32">
              {/* Sub Heading */}
              <h2
                className="text-center mb-8 lg:mb-10 xl:mb-12 2xl:mb-16 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[1.3]"
                style={{ fontFamily: "Questrial, sans-serif", color: "#FFFFFF" }}
              >
                Didn't find your answer? <br /> Let's talk it through.
              </h2>

              {/* CTA Button with Glowing Border */}
              <div className="relative inline-block">
                {/* Gradient border layer */}
                <div
                  className="absolute rounded-3xl lg:rounded-4xl pointer-events-none"
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
                  className="relative text-white px-6 lg:px-8 xl:px-10 2xl:px-12 rounded-3xl lg:rounded-4xl text-[24px] lg:text-[27px] xl:text-[30px] 2xl:text-[36px] font-normal transition-all duration-300 h-[50px] lg:h-[55px] xl:h-[61px] 2xl:h-[70px] flex items-center justify-center hover:opacity-80 cursor-pointer"
                  style={{ fontFamily: "Questrial, sans-serif", backgroundColor: "#595959" }}
                  onClick={() => window.open("#", "_blank")}
                >
                  Quick 15 Minute Call
                </button>
              </div>

              {/* Email Sub Heading */}
              <p
                className="text-center mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[28px] leading-[1.3]"
                style={{ fontFamily: "Questrial, sans-serif", color: "#FFFFFF" }}
              >
                Alternatively, email us at: hello@designresponsible.in
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        <FAQMobile />
      </div>
    </>
  );
}
