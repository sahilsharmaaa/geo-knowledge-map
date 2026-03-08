import { Globe, Link2, Tags, Network, Share2, Flame, Newspaper, TrendingUp, BookOpen, Lightbulb, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WorldMapSVG from "@/components/landing/WorldMapSVG";
import SectionWrapper from "@/components/landing/SectionWrapper";
import screenshotHero from "@/assets/screenshot-hero.png";
import screenshotStep1 from "@/assets/screenshot-step1.png";
import screenshotStep2 from "@/assets/screenshot-step2.png";
import screenshotStep3 from "@/assets/screenshot-step3.png";

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
  { img: screenshotStep3, title: "See your knowledge grow", caption: "Watch your map fill up. Every country you study lights up. Every connection becomes visible." },
];

const Landing = () => {
  const scrollToWorkflow = () => {
    document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
        <WorldMapSVG />
        <div className="relative z-10 max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div className="flex flex-col gap-6 pt-12 lg:pt-0">
            <Badge variant="secondary" className="w-fit text-xs px-4 py-1.5 rounded-full bg-secondary text-muted-foreground border-border">
              Your second brain, mapped to the world
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Know the world.
              <br />
              <span className="text-gradient">Own the knowledge.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Attach notes to any country or region. Track events, markets, history, and ideas — all on one interactive map.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" className="text-base px-8" asChild>
                <a href="https://mapmind.online">Start Mapping — It's Free</a>
              </Button>
              <Button size="lg" variant="ghost" className="text-base text-muted-foreground" onClick={scrollToWorkflow}>
                See how it works ↓
              </Button>
            </div>
          </div>
          {/* Right — screenshot */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl" style={{ perspective: "1200px" }}>
              <div
                className="rounded-lg border border-border/50 overflow-hidden shadow-2xl"
                style={{ transform: "rotateY(-4deg) rotateX(2deg)" }}
              >
                {/* Browser chrome */}
                <div className="bg-secondary/80 flex items-center gap-1.5 px-3 py-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="ml-3 text-[10px] text-muted-foreground/50 font-mono">mapmind.online</span>
                </div>
                <img src={screenshotHero} alt="MapMind app showing world map with notes" className="w-full block" />
              </div>
              {/* Glow */}
              <div className="absolute -inset-8 rounded-3xl bg-primary/5 blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <div className="border-t border-b border-border/50 py-4 px-6 text-center text-sm text-muted-foreground">
        Used by students, analysts, and curious minds across — 🇮🇳 India &nbsp;·&nbsp; 🇺🇸 USA &nbsp;·&nbsp; 🇬🇧 UK &nbsp;·&nbsp; 🇸🇬 Singapore &nbsp;·&nbsp; 🇩🇪 Germany
      </div>

      {/* Problem / Solution */}
      <SectionWrapper>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-0">
          <div className="md:pr-12 md:border-r border-border/50">
            <h2 className="text-2xl font-semibold mb-6">Your knowledge is scattered.</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li>Notes in random apps with no geographic context.</li>
              <li>No way to see connections between world events.</li>
              <li>Information is fragmented and hard to revisit.</li>
              <li>Revision feels like searching for needles in haystacks.</li>
            </ul>
          </div>
          <div className="md:pl-12">
            <h2 className="text-2xl font-semibold mb-6">MapMind brings it all together.</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li>Notes live on the map, right where they belong.</li>
              <li>Everything connected geographically and thematically.</li>
              <li>Visual memory — see patterns at a glance.</li>
              <li>Instant recall when you need it most.</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Who is this for */}
      <SectionWrapper>
        <h2 className="text-3xl font-bold text-center mb-14">Built for people who think in context</h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5">
          {personas.map((p) => (
            <div
              key={p.title}
              className="group rounded-xl border border-border/50 bg-secondary/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <p.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* How it works */}
      <SectionWrapper id="workflow">
        <h2 className="text-3xl font-bold text-center mb-14">From reading to remembering — in seconds</h2>
        <div className="relative max-w-6xl mx-auto">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin px-4">
            {steps.map((s, i) => (
              <div key={i} className="min-w-[75vw] sm:min-w-[50vw] md:min-w-[400px] lg:min-w-[420px] max-w-[500px] snap-center flex flex-col items-center text-center shrink-0">
                <span className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Step {i + 1}</span>
                <div className="rounded-lg border border-border/50 overflow-hidden shadow-xl mb-5 w-full">
                  <div className="bg-secondary/80 flex items-center gap-1.5 px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  </div>
                  <img src={s.img} alt={s.title} className="w-full block" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">{s.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Features */}
      <SectionWrapper>
        <h2 className="text-3xl font-bold text-center mb-14">Everything you need. Nothing you don't.</h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.name} className="rounded-xl border border-border/50 bg-secondary/20 p-6">
              <f.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold mb-1">{f.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper>
        <h2 className="text-3xl font-bold text-center mb-14">From people who think for themselves</h2>
        <div className="relative max-w-6xl mx-auto">
          {/* Fade edges on mobile to hint at scrollable content */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 lg:hidden" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 lg:hidden" />
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible scrollbar-thin px-1">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="min-w-[280px] snap-center rounded-xl border border-border/50 bg-secondary/20 p-6 flex flex-col gap-4"
              >
                <Quote className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm italic text-muted-foreground leading-relaxed flex-1">"{t.quote}"</p>
                <div className="text-sm">
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
          <div className="w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2">The world is happening.</h2>
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">Start making sense of it.</h2>
          <p className="text-muted-foreground mb-8">Free to use. No credit card. Start in 30 seconds.</p>
          <Button size="lg" className="text-base px-10" asChild>
            <a href="https://mapmind.online">Open MapMind →</a>
          </Button>
          <p className="text-xs text-muted-foreground/50 mt-4">mapmind.online</p>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">MapMind</span>
          <span>Built independently with care.</span>
          <a href="mailto:sharmaasahil.09@gmail.com" className="hover:text-foreground transition-colors">
            sharmaasahil.09@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
