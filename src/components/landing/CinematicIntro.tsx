import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import bg1 from "@/assets/cinematic-bg1.png";
import bg2 from "@/assets/cinematic-bg2-country-detail.png";
import bg3 from "@/assets/cinematic-bg3.png";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInCarousel, setIsInCarousel] = useState(true);
  const [isContainerInView, setIsContainerInView] = useState(true);
  const lastWheelTimeRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(0);
  const isMobile = useIsMobile();

  // Update ref whenever activeIndex changes
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Observer for rendering arrows only when the cinematic section is actually visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsContainerInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToSection = (index: number) => {
    const newIndex = Math.max(0, Math.min(4, index));
    setActiveIndex(newIndex);
  };

  const goNext = () => {
    if (activeIndex < 4) {
      goToSection(activeIndex + 1);
    } else {
      // After section 5, scroll down to hero and hide arrows
      setIsInCarousel(false);
      scrollToHero();
    }
  };

  const goPrev = () => {
    goToSection(Math.max(0, activeIndex - 1));
  };

  // Track carousel visibility and handle scroll-to-carousel navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = 0;
    let lastScrollTime = 0;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      const scrollDelta = currentScrollTop - lastScrollTop;
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime;

      // Update carousel visibility
      const inCarousel = currentScrollTop < window.innerHeight;
      setIsInCarousel(inCarousel);

      // If user is in sections 1-5 (activeIndex <= 4), prevent scrolling and navigate carousel instead
      if (activeIndexRef.current <= 4 && currentScrollTop > 10) {
        // Force scroll back to top to prevent page scroll
        container.scrollTop = 0;
        
        // Handle the scroll direction for carousel navigation
        if (timeSinceLastScroll > 600) {
          if (scrollDelta > 0) {
            // Scrolling down - go to next section
            setActiveIndex(activeIndexRef.current + 1);
            lastScrollTime = now;
          } else if (scrollDelta < 0) {
            // Scrolling up - go to previous section
            setActiveIndex(activeIndexRef.current - 1);
            lastScrollTime = now;
          }
        }
      }
      // If at section 5, allow normal scrolling to proceed to main content
      // (don't force scrollTop back to 0)

      lastScrollTop = currentScrollTop;
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle wheel events for carousel navigation (desktop only)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const scrollTop = container.scrollTop;
      const inCarouselArea = scrollTop < window.innerHeight * 0.1; // Very lenient check

      // Only intercept wheel events in carousel area (first 5 sections)
      if (activeIndexRef.current > 4) {
        // Beyond section 5, allow normal wheel scrolling to proceed to main content
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

      // Don't go past section 4 (allow section 5, then scroll to main)
      if (newIndex > 4) {
        setIsInCarousel(false);
        scrollToHero();
        return;
      }

      // Normal navigation
      setActiveIndex(newIndex);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isMobile]);

  // Mobile swipe handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // If we are still in the cinematic sequence, prevent native vertical scrolling
      if (activeIndexRef.current <= 4) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].screenY;
      const touchDuration = Date.now() - touchStartTime;

      // Only process as swipe if it's a quick/medium gesture
      if (touchDuration > 1000) return;

      const swipeThreshold = 30; // pixels
      // diff > 0 means user swiped up (intent to scroll down / go next)
      const diff = touchStartY - touchEndY;

      // If they swipe vertically far enough
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped up - go next
          if (activeIndexRef.current < 4) {
            setActiveIndex(activeIndexRef.current + 1);
          } else {
            setIsInCarousel(false);
            scrollToHero();
          }
        } else {
          // Swiped down - go previous
          if (activeIndexRef.current > 0) {
            setActiveIndex(activeIndexRef.current - 1);
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
  }, []);

  // Update carousel wrapper position
  useEffect(() => {
    if (carouselWrapperRef.current) {
      const offset = activeIndex * -100;
      carouselWrapperRef.current.style.transform = `translateX(${offset}vw)`;
      carouselWrapperRef.current.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    }
  }, [activeIndex]);

  // Add pagination dots for mobile
  const dotClick = (index: number) => {
    goToSection(index);
  };

  return (
    <div
      ref={containerRef}
      className="cinematic-container"
      aria-label="MapMind introduction"
      style={{ touchAction: "pan-y" }}
    >
      {/* Carousel Wrapper for Sections 1-5 */}
      <div ref={carouselWrapperRef} className="cinematic-carousel-wrapper">
        {/* Section 1 */}
        <CinematicSlide bgImage={bg1} isActive={activeIndex === 0} className="max-w-4xl sm:max-w-5xl">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Do you know someone who always knows what's going on{" "}
            <span className="text-gradient">in the world?</span>
          </h2>
        </CinematicSlide>

        {/* Section 2 */}
        <CinematicSlide bgImage={bg2} isActive={activeIndex === 1} className="max-w-3xl sm:max-w-4xl">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 sm:mb-8">
            What's going on in the United States?
          </h2>
          <p className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient">
            They know.
          </p>
        </CinematicSlide>

        {/* Section 3 */}
        <CinematicSlide
          bgImage={bg1}
          imagePosition="72% center"
          isActive={activeIndex === 2}
          className="max-w-3xl sm:max-w-4xl"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 sm:mb-8">
            What's happening across Europe?
          </h2>
          <p className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient">
            They know.
          </p>
        </CinematicSlide>

        {/* Section 4 */}
        <CinematicSlide bgImage={bg3} isActive={activeIndex === 3} className="max-w-3xl sm:max-w-4xl">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
            But how do they know?
          </h2>
        </CinematicSlide>

        {/* Section 5 — The Reveal */}
        <CinematicSlide
          bgImage={bg1}
          isActive={activeIndex === 4}
          className="max-w-2xl sm:max-w-[880px]"
          sectionClassName="cinematic-section--reading"
        >
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              The answer is simple: structure what you learn geographically.
            </p>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-red-500 font-medium leading-relaxed">
              You read. You forget. You scroll. Repeat.
            </p>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              Every piece of news has a country. Every market move has an origin. Every idea has a place on the map. When you anchor information to a location, it stops floating — it sticks.
            </p>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              <span className="text-primary font-medium">Charlie Munger called it building a "lattice work of mental models"</span> — a framework where every new thing you learn connects to something you already know, and reinforces it.
            </p>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              That's the habit. Geography is the lattice.
            </p>
          </div>
          <div className="mt-8 sm:mt-10">
            <p className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mb-6 sm:mb-8">
              <span className="text-white">MapMind</span> <span className="text-primary">lets you build it.</span>
            </p>
            <button
              onClick={scrollToHero}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-[0.12em] bg-primary text-primary-foreground rounded-lg border border-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              See how →
            </button>
          </div>
        </CinematicSlide>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      {isInCarousel && isContainerInView && !isMobile && (
        <>
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="hidden sm:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 p-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Previous section"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goNext}
            className="hidden sm:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 p-2 text-white/60 hover:text-white transition-colors duration-200"
            aria-label="Next section"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Mobile Pagination Dots */}
      {isInCarousel && isContainerInView && isMobile && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => dotClick(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "bg-primary w-6"
                  : "bg-white/50 hover:bg-white"
              )}
              aria-label={`Go to section ${index + 1}`}
              aria-current={activeIndex === index}
            />
          ))}
        </div>
      )}

      {/* Mobile hint text */}
      {isInCarousel && isMobile && activeIndex !== 4 && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 text-xs text-white/70 pointer-events-none animate-pulse">
          Swipe up to continue
        </div>
      )}
    </div>
  );
};

export default CinematicIntro;
