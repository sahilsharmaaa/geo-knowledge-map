import { ChevronLeft, ChevronRight, Globe, Link2, Tags, Network, Share2, Flame, Newspaper, TrendingUp, BookOpen, Lightbulb, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedMapBackground from "@/components/landing/AnimatedMapBackground";
import SectionWrapper from "@/components/landing/SectionWrapper";
import ImportCallout from "@/components/landing/ImportCallout";
import Navbar from "@/components/landing/Navbar";
import HeroVideo from "@/components/landing/HeroVideo";
import ImageLightbox from "@/components/landing/ImageLightbox";
import CinematicIntro from "@/components/landing/CinematicIntro";
import { cn } from "@/lib/utils";
import logo from "@/assets/Circle_Logo.png";
import screenshotStep1 from "@/assets/screenshot-step1.png";
import screenshotStep2 from "@/assets/screenshot-step2.png";
import screenshotStep3 from "@/assets/screenshot-step3-new.png";
import screenshotStep4 from "@/assets/screenshot-step3.png";
import screenshotStep5 from "@/assets/screenshot-step4.png";
import screenshotStep6 from "@/assets/screenshot-step5.png";
import premium1 from "@/assets/1.png";
import premium1_1 from "@/assets/1.1.png";
import premium2 from "@/assets/2.png";
import premium2_1 from "@/assets/2.1.png";
import premium3 from "@/assets/3.png";
import premium3_1 from "@/assets/3.1.png";
import premium3_2 from "@/assets/3.2.png";
import premium4 from "@/assets/4.png";

const personas = [
  { icon: Newspaper, title: "The News Follower", desc: "Track global conflicts, elections, and economic shifts. Never lose context on a developing story." },
  { icon: TrendingUp, title: "The Finance Watcher", desc: "Map market movements to the countries driving them. Connect macroeconomics to geography." },
  { icon: BookOpen, title: "The History Student", desc: "Annotate empires, battles, and turning points directly on the map. Study comes alive." },
  { icon: Lightbulb, title: "The Curious Mind", desc: "You read widely and think deeply. MapMind is where everything you learn finds its place." },
];

const features = [
  { icon: Globe, name: "Interactive World Map", desc: "Click any country to explore and add notes. The whole world is your notebook." },
  { icon: Link2, name: "Note Connections", desc: "Link related notes across countries and regions. See how ideas connect." },
  { icon: Tags, name: "Tags and Filters", desc: "Organise by topic — geopolitics, economics, history, finance. Filter instantly." },
  { icon: Network, name: "Knowledge Graph", desc: "Visualise your notes as a web of connected ideas. See your thinking from above." },
  { icon: Share2, name: "Shareable Maps", desc: "Publish any map as a public link. Share your research with anyone, no login required." },
  { icon: Flame, name: "Streak Tracking", desc: "Build a daily learning habit. Your heatmap shows how consistently you show up." },
];

const testimonials = [
  { quote: "I used to have 6 different apps for tracking world news. Now it's all in one place and I can actually see the connections.", name: "Aryan Chowdhary", role: "Computer Science Student", flag: "🇮🇳" },
  { quote: "During earnings season I map out every major economy's data points. MapMind made me a better analyst.", name: "Eshaan Trehan", role: "Equity Research Analyst", flag: "🇺🇸" },
  { quote: "Keeping up with global events used to feel impossible — scattered tabs, forgotten articles, zero structure. MapMind made it simple and organised. Now every story has a place on the map.", name: "Aarush Tandon", role: "Global Thinker", flag: "🇮🇳" },
  { quote: "I'm preparing for civil services. Having a visual map of current affairs has genuinely changed how I revise.", name: "Arjun Verma", role: "UPSC Aspirant", flag: "🇮🇳" },
  { quote: "History used to feel abstract. Pinning events to actual places on a map made everything click.", name: "James T.", role: "History Teacher", flag: "🇬🇧" },
  { quote: "I follow 12 different markets. MapMind is the only tool that lets me think geographically about finance.", name: "Chen W.", role: "Independent Trader", flag: "🇸🇬" },
];

const steps = [
  { img: screenshotStep1, title: "Sign up to add a note", caption: "Create your free account and start capturing your thoughts in seconds." },
  { img: screenshotStep2, title: "Pick your location", caption: "Click any country or region on the map — or search for it." },
  { img: screenshotStep3, title: "Create your note", caption: "Allocate it to a region or country, add tags, and connect it with your previous notes." },
  { img: screenshotStep4, title: "See your knowledge grow", caption: "Watch your map fill up. Every country you study lights up. Every connection becomes visible." },
  { img: screenshotStep5, title: "Explore your region view", caption: "That's how your notes will look in region view — organised by country with tags and filters." },
  { img: screenshotStep6, title: "Explore your country", caption: "Dive into any country to see its stats, your notes, tags, and filters — all in one place." },
];

const premiumSlides = [
  {
    number: "1",
    featureName: "Publish Your Maps (Read-Only Public Link)",
    desc: "Generate a unique public read-only URL so anyone can view your map without a MapMind account.",
    src: premium1,
    alt: "Publish map modal with generated public link",
  },
  {
    number: "1.1",
    featureName: "Publish Your Maps (Read-Only Public Link)",
    desc: "Published maps can be opened by anyone as a clean read-only knowledge site.",
    src: premium1_1,
    alt: "Published map view visible in read-only mode",
  },
  {
    number: "2",
    featureName: "Knowledge Graph (Obsidian-Style)",
    desc: "Connect notes into a visual web so ideas reinforce each other and improve retention.",
    src: premium2,
    alt: "Knowledge graph overview with connected notes",
  },
  {
    number: "2.1",
    featureName: "Knowledge Graph (Obsidian-Style)",
    desc: "Inspect connected nodes and understand the relationships between events and concepts.",
    src: premium2_1,
    alt: "Knowledge graph interaction with node tooltip",
  },
  {
    number: "3",
    featureName: "USA State Subdivision Map",
    desc: "Track knowledge state-wise across the US, with more country subdivisions coming soon.",
    src: premium3,
    alt: "US subdivision map with state-level highlights",
  },
  {
    number: "3.1",
    featureName: "USA State Subdivision Map",
    desc: "Browse all US states with dedicated cards and note counts for quick navigation.",
    src: premium3_1,
    alt: "All states view with state cards",
  },
  {
    number: "3.2",
    featureName: "USA State Subdivision Map",
    desc: "Dive into individual state pages to manage notes with filters and sorting.",
    src: premium3_2,
    alt: "Single state page with notes and filters",
  },
  {
    number: "4",
    featureName: "Add As Many Maps As You Want",
    desc: "Free includes three maps. Premium unlocks unlimited maps for separate knowledge bases.",
    src: premium4,
    alt: "Map selector showing multiple maps and new map option",
  },
];

const philosophySlides = [
  "Do you know someone who always knows what's going on in the world?",
  "What's going on in the United States?",
  "What's happening across Europe?",
  "But how do they know?",
  "Structure learning geographically: read, forget, scroll, repeat no more. Anchor news, markets, ideas to the map — so they stick better. Charlie Munger called it building a \"lattice work of mental models\"",
];

const Landing = () => {
  const heroRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const philosophyScrollContainerRef = useRef<HTMLDivElement>(null);
  const premiumScrollContainerRef = useRef<HTMLDivElement>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const scrollByAmount = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.8 : 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollPhilosophyByAmount = (direction: "left" | "right") => {
    if (philosophyScrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.8 : 400;
      philosophyScrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollPremiumByAmount = (direction: "left" | "right") => {
    if (premiumScrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 450;
      premiumScrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const heroSection = heroRef.current;
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavbarVisible(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  const scrollToWorkflow = () => {
    document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <Navbar isVisible={isNavbarVisible} />

      {/* Cinematic Intro Sections 1-5 */}
      <CinematicIntro />

      <div className="relative isolate">
        <AnimatedMapBackground />
        {/* Hero (Section 6) */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 z-10"
        >
          <div className="relative z-10 max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="flex flex-col gap-4 sm:gap-6 pt-6 sm:pt-12 lg:pt-0 w-full max-w-[90vw] sm:max-w-full">
              <Badge variant="secondary" className="w-fit text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-secondary text-muted-foreground border-border">
                Your second brain, mapped to the world
              </Badge>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Know the world.
                <br />
                <span className="text-gradient">Own the knowledge.</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg">
                Attach notes to any country or region. Track events, markets, history, and ideas — all on one interactive map.
              </p>
              <div className="flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-3 pt-2 max-w-xl">
                <Button
                  size="lg"
                  className="text-sm sm:text-base px-4 sm:px-5 h-12 sm:h-14 w-[17.2rem] sm:w-[18.5rem] whitespace-nowrap"
                  asChild
                >
                  <a href="https://mapmind.online">Start Mapping — It's Free</a>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-sm sm:text-base text-muted-foreground px-4 sm:px-5 h-12 sm:h-14 w-[17.2rem] sm:w-[18.5rem] whitespace-nowrap"
                  onClick={scrollToWorkflow}
                >
                  See how it works ↓
                </Button>
              </div>
            </div>
            {/* Right — video */}
            <div className="flex relative justify-center lg:justify-end mt-8 lg:mt-0 w-full">
              <HeroVideo />
            </div>
          </div>
        </section>

        {/* Social proof */}
        <div className="border-t border-b border-border/50 py-4 px-4 sm:px-6 text-center text-xs sm:text-sm text-muted-foreground">
          Used by students, analysts, and curious minds across — 🇵🇱 Poland &nbsp;·&nbsp; 🇮🇳 India &nbsp;·&nbsp; 🇺🇸 United States &nbsp;·&nbsp; 🇬🇭 Ghana &nbsp;·&nbsp; 🇹🇷 Turkey
        </div>

        {/* Problem / Solution */}
        <SectionWrapper>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-0">
            <div className="md:pr-12 md:border-r border-border/50">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Your knowledge is scattered.</h2>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                <li>Notes in random apps with no geographic context.</li>
                <li>No way to see connections between world events.</li>
                <li>Information is fragmented and hard to revisit.</li>
                <li>Revision feels like searching for needles in haystacks.</li>
              </ul>
            </div>
            <div className="md:pl-12">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">MapMind brings it all together.</h2>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                <li>Notes live on the map, right where they belong.</li>
                <li>Everything connected geographically and thematically.</li>
                <li>Visual memory — see patterns at a glance.</li>
                <li>Instant recall when you need it most.</li>
              </ul>
            </div>
          </div>
        </SectionWrapper>

        {/* Philosophy */}
        <section id="philosophy" className="relative py-16 sm:py-24 lg:py-28 border-y border-border/50 bg-background/70">
          <div className="relative w-full max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10 sm:mb-14">Philosophy</h2>

            <button
              onClick={() => scrollPhilosophyByAmount("left")}
              className="absolute left-2 sm:left-4 md:left-6 lg:left-8 xl:left-12 top-[58%] -translate-y-1/2 z-20 p-2 text-primary transition-colors duration-300"
              aria-label="Scroll philosophy left"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 drop-shadow-sm" />
            </button>

            <button
              onClick={() => scrollPhilosophyByAmount("right")}
              className="absolute right-2 sm:right-4 md:right-6 lg:right-8 xl:right-12 top-[58%] -translate-y-1/2 z-20 p-2 text-primary transition-colors duration-300"
              aria-label="Scroll philosophy right"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 drop-shadow-sm" />
            </button>

            <div
              ref={philosophyScrollContainerRef}
              className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scrollbar-thin px-4 sm:px-12 lg:px-24 xl:px-32"
            >
              {philosophySlides.map((question, index) => (
                <article
                  key={question}
                  className="w-full min-w-[85vw] sm:min-w-[60vw] md:min-w-[450px] lg:min-w-[480px] xl:min-w-[550px] max-w-[650px] snap-center flex flex-col items-center text-center shrink-0 transition-transform duration-500 ease-out hover:-translate-y-1"
                >
                  <div className="rounded-xl lg:rounded-2xl border border-primary/20 overflow-hidden shadow-2xl shadow-primary/10 mb-4 sm:mb-6 w-full bg-gradient-to-br from-secondary/50 via-background/80 to-secondary/30 backdrop-blur-xl group transition-all duration-500 ease-out hover:border-primary/35 hover:shadow-primary/20">
                    <div className="bg-secondary/35 border-b border-primary/10 flex items-center gap-1.5 px-4 py-2 lg:py-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    </div>
                    <div className="aspect-[4/3] sm:aspect-video relative overflow-hidden flex items-center justify-center px-6 sm:px-8 md:px-10 py-8 sm:py-10">
                      <p className={cn(
                        "font-semibold leading-tight tracking-tight text-foreground/95 group-hover:text-foreground transition-colors duration-500",
                        index === philosophySlides.length - 1
                          ? "text-base xs:text-lg sm:text-xl md:text-2xl"
                          : "text-2xl xs:text-3xl sm:text-4xl md:text-5xl"
                      )}>
                        {index === philosophySlides.length - 1 ? (
                          <span className="flex flex-col gap-4">
                            <span className="text-primary font-bold italic underline decoration-primary decoration-2 underline-offset-4 bg-primary/10 px-1 rounded-sm">
                              Charlie Munger called it building a "lattice work of mental models".
                            </span>
                            <span>Structure learning geographically: read, forget, scroll, repeat no more.</span>
                            <span>Anchor news, markets, ideas to the map — so they stick better.</span>
                          </span>
                        ) : index === 0 ? (
                          <>
                            Do you know <span className="text-primary">someone</span> who always knows <span className="text-primary">what's going on in the world?</span>
                          </>
                        ) : index === 1 || index === 2 ? (
                          <span className="flex flex-col items-center">
                            <span>{question}</span>
                            <span className="block mt-4 text-primary text-xl xs:text-2xl sm:text-3xl md:text-4xl">— they know</span>
                          </span>
                        ) : (
                          question
                        )}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="workflow" className="relative w-full border-y border-primary/10 bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden py-16 sm:py-24 lg:py-32 my-12 sm:my-24 shadow-[inset_0_0_100px_rgba(var(--primary),0.05)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="flex w-fit items-center justify-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4 mx-auto">
            How It Works
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-4 sm:mb-6 text-primary">From reading to remembering — in seconds</h2>
          <p className="text-center text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto mb-10 sm:mb-16 px-4">See how MapMind transforms scattered reading into a visual geographical knowledge web. Stop here—this is what your second brain looks like.</p>
          <div className="relative w-full max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-12">
            {/* Arrows */}
            <button 
              onClick={() => scrollByAmount("left")}
              className="absolute left-2 sm:left-4 md:left-6 lg:left-8 xl:left-12 top-1/2 -translate-y-1/2 z-20 p-2 text-primary transition-colors duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 drop-shadow-sm" />
            </button>

            <button 
              onClick={() => scrollByAmount("right")}
              className="absolute right-2 sm:right-4 md:right-6 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-20 p-2 text-primary transition-colors duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 drop-shadow-sm" />
            </button>


            <div 
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scrollbar-thin px-4 sm:px-12 lg:px-24 xl:px-32"
            >
              {steps.map((s, i) => (
                <div key={i} className="w-full min-w-[85vw] sm:min-w-[60vw] md:min-w-[450px] lg:min-w-[480px] xl:min-w-[550px] max-w-[650px] snap-center flex flex-col items-center text-center shrink-0 transition-transform duration-500 hover:scale-[1.02]">
                  <span className="text-xs lg:text-sm font-bold text-primary mb-3 sm:mb-4 tracking-widest uppercase shadow-sm">Step {i + 1}</span>
                  <div className="rounded-xl lg:rounded-2xl border border-primary/20 overflow-hidden shadow-2xl shadow-primary/5 mb-4 sm:mb-6 w-full bg-secondary/20 backdrop-blur-sm group">
                    <div className="bg-secondary/40 border-b border-primary/10 flex items-center gap-1.5 px-4 py-2 lg:py-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    </div>
                    <div className="aspect-[4/3] sm:aspect-video relative overflow-hidden bg-background/50 flex">
                      <ImageLightbox src={s.img} alt={s.title} className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-3">{s.title}</h3>
                  <p className="text-sm lg:text-base text-muted-foreground/90 max-w-sm lg:max-w-md">{s.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Import Callout */}
        <ImportCallout />

        {/* Who is this for */}
        <SectionWrapper>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14">Built for people who think in context</h2>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4 sm:gap-5">
            {personas.map((p) => (
              <div
                key={p.title}
                className="group rounded-lg sm:rounded-xl border border-border/50 bg-secondary/30 p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <p.icon className="w-5 h-5 text-primary mb-2 sm:mb-3" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Premium */}
        <section id="premium" className="relative w-full border-y border-primary/10 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden py-16 sm:py-24 lg:py-28">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="flex w-fit items-center justify-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4 mx-auto">
            Premium
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 text-primary">Premium Features for serious knowledge builders</h2>
          <p className="text-center text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto mb-10 sm:mb-14 px-4">
            Unlock advanced tools to publish your intelligence, build a deeper knowledge web, and scale your mapping system beyond the free tier.
          </p>

          <div className="relative w-full max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-12">
            <button
              onClick={() => scrollPremiumByAmount("left")}
              className="absolute left-2 sm:left-4 md:left-6 lg:left-8 xl:left-12 top-1/2 -translate-y-1/2 z-20 p-2 text-primary transition-colors duration-300"
              aria-label="Scroll premium features left"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 drop-shadow-sm" />
            </button>

            <button
              onClick={() => scrollPremiumByAmount("right")}
              className="absolute right-2 sm:right-4 md:right-6 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-20 p-2 text-primary transition-colors duration-300"
              aria-label="Scroll premium features right"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 drop-shadow-sm" />
            </button>

            <div
              ref={premiumScrollContainerRef}
              className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scrollbar-thin px-4 sm:px-12 lg:px-24 xl:px-32"
            >
              {premiumSlides.map((slide) => (
                <article
                  key={slide.number}
                  className="w-full min-w-[86vw] sm:min-w-[64vw] md:min-w-[620px] lg:min-w-[760px] xl:min-w-[860px] max-w-[920px] snap-center shrink-0 rounded-xl lg:rounded-2xl border border-primary/20 bg-secondary/20 p-4 sm:p-6 lg:p-7 shadow-2xl shadow-primary/5"
                >
                  <span className="text-xs lg:text-sm font-bold text-primary mb-2 tracking-widest uppercase block">Premium {slide.number}</span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-primary">{slide.number}. {slide.featureName}</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5">{slide.desc}</p>
                  <div className="rounded-lg border border-primary/15 overflow-hidden bg-background/40">
                    <div className="aspect-[16/9] relative bg-background/60">
                      <ImageLightbox
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <SectionWrapper id="features">
          <div className="flex w-fit items-center justify-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4 mx-auto">
            Features
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14 text-primary">Everything you need. Nothing you don't.</h2>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((f) => (
              <div key={f.name} className="rounded-lg sm:rounded-xl border border-border/50 bg-secondary/20 p-4 sm:p-6">
                <f.icon className="w-5 h-5 text-primary mb-2 sm:mb-3" />
                <h3 className="font-semibold text-sm sm:text-base mb-1">{f.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Testimonials */}
        <SectionWrapper id="testimonials">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14">From people who think for themselves</h2>
          <div className="relative max-w-6xl mx-auto">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-background to-transparent z-10 lg:hidden" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-background to-transparent z-10 lg:hidden" />
            <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible scrollbar-thin px-1">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="min-w-[280px] snap-center rounded-lg sm:rounded-xl border border-border/50 bg-secondary/20 p-4 sm:p-6 flex flex-col gap-4"
                >
                  <Quote className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-xs sm:text-sm italic text-muted-foreground leading-relaxed flex-1">"{t.quote}"</p>
                  <div className="text-xs sm:text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-muted-foreground">, {t.role} {t.flag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Final CTA */}
        <SectionWrapper className="text-center relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full bg-primary/5 blur-[120px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2">The world is happening.</h2>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 sm:mb-6">Start making sense of it.</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Free to use. No credit card. Start in 30 seconds.</p>
            <Button size="lg" className="text-sm sm:text-base px-6 sm:px-10" asChild>
              <a href="https://mapmind.online">Open MapMind →</a>
            </Button>
            <p className="text-xs text-muted-foreground/50 mt-4">mapmind.online</p>
          </div>
        </SectionWrapper>

        {/* Footer */}
        <footer className="border-t border-border/50 py-6 sm:py-8 px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-muted-foreground">
            <a href="https://mapmind.online" className="flex items-center gap-2 group shrink-0">
              <img src={logo} alt="MapMind" className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-base sm:text-lg font-bold tracking-tight text-foreground">MapMind</span>
            </a>
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-6">
              <a href="https://mapmind.online/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="https://mapmind.online/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
            <a href="mailto:sharmaasahil.09@gmail.com" className="hover:text-foreground transition-colors break-all xs:break-normal">
              sharmaasahil.09@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
