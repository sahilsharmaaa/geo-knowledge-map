import panoramicMap from "@/assets/panoramic-map.png";

const RotatingMapBackground = () => {
  return (
    <>
      {/* Full-screen panoramic map background */}
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
        style={{
          backgroundImage: `url(${panoramicMap})`,
          backgroundSize: "auto 100%",
          backgroundPosition: "0 center",
          backgroundRepeat: "repeat-x",
          backgroundAttachment: "scroll",
          filter: "blur(0.8px)",
          opacity: 0.95,
          animation: "panSlow 120s linear infinite",
          top: 0,
          left: 0,
        }}
      />

      {/* Vignette overlay - Strong darkening around edges */}
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(
              ellipse 60% 50% at 50% 50%,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.2) 40%,
              rgba(0, 0, 0, 0.5) 100%
            )
          `,
          mixBlendMode: "multiply",
        }}
      />

      {/* Top gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          background: `radial-gradient(
            ellipse 200% 150% at 50% 0%,
            transparent 0%,
            rgba(0, 0, 0, 0.4) 100%
          )`,
          top: 0,
          left: 0,
        }}
      />

      {/* Bottom gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          background: `radial-gradient(
            ellipse 200% 150% at 50% 100%,
            transparent 0%,
            rgba(0, 0, 0, 0.4) 100%
          )`,
          top: 0,
          left: 0,
        }}
      />

      {/* Panning animation */}
      <style>{`
        @keyframes panSlow {
          0% {
            background-position: 0 center;
          }
          100% {
            background-position: -100% center;
          }
        }
      `}</style>
    </>
  );
};

export default RotatingMapBackground;
