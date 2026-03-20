import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-modified.png";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#workflow" },
  { label: "Testimonials", href: "#testimonials" },
];

interface NavbarProps {
  isVisible?: boolean;
}

const Navbar = ({ isVisible = true }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-hidden={!isVisible}
      style={{ transitionDuration: "400ms" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 transition-[opacity,background-color,padding,border-color,box-shadow,backdrop-filter]",
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="https://mapmind.online" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="MapMind logo"
            className="w-9 h-9 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-lg font-bold tracking-tight font-display">MapMind</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Button size="sm" className="text-sm px-6" asChild>
          <a href="https://mapmind.online">Get Started</a>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
