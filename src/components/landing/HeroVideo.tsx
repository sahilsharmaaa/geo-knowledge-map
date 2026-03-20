const HeroVideo = () => {
  return (
    <div className="relative w-full max-w-xl" style={{ perspective: "1200px" }}>
      <div
        className="rounded-lg border border-border/50 shadow-2xl overflow-hidden"
        style={{
          transform: "rotateY(-4deg) rotateX(2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Browser chrome */}
        <div className="bg-secondary/80 flex items-center gap-1.5 px-3 py-2 rounded-t-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          <span className="ml-3 text-[10px] text-muted-foreground/50 font-mono">
            mapmind.online
          </span>
        </div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full block rounded-b-lg"
          poster=""
        >
          <source src="/videos/Scene.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Glow */}
      <div className="absolute -inset-8 rounded-3xl bg-primary/5 blur-3xl -z-10" />
    </div>
  );
};

export default HeroVideo;
