import { ArrowRightLeft, FileUp, Database, CheckCircle2, Chrome, Sparkles, Bot } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import { Button } from "@/components/ui/button";
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
  return (
    <>
      {/* Main Import CTA */}
      <SectionWrapper>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-6 rounded-3xl bg-primary/5 blur-3xl pointer-events-none" />
          <div className="relative rounded-2xl border border-primary/20 bg-secondary/40 backdrop-blur-sm overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-10">
              <div className="shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20">
                <ArrowRightLeft className="w-9 h-9 text-primary" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                  Seamless Switch
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  Your data comes with you.
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto lg:mx-0">
                  Already have notes scattered across other tools? Import everything in one click — no copy-pasting, no starting over. Pick up exactly where you left off.
                </p>
                <ul className="space-y-3 mb-8">
                  {benefits.map((b) => (
                    <li key={b.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <b.icon className="w-4 h-4 text-primary shrink-0" />
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="text-base px-8" asChild>
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
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Import
            </div>
            <h2 className="text-3xl font-bold mb-3">Import with ChatGPT — zero effort</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Use our custom GPT to turn any article, newsletter, or your existing notes into perfectly structured MapMind entries. Just paste, and it does the rest.
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin px-1">
              {gptSteps.map((step, i) => (
                <div key={i} className="min-w-[300px] max-w-[380px] snap-center shrink-0 flex flex-col items-center text-center">
                  <span className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Step {i + 1}</span>
                  <div className="rounded-xl border border-border/50 overflow-hidden shadow-xl mb-4 w-full bg-secondary/20">
                    <div className="bg-secondary/80 flex items-center gap-1.5 px-3 py-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    </div>
                    <div className="aspect-[4/3]">
                      <ImageLightbox src={step.img} alt={step.label} className="w-full h-full object-cover object-top" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Chrome Extension Showcase */}
      <SectionWrapper>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              <Chrome className="w-3.5 h-3.5" />
              Chrome Extension
            </div>
            <h2 className="font-display text-3xl font-bold mb-3">Import from any webpage — instantly</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our Chrome extension sits right in your browser. Click it on any article, newsletter, or webpage — it extracts the content, structures it into notes, and imports directly into MapMind.
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin px-1">
              {extensionSteps.map((step, i) => (
                <div key={i} className="min-w-[300px] max-w-[380px] snap-center shrink-0 flex flex-col items-center text-center">
                  <span className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Step {i + 1}</span>
                  <div className="rounded-xl border border-border/50 overflow-hidden shadow-xl mb-4 w-full bg-secondary/20">
                    <div className="aspect-[4/3]">
                      <ImageLightbox src={step.img} alt={step.label} className="w-full h-full object-cover object-top" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Button size="lg" className="text-base px-8" asChild>
              <a href="https://chromewebstore.google.com" target="_blank" rel="noopener noreferrer">
                Install Chrome Extension →
              </a>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default ImportCallout;
