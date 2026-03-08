const AnimatedMapBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.3]"
      style={{
        backgroundImage: "radial-gradient(hsl(210 100% 52%) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
};

export default AnimatedMapBackground;
