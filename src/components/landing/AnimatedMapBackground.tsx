import { useEffect, useRef } from "react";

const paths = [
  // North America
  "M150,120 L180,100 L220,95 L260,100 L290,110 L310,130 L320,160 L310,190 L280,210 L260,240 L250,270 L230,290 L200,300 L180,280 L160,250 L140,220 L130,190 L135,160 Z",
  // South America
  "M230,310 L260,300 L280,320 L290,350 L300,380 L295,420 L280,450 L260,480 L240,500 L220,490 L210,460 L200,420 L205,380 L210,350 Z",
  // Europe
  "M480,100 L510,90 L540,95 L570,100 L590,110 L600,130 L590,150 L570,160 L540,165 L510,160 L490,150 L480,130 Z",
  // Africa
  "M500,180 L540,170 L570,180 L590,210 L600,250 L595,300 L580,350 L560,390 L530,410 L500,400 L480,370 L470,330 L465,290 L470,250 L480,210 Z",
  // Asia
  "M620,80 L680,70 L740,75 L800,80 L860,90 L900,110 L920,140 L910,170 L880,190 L840,200 L790,210 L740,200 L700,190 L660,170 L640,150 L620,120 Z",
  // Russia
  "M560,60 L620,50 L700,45 L780,50 L860,55 L940,65 L1000,75 L1020,90 L1000,100 L940,95 L860,90 L780,80 L700,75 L620,80 L580,75 Z",
  // Australia
  "M840,350 L880,340 L920,345 L950,360 L960,390 L950,420 L920,440 L880,445 L850,430 L835,400 L830,370 Z",
  // India
  "M720,200 L750,190 L770,210 L775,240 L760,270 L740,290 L720,280 L710,250 L715,220 Z",
  // Middle East
  "M600,160 L630,150 L660,160 L670,180 L660,200 L630,210 L610,200 L600,180 Z",
  // Japan
  "M920,120 L940,115 L955,125 L960,145 L950,160 L935,165 L920,155 L915,140 Z",
  // Southeast Asia
  "M800,220 L840,210 L870,225 L880,250 L870,280 L840,300 L810,290 L795,260 L790,240 Z",
  // Greenland
  "M340,50 L380,40 L410,45 L420,65 L410,80 L380,85 L350,75 Z",
  // Central America
  "M180,260 L200,255 L215,270 L210,290 L195,300 L180,295 L175,275 Z",
  // Scandinavia
  "M510,55 L530,45 L550,50 L555,70 L545,85 L525,90 L510,80 Z",
  // Indonesia
  "M820,310 L850,305 L880,310 L900,320 L890,335 L860,340 L830,335 L815,325 Z",
  // Madagascar
  "M620,380 L635,375 L640,395 L635,415 L620,410 L615,395 Z",
  // UK/Ireland
  "M460,90 L475,85 L480,100 L475,110 L462,108 L455,98 Z",
  // New Zealand
  "M970,440 L980,435 L988,445 L985,460 L975,465 L968,455 Z",
];

// Extra detail lines
const detailLines = [
  "M100,150 Q200,140 300,170 Q400,200 500,160",
  "M500,300 Q600,280 700,300 Q800,320 900,290",
  "M200,400 Q400,380 600,400 Q800,420 1000,390",
  "M300,100 Q500,80 700,110 Q900,140 1100,100",
  "M150,350 Q350,330 550,360 Q750,390 950,350",
  "M400,450 Q600,430 800,460 Q1000,490 1100,450",
];

const AnimatedMapBackground = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const allPaths = svg.querySelectorAll<SVGPathElement>(".map-path");
    allPaths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.animation = `drawLine ${4 + (i % 3) * 2}s ease-in-out ${i * 0.6}s infinite alternate`;
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style>{`
        @keyframes drawLine {
          0% { stroke-dashoffset: var(--path-length); opacity: 0; }
          15% { opacity: 1; }
          50% { stroke-dashoffset: 0; opacity: 0.6; }
          85% { opacity: 1; }
          100% { stroke-dashoffset: calc(var(--path-length) * -1); opacity: 0; }
        }
        .map-path {
          will-change: stroke-dashoffset, opacity;
        }
      `}</style>
      <svg
        ref={svgRef}
        viewBox="0 0 1200 600"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Ambient glow */}
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(210 100% 52%)" stopOpacity="0.03" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="1200" height="600" fill="url(#mapGlow)" />

        {/* Country borders */}
        {paths.map((d, i) => (
          <path
            key={`border-${i}`}
            d={d}
            className="map-path"
            stroke="hsl(210 100% 52%)"
            strokeWidth="0.4"
            opacity="0"
            filter="url(#glow)"
            style={{ "--path-length": "2000" } as React.CSSProperties}
          />
        ))}

        {/* Detail/connection lines */}
        {detailLines.map((d, i) => (
          <path
            key={`detail-${i}`}
            d={d}
            className="map-path"
            stroke="hsl(210 100% 52%)"
            strokeWidth="0.3"
            strokeDasharray="4 8"
            opacity="0"
            style={{ "--path-length": "1500" } as React.CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedMapBackground;
