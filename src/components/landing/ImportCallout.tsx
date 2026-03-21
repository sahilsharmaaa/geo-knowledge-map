import { ArrowRightLeft, FileUp, Database, CheckCircle2, Chrome, Sparkles, Bot, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ImageLightbox from "./ImageLightbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SectionWrapper from "./SectionWrapper";
import extension1 from "@/assets/extension-1.png";
import extension2 from "@/assets/extension-2.png";
import importPreview from "@/assets/import-preview.png";
import gpt1 from "@/assets/gpt-1.png";
import gpt2 from "@/assets/gpt-2.png";
import gpt21 from "@/assets/gpt-2-1.png";
import gpt3 from "@/assets/gpt-3.png";
import gpt4 from "@/assets/gpt-4.png";

const benefits = [
  { icon: FileUp, text: "Import notes from Notion, Evernote, or plain text" },
  { icon: Database, text: "Bring your existing research — nothing gets left behind" },
  { icon: CheckCircle2, text: "Up and running in under a minute" },
];

const extensionSteps = [
  { img: extension1, label: "Click the extension on any article" },
  { img: extension2, label: "It extracts and structures the content" },
  { img: importPreview, label: "Review and import into MapMind" },
];

const gptSteps = [
  { img: gpt1, label: "Click 'Open MapMind Note Importer' to launch the custom GPT" },
  { img: gpt2, label: "Paste your article or notes — ChatGPT structures them automatically" },
  { img: gpt21, label: "Copy the structured JSON output from ChatGPT" },
  { img: gpt3, label: "Back in MapMind, paste the JSON and hit Validate" },
  { img: gpt4, label: "Preview your notes and import them in one click" },
];

const ImportCallout = () => {
  const gptScrollRef = useRef<HTMLDivElement>(null);
  const extScrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.8 : 400;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Main Import CTA */}
      <SectionWrapper>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-6 rounded-3xl bg-primary/5 blur-3xl pointer-events-none" />
          <div className="relative rounded-xl sm:rounded-2xl border border-primary/20 bg-secondary/40 backdrop-blur-sm overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="p-5 sm:p-8 md:p-12 flex flex-col lg:flex-row items-center gap-6 sm:gap-10">
              <div className="shrink-0 flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-lg sm:rounded-2xl bg-primary/10 border border-primary/20">
                <ArrowRightLeft className="w-7 sm:w-9 h-7 sm:h-9 text-primary" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1 sm:mb-2">
                  Seamless Switch
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
                  Your data comes with you.
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 max-w-lg mx-auto lg:mx-0">
                  Already have notes scattered across other tools? Import everything in one click — no copy-pasting, no starting over. Pick up exactly where you left off.
                </p>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {benefits.map((b) => (
                    <li key={b.text} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                      <b.icon className="w-3 sm:w-4 h-3 sm:h-4 text-primary shrink-0" />
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="text-xs sm:text-base px-5 sm:px-8" asChild>
                  <a href="https://mapmind.online">Start Importing — Free →</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* GPT Import Flow */}
      <SectionWrapper>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              AI-Powered Import
            </div>
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">Import with ChatGPT — zero effort</h2>
            <p className="text-xs sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
              Use our custom GPT to turn any article, newsletter, or your existing notes into perfectly structured MapMind entries. Just paste, and it does the rest.
            </p>
          </div>

          <div className="relative group">
            {/* Arrows */}
            <button 
              onClick={() => scrollByAmount(gptScrollRef, "left")}
              className="absolute left-0 sm:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-20 p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 opacity-70 hover:opacity-100 drop-shadow-sm" />
            </button>

            <button 
              onClick={() => scrollByAmount(gptScrollRef, "right")}
              className="absolute right-0 sm:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-20 p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 opacity-70 hover:opacity-100 drop-shadow-sm" />
            </button>


            <div ref={gptScrollRef} className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin px-2 sm:px-1">
              {gptSteps.map((step, i) => (
                <div key={i} className="min-w-[280px] sm:min-w-[320px] max-w-[420px] snap-center shrink-0 flex flex-col items-center text-center">
                  <span className="text-xs font-semibold text-primary mb-2 sm:mb-3 tracking-widest uppercase">Step {i + 1}</span>
                  <div className="rounded-lg sm:rounded-xl border border-border/50 overflow-hidden shadow-xl mb-3 sm:mb-4 w-full bg-secondary/20">
                    <div className="bg-secondary/80 flex items-center gap-1.5 px-3 py-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    </div>
                    <ImageLightbox src={step.img} alt={step.label} className="block h-auto w-full object-contain" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Chrome Extension Showcase */}
      <SectionWrapper>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4">
              <Chrome className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              Chrome Extension
            </div>
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">Import from any webpage — instantly</h2>
            <p className="text-xs sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
              Our Chrome extension sits right in your browser. Click it on any article, newsletter, or webpage — it extracts the content, structures it into notes, and imports directly into MapMind.
            </p>
          </div>

          <div className="relative group">
            {/* Arrows */}
            <button 
              onClick={() => scrollByAmount(extScrollRef, "left")}
              className="absolute left-0 sm:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-20 p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 opacity-70 hover:opacity-100 drop-shadow-sm" />
            </button>

            <button 
              onClick={() => scrollByAmount(extScrollRef, "right")}
              className="absolute right-0 sm:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-20 p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 opacity-70 hover:opacity-100 drop-shadow-sm" />
            </button>


            <div ref={extScrollRef} className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin px-2 sm:px-1">
              {extensionSteps.map((step, i) => (
                <div key={i} className="min-w-[280px] sm:min-w-[320px] max-w-[420px] snap-center shrink-0 flex flex-col items-center text-center">
                  <span className="text-xs font-semibold text-primary mb-2 sm:mb-3 tracking-widest uppercase">Step {i + 1}</span>
                  <div className="rounded-lg sm:rounded-xl border border-border/50 overflow-hidden shadow-xl mb-3 sm:mb-4 w-full bg-secondary/20">
                    <div className="bg-secondary/80 flex items-center gap-1.5 px-3 py-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    </div>
                    <ImageLightbox src={step.img} alt={step.label} className="block h-auto w-full object-contain" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="text-xs sm:text-base px-5 sm:px-8">
                  Install Chrome Extension →
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Find the extension ZIP in MapMind</DialogTitle>
                  <DialogDescription className="leading-relaxed text-xs sm:text-sm">
                    Go to <span className="text-foreground">Profile -&gt; Import/Export</span>, then scroll to the bottom to find the extension ZIP folder.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Got it</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default ImportCallout;
