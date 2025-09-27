"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import BeyondMobile from "./mobile/BeyondMobile";

export default function Beyond() {
  const videoCards = [
    {
      id: 1,
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_11.mov",
      imageUrl: "/image/img_1.png",
      yPosition: "500px",
      title: "Beyond <br/> Attraction",
      subtitle: "into trust, engagement,<br/> and action."
    },
    {
      id: 2,
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_12.mov",
      imageUrl: "/image/img_2.png",
      yPosition: "500px",
      title: "Beyond <br/>Colours",
      subtitle: "into clarity, accessibility,<br/>and emotion."
    },
    {
      id: 3,
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_13.mov",
      imageUrl: "/image/img_3.png",
      yPosition: "500px",
      title: "Beyond<br/>Trends",
      subtitle: "into timeless design<br/>that adapts to change."
    },
    {
      id: 4,
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_14.mov",
      imageUrl: "/image/img_4.png",
      yPosition: "500px",
      title: "Beyond<br/>Layouts",
      subtitle: "into journeys that feel<br/>intuitive and human."
    }
  ];

  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0); // 0 or 1 to track which video is active
  const videoRefs = useRef({});
  const playPromises = useRef({});
  const backgroundVideoRef = useRef(null);
  const backgroundVideoRef2 = useRef(null);

  const handleMouseEnter = async (cardId) => {
    setHoveredCard(cardId);
    const video = videoRefs.current[cardId];
    if (video) {
      try {
        // Cancel any existing play promise
        if (playPromises.current[cardId]) {
          await playPromises.current[cardId];
        }
        
        video.currentTime = 0;
        playPromises.current[cardId] = video.play();
        await playPromises.current[cardId];
        playPromises.current[cardId] = null;
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Video play error:', error);
        }
      }
    }
  };

  const handleMouseLeave = async () => {
    if (hoveredCard) {
      const video = videoRefs.current[hoveredCard];
      if (video) {
        try {
          // Wait for any pending play promise before pausing
          if (playPromises.current[hoveredCard]) {
            await playPromises.current[hoveredCard];
          }
          video.pause();
        } catch (error) {
          // Ignore AbortError as it's expected when interrupting play
          if (error.name !== 'AbortError') {
            console.error('Video pause error:', error);
          }
        }
      }
    }
    setHoveredCard(null);
  };

  const handleCardClick = async (card) => {
    if (selectedCard && selectedCard.id === card.id) return; // Same card, no need to transition
    if (isTransitioning) return; // Prevent multiple transitions
    
    const currentVideo = activeVideoIndex === 0 ? backgroundVideoRef.current : backgroundVideoRef2.current;
    const nextVideo = activeVideoIndex === 0 ? backgroundVideoRef2.current : backgroundVideoRef.current;
    
    if (selectedCard && currentVideo && nextVideo) {
      // Start transition
      setIsTransitioning(true);
      
      // Prepare the new video
      nextVideo.src = card.videoUrl;
      nextVideo.currentTime = 0;
      
      try {
        await nextVideo.play();
        
        // Switch active video index to trigger smooth animation
        setActiveVideoIndex(activeVideoIndex === 0 ? 1 : 0);
        
        // After animation completes, clean up the old video
        setTimeout(() => {
          currentVideo.pause();
          setIsTransitioning(false);
        }, 600);
        
      } catch (error) {
        console.error('Background video play error:', error);
        setIsTransitioning(false);
      }
    } else {
      // First time clicking
      if (currentVideo) {
        currentVideo.src = card.videoUrl;
        currentVideo.currentTime = 0;
        try {
          await currentVideo.play();
        } catch (error) {
          console.error('Background video play error:', error);
        }
      }
    }
    
    setSelectedCard(card);
  };

  const handleCloseFullscreen = () => {
    setSelectedCard(null);
    setIsTransitioning(false);
    setActiveVideoIndex(0); // Reset to first video
    
    // Pause both videos
    const backgroundVideo = backgroundVideoRef.current;
    const backgroundVideo2 = backgroundVideoRef2.current;
    
    if (backgroundVideo) {
      backgroundVideo.pause();
    }
    if (backgroundVideo2) {
      backgroundVideo2.pause();
    }
  };

  return (
    <>
      {/* Desktop and Tablet Layout (lg and above) */}
      <div className="hidden lg:block bg-black relative h-[1260px]">
      {/* Background image/video */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ opacity: selectedCard ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <Image
            src="/image/bg.png"
            alt="Background"
            fill
            className="object-cover object-top"
            style={{ height: "100%", maxHeight: "1000px" }}
            priority
          />
        </motion.div>
        
        {/* Fullscreen video overlays for crossfade */}
        <motion.video
          ref={backgroundVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: selectedCard ? (activeVideoIndex === 0 ? 1 : 0) : 0 
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          loop
          muted
          playsInline
          style={{ 
            pointerEvents: selectedCard ? 'auto' : 'none',
            zIndex: activeVideoIndex === 0 ? 2 : 1
          }}
        />
        
        {/* Second video element for seamless transitions */}
        <motion.video
          ref={backgroundVideoRef2}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: selectedCard ? (activeVideoIndex === 1 ? 1 : 0) : 0 
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          loop
          muted
          playsInline
          style={{ 
            pointerEvents: 'none',
            zIndex: activeVideoIndex === 1 ? 2 : 1
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-16">
        {/* Sub Header - Responsive */}
        <motion.p
          className="text-center mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px]"
          animate={{ opacity: selectedCard ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            fontFamily: "Questrial, sans-serif",
            color: "#FFFFFF"
          }}
        >
          It's always
        </motion.p>

        {/* Main Header - Responsive */}
        <motion.h1
          className="text-center mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px]"
          animate={{ opacity: selectedCard ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            fontFamily: "Syne, sans-serif",
            color: "#FFFFFF",
            lineHeight: "1.1"
          }}
        >
          Beyond the Surface
        </motion.h1>

        {/* Video Cards Container - Responsive */}
        <div className="relative w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          {/* Horizontally aligned video cards with manual Y positioning */}
          <div className="flex justify-center items-start w-full gap-8 lg:gap-12 xl:gap-16 2xl:gap-20">
            {videoCards.map((card, index) => (
              <motion.div
                key={card.id}
                className="relative cursor-pointer"
                initial={{ 
                  y: parseInt(card.yPosition) 
                }}
                animate={{ 
                  y: hoveredCard === card.id 
                    ? parseInt(card.yPosition) - 20 
                    : parseInt(card.yPosition)
                }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                onMouseEnter={() => handleMouseEnter(card.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCardClick(card)}
              >
                <div 
                  className="overflow-hidden rounded-2xl lg:rounded-3xl xl:rounded-4xl relative"
                  style={{ 
                    width: "clamp(200px, 20vw, 257px)", 
                    height: "clamp(400px, 42vw, 539px)" 
                  }}
                >
                  {/* Video (always ready, behind image initially) */}
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[card.id] = el;
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={card.videoUrl} />
                    Your browser does not support the video tag.
                  </video>

                  {/* Static Image (overlay that fades out on hover) */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: hoveredCard === card.id ? 0 : 1 
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                  >
                    <Image
                      src={card.imageUrl}
                      alt={`Card ${card.id}`}
                      width={257}
                      height={539}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 1024px) 200px, (max-width: 1280px) 230px, (max-width: 1536px) 257px, 280px"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content overlay for selected card */}
        {selectedCard && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-start pl-12 lg:pl-16 xl:pl-24 2xl:pl-32"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl">
              {/* Close button */}
              <button
                onClick={handleCloseFullscreen}
                className="absolute top-6 lg:top-8 text-white text-xl lg:text-2xl hover:text-gray-300 transition-colors"
                style={{ right: "-16rem lg:-20rem xl:-24rem 2xl:-28rem" }}
              >
                ✕
              </button>

              {/* Header - Responsive */}
              <h1
                className="text-white mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 text-[64px] lg:text-[80px] xl:text-[96px] 2xl:text-[120px]"
                style={{
                  fontFamily: "Syne, sans-serif",
                  lineHeight: "1.1",
                  paddingLeft: "1rem lg:1.5rem xl:2rem 2xl:2.5rem"
                }}
                dangerouslySetInnerHTML={{ __html: selectedCard.title }}
              />

              {/* Sub header - Responsive */}
              <p
                className="text-white text-[28px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] leading-[1.3] lg:leading-[1.35] xl:leading-[1.4] 2xl:leading-[1.45]"
                style={{
                  fontFamily: "Questrial, sans-serif",
                  paddingLeft: "1rem lg:1.5rem xl:2rem 2xl:2.5rem"
                }}
                dangerouslySetInnerHTML={{ __html: selectedCard.subtitle }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>

    {/* Mobile Layout (below lg) */}
    <div className="lg:hidden">
      <BeyondMobile />
    </div>
  </>
  );
} 