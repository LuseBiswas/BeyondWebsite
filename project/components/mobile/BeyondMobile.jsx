"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function BeyondMobile() {
  const videoCards = [
    {
      id: 1,
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_11.mov",
      imageUrl: "/image/img_1.png",
      title: "Beyond Attraction",
      subtitle: "into trust, engagement, and action."
    },
    {
      id: 2,
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_12.mov",
      imageUrl: "/image/img_2.png",
      title: "Beyond Colours",
      subtitle: "into clarity, accessibility, and emotion."
    },
    {
      id: 3,
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_13.mov",
      imageUrl: "/image/img_3.png",
      title: "Beyond Trends",
      subtitle: "into timeless design that adapts to change."
    },
    {
      id: 4,
      videoUrl: "https://mj30wjmjc20cbmuo.public.blob.vercel-storage.com/vid_14.mov",
      imageUrl: "/image/img_4.png",
      title: "Beyond Layouts",
      subtitle: "into journeys that feel intuitive and human."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0); // 0 or 1 to track which video is active
  const [isTransitioning, setIsTransitioning] = useState(false);
  const backgroundVideoRef = useRef(null);
  const backgroundVideoRef2 = useRef(null);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleCardChange = async (index) => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    setActiveIndex(index);
    
    const currentVideo = activeVideoIndex === 0 ? backgroundVideoRef.current : backgroundVideoRef2.current;
    const nextVideo = activeVideoIndex === 0 ? backgroundVideoRef2.current : backgroundVideoRef.current;
    
    if (index > 0 && currentVideo && nextVideo) {
      // Start transition for video background
      setIsTransitioning(true);
      
      // Prepare the new video
      nextVideo.src = videoCards[index].videoUrl;
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
    } else if (index > 0 && currentVideo) {
      // First time switching from background image to video
      currentVideo.src = videoCards[index].videoUrl;
      currentVideo.currentTime = 0;
      try {
        await currentVideo.play();
      } catch (error) {
        console.error('Background video play error:', error);
      }
    }
    // If index === 0, we show the background image (no video needed)
  };

  // Touch handlers for swipe functionality
  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left - go to next card
      const nextIndex = (activeIndex + 1) % videoCards.length;
      handleCardChange(nextIndex);
    }
    
    if (isRightSwipe) {
      // Swipe right - go to previous card
      const prevIndex = (activeIndex - 1 + videoCards.length) % videoCards.length;
      handleCardChange(prevIndex);
    }
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + videoCards.length) % videoCards.length;
      cards.push({
        ...videoCards[index],
        position: i
      });
    }
    return cards;
  };

  return (
    <div 
      className="bg-black relative min-h-screen overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background image/video */}
      <div className="absolute inset-0">
        {/* Default background image */}
        <motion.div
          animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <Image
            src="/image/bg.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Background videos for seamless crossfade */}
        <motion.video
          ref={backgroundVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ 
            opacity: activeIndex > 0 ? (activeVideoIndex === 0 ? 1 : 0) : 0 
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          loop
          muted
          playsInline
          style={{ 
            zIndex: activeVideoIndex === 0 ? 2 : 1
          }}
        />
        
        {/* Second video element for seamless transitions */}
        <motion.video
          ref={backgroundVideoRef2}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ 
            opacity: activeIndex > 0 ? (activeVideoIndex === 1 ? 1 : 0) : 0 
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          loop
          muted
          playsInline
          style={{ 
            zIndex: activeVideoIndex === 1 ? 2 : 1
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Headers */}
        <div className="text-center pt-12 px-4">
          <p
            className="mb-4"
            style={{
              fontFamily: "Questrial, sans-serif",
              fontSize: "28px",
              color: "#FFFFFF"
            }}
          >
            It's always
          </p>
          <h1
            className="mb-4"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "44px",
              color: "#FFFFFF",
              lineHeight: "1.1"
            }}
            dangerouslySetInnerHTML={{ __html: videoCards[activeIndex].title }}
          />
          <p
            className="mb-16"
            style={{
              fontFamily: "Questrial, sans-serif",
              fontSize: "20px",
              color: "#FFFFFF",
              lineHeight: "1.3"
            }}
            dangerouslySetInnerHTML={{ __html: videoCards[activeIndex].subtitle }}
          />
        </div>

        {/* Dot indicators - Fixed position */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-32 z-20">
          <div className="flex items-center justify-center gap-2">
            {getVisibleCards().map((card, index) => {
              const isActive = card.position === 0;
              const isLeft = card.position === -1;
              const isRight = card.position === 1;
              
              return (
                <motion.div
                  key={`dot-${card.id}`}
                  className="rounded-full bg-white cursor-pointer"
                  layout
                  animate={{
                    width: isActive ? "39px" : "15px",
                    height: isActive ? "39px" : "15px",
                    opacity: isActive ? 1 : 0.5
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeInOut",
                    layout: { duration: 0.6, ease: "easeInOut" }
                  }}
                  onClick={() => {
                    if (!isActive) {
                      const newIndex = videoCards.findIndex(c => c.id === card.id);
                      handleCardChange(newIndex);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Carousel */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="flex items-center justify-center gap-2">
            {getVisibleCards().map((card, index) => {
              const isActive = card.position === 0;
              const isLeft = card.position === -1;
              const isRight = card.position === 1;
              
              return (
                <motion.div
                  key={card.id}
                  className="cursor-pointer"
                  layout
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    zIndex: isActive ? 3 : 1
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeInOut",
                    layout: { duration: 0.6, ease: "easeInOut" }
                  }}
                  onClick={() => {
                    if (!isActive) {
                      const newIndex = videoCards.findIndex(c => c.id === card.id);
                      handleCardChange(newIndex);
                    }
                  }}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-2xl"
                    animate={{
                      width: isActive ? "277px" : "224px",
                      height: isActive ? "319px" : "262px"
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Image
                      src={card.imageUrl}
                      alt={`Card ${card.id}`}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Overlay for non-active cards */}
                    <motion.div
                      className="absolute inset-0 bg-black"
                      animate={{
                        opacity: isActive ? 0 : 0.4
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>


      </div>
    </div>
  );
} 