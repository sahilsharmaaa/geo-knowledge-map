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
import logo from "@/assets/logo-modified.png";
import screenshotStep1 from "@/assets/screenshot-step1.png";
import screenshotStep2 from "@/assets/screenshot-step2.png";
import screenshotStep3 from "@/assets/screenshot-step3-new.png";
import screenshotStep4 from "@/assets/screenshot-step3.png";
import screenshotStep5 from "@/assets/screenshot-step4.png";
import screenshotStep6 from "@/assets/screenshot-step5.png";

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

const Landing = () => {
  const heroRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
            <div className="flex flex-col gap-4 sm:gap-6 pt-6 sm:pt-12 lg:pt-0">
              <Badge variant="secondary" className="w-fit text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-secondary text-muted-foreground border-border">
                Your second brain, mapped to the world
              </Badge>
              <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Know the world.
                <br />
                <span className="text-gradient">Own the knowledge.</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg">
                Attach notes to any country or region. Track events, markets, history, and ideas — all on one interactive map.
              </p>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-2">
                <Button size="lg" className="text-sm sm:text-base px-6 sm:px-8" asChild>
                  <a href="https://mapmind.online">Start Mapping — It's Free</a>
                </Button>
                <Button size="lg" variant="ghost" className="text-sm sm:text-base text-muted-foreground" onClick={scrollToWorkflow}>
                  See how it works ↓
                </Button>
              </div>
            </div>
            {/* Right — video - Hidden on small screens */}
            <div className="hidden sm:flex relative justify-center lg:justify-end">
              <HeroVideo />
            </div>
          </div>
        </section>

        {/* Social proof */}
        <div className="border-t border-b border-border/50 py-4 px-4 sm:px-6 text-center text-xs sm:text-sm text-muted-foreground">
          Used by students, analysts, and curious minds across — 🇮🇳 India &nbsp;·&nbsp; 🇺🇸 USA &nbsp;·&nbsp; 🇬🇧 UK &nbsp;·&nbsp; 🇸🇬 Singapore &nbsp;·&nbsp; 🇩🇪 Germany
        </div>

        {/* Problem / Solution */}
        <SectionWrapper>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-0">
            <div className="md:pr-12 md:border-r border-border/50">
              <h2 className="font-display text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Your knowledge is scattered.</h2>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                <li>Notes in random apps with no geographic context.</li>
                <li>No way to see connections between world events.</li>
                <li>Information is fragmented and hard to revisit.</li>
                <li>Revision feels like searching for needles in haystacks.</li>
              </ul>
            </div>
            <div className="md:pl-12">
              <h2 className="font-display text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">MapMind brings it all together.</h2>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                <li>Notes live on the map, right where they belong.</li>
                <li>Everything connected geographically and thematically.</li>
                <li>Visual memory — see patterns at a glance.</li>
                <li>Instant recall when you need it most.</li>
              </ul>
            </div>
          </div>
        </SectionWrapper>

        {/* How it works */}
        <SectionWrapper id="workflow">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14">From reading to remembering — in seconds</h2>
          <div className="relative max-w-6xl mx-auto px-1 sm:px-4">
            {/* Arrows */}
            <button 
              onClick={() => scrollByAmount("left")}
              className="absolute left-1 sm:-left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full bg-background/80 hover:bg-muted border border-border shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md text-foreground transition-all duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            <button 
              onClick={() => scrollByAmount("right")}
              className="absolute right-1 sm:-right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full bg-background/80 hover:bg-muted border border-border shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md text-foreground transition-all duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-10 md:w-16 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-10 md:w-16 bg-gradient-to-l from-background to-transparent z-10" />
            <div 
              ref={scrollContainerRef}
              className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
            >
              {steps.map((s, i) => (
                <div key={i} className="w-full min-w-full px-2 sm:px-4 snap-center flex flex-col items-center text-center shrink-0 sm:min-w-[50vw] sm:px-0 md:min-w-[400px] lg:min-w-[420px] max-w-[500px]">
                  <span className="text-xs font-semibold text-primary mb-2 sm:mb-3 tracking-widest uppercase">Step {i + 1}</span>
                  <div className="rounded-lg border border-border/50 overflow-hidden shadow-xl mb-3 sm:mb-5 w-full bg-secondary/20">
                    <div className="bg-secondary/80 flex items-center gap-1.5 px-3 py-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    </div>
                    <div className="aspect-[4/3] sm:aspect-video">
                      <ImageLightbox src={s.img} alt={s.title} className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">{s.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Import Callout */}
        <ImportCallout />

        {/* Who is this for */}
        <SectionWrapper>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14">Built for people who think in context</h2>
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

        {/* Features */}
        <SectionWrapper id="features">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14">Everything you need. Nothing you don't.</h2>
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
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14">From people who think for themselves</h2>
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
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2">The world is happening.</h2>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 sm:mb-6">Start making sense of it.</h2>
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
              <span className="font-semibold text-foreground font-display text-sm sm:text-base">MapMind</span>
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
