import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown } from "lucide-react";
import panoramicMap from "@/assets/panoramic-map.png";

interface CinematicSlideProps {
  bgImage: string;
  imagePosition?: string;
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
  sectionClassName?: string;
}

const CinematicSlide = ({
  bgImage,
  imagePosition = "center",
  isActive,
  children,
  className,
  sectionClassName,
}: CinematicSlideProps) => {
  return (
    <section
      data-cinematic-section
      className={cn("cinematic-section", sectionClassName)}
    >
      <div className="cinematic-background" aria-hidden="true">
        <img
          src={bgImage}
          alt=""
          className="cinematic-image"
          style={{ objectPosition: imagePosition }}
        />
      </div>
      <div
        className={cn(
          "content cinematic-content mx-auto w-full px-4 sm:px-6 md:px-6",
          isActive && "in-view",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
};

const CinematicIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const transitionLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInCarousel, setIsInCarousel] = useState(true);
  const lastWheelTimeRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(0);
  const isMobile = useIsMobile();
  const firstSlideIndex = 0;
  const lastSlideIndex = 0;

  // Update ref whenever activeIndex changes
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollToHero = () => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const top = hero.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const transitionToHero = () => {
    if (transitionLockRef.current) return;
    transitionLockRef.current = true;
    setIsInCarousel(false);
    requestAnimationFrame(() => {
      scrollToHero();
    });
    window.setTimeout(() => {
      transitionLockRef.current = false;
    }, 900);
  };

  // Handle wheel events for intro navigation (desktop only)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const scrollTop = container.scrollTop;
      const inCarouselArea = scrollTop < window.innerHeight * 0.1; // Very lenient check

      // Only intercept wheel events while in intro
      if (activeIndexRef.current > lastSlideIndex) {
        return;
      }

      if (!inCarouselArea) {
        // Not in carousel area, allow normal scrolling
        return;
      }

      // Debounce: only allow one scroll every 1000ms
      if (now - lastWheelTimeRef.current < 1000) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      lastWheelTimeRef.current = now;
      
      const delta = e.deltaY > 0 ? 1 : -1;
      const newIndex = activeIndexRef.current + delta;

      // Prevent scrolling before section 1
      if (newIndex < 0) {
        return;
      }

      // Move from intro to hero when scrolling past the intro slide
      if (newIndex > lastSlideIndex) {
        transitionToHero();
        return;
      }

      // Normal navigation
      setActiveIndex(newIndex);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isMobile, lastSlideIndex]);

  // Mobile swipe handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // If we are still in the cinematic sequence, prevent native vertical scrolling
      if (activeIndexRef.current <= lastSlideIndex) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      const touchDuration = Date.now() - touchStartTime;

      // Only process as swipe if it's a quick/medium gesture
      if (touchDuration > 1000) return;

      const swipeThreshold = 30; // pixels
      // diffY > 0 means user swiped up (intent to go next)
      // diffX > 0 means user swiped left (intent to go next)
      const diffY = touchStartY - touchEndY;
      const diffX = touchStartX - touchEndX;

      // Resolve dominant swipe direction first (vertical or horizontal)
      if (Math.max(Math.abs(diffY), Math.abs(diffX)) > swipeThreshold) {
        if (Math.abs(diffY) >= Math.abs(diffX)) {
          if (diffY > 0) {
            // Swiped up - go next
            if (activeIndexRef.current < lastSlideIndex) {
              setActiveIndex(activeIndexRef.current + 1);
            } else {
              transitionToHero();
            }
          } else {
            // Swiped down - go previous
            if (activeIndexRef.current > firstSlideIndex) {
              setActiveIndex(activeIndexRef.current - 1);
            }
          }
        } else if (diffX > 0) {
          // Swiped left - go next
          if (activeIndexRef.current < lastSlideIndex) {
            setActiveIndex(activeIndexRef.current + 1);
          } else {
            transitionToHero();
          }
        }
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [firstSlideIndex, lastSlideIndex]);

  // Update carousel wrapper position
  useEffect(() => {
    if (carouselWrapperRef.current) {
      const offset = activeIndex * -100;
      carouselWrapperRef.current.style.transform = `translateX(${offset}vw)`;
      carouselWrapperRef.current.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="cinematic-container"
      aria-label="MapMind introduction"
      style={{ touchAction: "pan-y" }}
    >
      {/* Carousel Wrapper for Sections 1-6 */}
      <div ref={carouselWrapperRef} className="cinematic-carousel-wrapper">
        {/* Section 1 - NEW INTRO SLIDE with Panoramic Map Background */}
        <CinematicSlide
          bgImage={panoramicMap}
          isActive={activeIndex === 0}
          className="max-w-5xl sm:max-w-6xl lg:max-w-7xl"
          sectionClassName="relative cinematic-section--intro"
        >
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 sm:gap-8">
            {isMobile && activeIndex === 0 && (
              <div className="flex flex-col items-center gap-1 text-white/85 pointer-events-none">
                <span className="text-[10px] uppercase tracking-[0.14em]">Scroll down</span>
                <ChevronDown className="w-4 h-4 animate-nudge-y" />
              </div>
            )}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-primary">
                <span className="text-white"> Think in maps — </span>not just notes.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed">
                Build your own <span className="text-white font-semibold">"second brain"</span> for news, ideas, and knowledge
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 w-full max-w-4xl">
              {/* Horizontal Flow Chart */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 py-4">
                <div className="flex flex-col items-center">
                  <div className="px-3 sm:px-4 py-2 rounded-lg bg-transparent text-xs sm:text-sm text-white font-medium whitespace-nowrap">
                    Read & Add
                  </div>
                </div>
                <div className="text-white text-lg">→</div>
                <div className="flex flex-col items-center">
                  <div className="px-3 sm:px-4 py-2 rounded-lg bg-transparent text-xs sm:text-sm text-white font-medium whitespace-nowrap">
                    Connect to Places
                  </div>
                </div>
                <div className="text-white text-lg">→</div>
                <div className="flex flex-col items-center">
                  <div className="px-3 sm:px-4 py-2 rounded-lg bg-transparent text-xs sm:text-sm text-white font-medium whitespace-nowrap">
                    See Patterns
                  </div>
                </div>
              </div>

              <div className="text-center px-3 sm:px-0">
                <h3 className="text-base sm:text-xl md:text-2xl text-white font-semibold leading-snug">
                  Like <span className="text-white">Notion</span> + <span className="text-white">Google Maps</span> — for your knowledge
                </h3>
              </div>

              <div className="flex flex-col items-center gap-3 pt-8">
                <button
                  className="inline-flex items-center justify-center w-[17.2rem] sm:w-[18.5rem] px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base font-semibold uppercase tracking-[0.08em] whitespace-nowrap bg-primary text-primary-foreground rounded-lg border border-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  <a href="https://mapmind.online" className="flex items-center justify-center w-full text-center whitespace-nowrap leading-tight">
                    Start Mapping — It's Free
                  </a>
                </button>
              </div>
            </div>

          </div>
        </CinematicSlide>
      </div>

      {/* Desktop hint text */}
      {isInCarousel && !isMobile && activeIndex === 0 && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/80 pointer-events-none">
          <span className="text-xs sm:text-sm uppercase tracking-[0.16em]">Scroll down</span>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-nudge-y" />
        </div>
      )}
    </div>
  );
};

export default CinematicIntro;
