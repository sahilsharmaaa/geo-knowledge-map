import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
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
          "content cinematic-content mx-auto w-full px-6",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-cinematic-section]")
    );

    if (!sections.length) return;

    const ratios = new Map<number, number>();
    sections.forEach((_, index) => ratios.set(index, index === 0 ? 1 : 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sections.indexOf(entry.target as HTMLElement);
          if (index === -1) return;
          ratios.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextIndex = 0;
        let highestRatio = -1;

        ratios.forEach((ratio, index) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            nextIndex = index;
          }
        });

        setActiveIndex((currentIndex) =>
          currentIndex === nextIndex ? currentIndex : nextIndex
        );
      },
      {
        root: container,
        threshold: [0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="cinematic-container"
      aria-label="MapMind introduction"
    >
      {/* Section 1 */}
      <CinematicSlide bgImage={bg1} isActive={activeIndex === 0} className="max-w-5xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
          Do you know someone who always knows what's going on{" "}
          <span className="text-gradient">in the world?</span>
        </h2>
      </CinematicSlide>

      {/* Section 2 */}
      <CinematicSlide bgImage={bg2} isActive={activeIndex === 1} className="max-w-4xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-8">
          What's going on in the United States?
        </h2>
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient">
          They know.
        </p>
      </CinematicSlide>

      {/* Section 3 */}
      <CinematicSlide
        bgImage={bg1}
        imagePosition="72% center"
        isActive={activeIndex === 2}
        className="max-w-4xl"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-8">
          What's happening across Europe?
        </h2>
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient">
          They know.
        </p>
      </CinematicSlide>

      {/* Section 4 */}
      <CinematicSlide bgImage={bg3} isActive={activeIndex === 3} className="max-w-4xl">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
          But how do they know?
        </h2>
      </CinematicSlide>

      {/* Section 5 — The Reveal */}
      <CinematicSlide
        bgImage={bg1}
        isActive={activeIndex === 4}
        className="max-w-[880px]"
        sectionClassName="cinematic-section--reading"
      >
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <p className="text-base sm:text-lg md:text-xl text-foreground/84 leading-relaxed">
            The answer is simple: structure what you learn geographically.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-foreground/84 leading-relaxed">
            Every piece of news has a country. Every market move has an origin. Every idea has a place on the map. When you anchor information to a location, it stops floating — it sticks.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-foreground/84 leading-relaxed">
            Charlie Munger called it building a "lattice work of mental models" — a framework where every new thing you learn connects to something you already know, and reinforces it.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-foreground/84 leading-relaxed">
            That's the habit. Geography is the lattice.
          </p>
        </div>
        <div className="mt-10">
          <p className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-primary mb-6">
            MapMind lets you build it.
          </p>
          <button
            onClick={scrollToHero}
            className="text-sm uppercase tracking-[0.24em] text-foreground/65 hover:text-foreground transition-colors"
          >
            See how
          </button>
        </div>
      </CinematicSlide>
    </div>
  );
};

export default CinematicIntro;
