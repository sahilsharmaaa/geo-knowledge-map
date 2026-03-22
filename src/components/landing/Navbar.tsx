import { Button } from "@/components/ui/button";
import logo from "@/assets/Circle_Logo.png";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <nav
      aria-hidden={!isVisible}
      style={{ transitionDuration: "400ms" }}
      className={cn(
        "fixed left-0 right-0 z-50 mx-auto overflow-hidden transition-all duration-300 ease-out",
        "w-[96%] sm:w-[92%] md:w-[85%] lg:w-[80%] max-w-6xl rounded-full border border-border/40",
        isVisible ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4",
        scrolled
          ? "top-4 py-2 sm:py-2.5 px-4 sm:px-6 md:px-8 bg-background/45 backdrop-blur-xl shadow-lg shadow-primary/5"
          : "top-4 sm:top-6 py-3 sm:py-4 px-4 sm:px-6 md:px-8 bg-background/30 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="https://mapmind.online" className="flex items-center gap-2.5 group shrink-0">
          <img
            src={logo}
            alt="MapMind logo"
            className="w-8 sm:w-9 h-8 sm:h-9 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-base sm:text-lg font-bold tracking-tight">MapMind</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center p-2 rounded-full hover:bg-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground hover:text-primary" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground hover:text-primary" />
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>

        {/* Desktop CTA Button */}
        <Button size="sm" className="hidden md:inline-flex text-sm px-6" asChild>
          <a href="https://mapmind.online">Get Started</a>
        </Button>

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden absolute top-[calc(100%+0.5rem)] left-0 right-0 rounded-2xl bg-background/95 backdrop-blur-xl border border-border/50 animate-in slide-in-from-top-2 overflow-hidden shadow-2xl">
          <div className="py-4 px-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="w-full text-sm" asChild>
              <a href="https://mapmind.online">Get Started</a>
            </Button>

            <div className="pt-2 flex items-center justify-between border-t border-border/50">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center p-2 rounded-full border border-border/50 hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground" />
                <Moon className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground" />
                <span className="sr-only">Toggle theme</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-primary transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </nav>
  );
};

export default Navbar;
