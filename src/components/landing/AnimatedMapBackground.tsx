import { useEffect, useRef } from "react";

// Realistic simplified world map paths (Mercator-style)
const continentPaths = [
  // North America mainland
  "M120,95 L135,88 L155,82 L175,78 L195,80 L215,78 L235,82 L250,80 L265,85 L275,78 L285,82 L295,90 L298,100 L295,108 L288,115 L278,122 L270,130 L265,138 L258,145 L252,155 L248,165 L242,172 L235,178 L228,182 L220,180 L212,175 L205,168 L198,172 L192,178 L185,185 L178,188 L172,192 L168,200 L165,208 L160,215 L155,220 L148,218 L142,212 L138,205 L135,195 L130,185 L125,175 L122,165 L118,155 L115,145 L112,135 L115,125 L118,115 L120,105 Z",
  // Alaska
  "M80,75 L95,68 L110,65 L120,70 L125,78 L120,85 L110,88 L98,85 L88,82 Z",
  // Central America
  "M165,220 L170,225 L175,232 L178,240 L175,248 L170,255 L168,262 L172,268 L178,272 L182,278 L185,285 L180,288 L175,285 L170,278 L165,272 L162,265 L160,258 L158,250 L160,242 L162,235 L163,228 Z",
  // South America
  "M185,290 L195,285 L208,288 L218,295 L228,305 L235,318 L240,332 L242,348 L240,365 L235,380 L228,395 L222,408 L218,420 L215,435 L210,448 L205,458 L198,465 L192,470 L188,462 L185,450 L182,438 L180,425 L178,410 L175,395 L172,380 L170,365 L168,350 L170,335 L172,320 L175,308 L178,298 Z",
  // Europe
  "M470,72 L478,68 L488,65 L498,68 L508,72 L518,70 L528,68 L535,72 L540,78 L545,85 L548,92 L545,100 L540,108 L535,115 L528,118 L520,120 L512,122 L505,125 L498,128 L492,132 L488,128 L482,122 L478,115 L475,108 L472,100 L468,92 L465,85 L468,78 Z",
  // Scandinavia
  "M500,38 L508,35 L515,38 L520,45 L522,55 L518,62 L512,68 L505,65 L498,58 L495,48 L498,42 Z",
  // UK & Ireland
  "M455,68 L462,65 L468,70 L465,78 L460,82 L455,78 L452,72 Z",
  // Africa
  "M478,148 L488,142 L498,138 L510,135 L522,138 L532,142 L540,148 L548,158 L555,168 L560,180 L562,195 L560,210 L558,228 L555,245 L550,262 L545,278 L538,295 L530,310 L522,322 L515,332 L508,340 L500,345 L492,342 L485,335 L478,325 L472,312 L468,298 L465,282 L462,265 L460,248 L458,230 L460,212 L462,195 L465,178 L468,165 L472,155 Z",
  // Madagascar
  "M572,315 L578,310 L582,318 L580,330 L575,338 L570,332 L568,322 Z",
  // Middle East
  "M555,130 L568,125 L580,128 L590,135 L595,145 L592,155 L585,162 L578,165 L570,168 L562,165 L555,158 L550,148 L548,138 Z",
  // India
  "M635,155 L648,148 L658,152 L665,162 L668,175 L665,190 L658,205 L650,215 L642,222 L635,218 L628,208 L625,195 L622,180 L625,168 L628,160 Z",
  // Southeast Asia
  "M680,195 L692,188 L702,192 L710,200 L715,212 L712,225 L705,235 L698,240 L690,238 L682,232 L678,222 L675,210 Z",
  // China/East Asia
  "M650,85 L668,78 L688,75 L708,78 L728,82 L745,88 L758,98 L765,110 L762,122 L755,132 L745,140 L732,145 L718,148 L705,145 L692,140 L680,135 L668,128 L658,118 L650,108 L648,98 Z",
  // Japan
  "M775,95 L782,90 L788,95 L790,105 L788,115 L782,120 L775,118 L772,110 L770,102 Z",
  // Korea
  "M760,98 L765,95 L770,100 L768,110 L762,112 L758,105 Z",
  // Russia/Siberia
  "M535,45 L560,38 L590,32 L625,28 L660,25 L700,22 L740,25 L780,28 L820,32 L855,38 L880,45 L900,52 L910,60 L905,68 L895,72 L878,70 L858,65 L835,60 L808,55 L778,52 L748,50 L718,48 L688,48 L658,50 L628,52 L598,55 L568,58 L545,60 L535,55 Z",
  // Australia
  "M720,340 L742,332 L765,328 L788,332 L808,340 L822,352 L828,368 L825,385 L818,398 L805,408 L790,415 L772,418 L755,415 L740,408 L728,398 L720,385 L715,368 L715,352 Z",
  // New Zealand
  "M842,400 L848,395 L852,402 L850,412 L845,418 L840,412 L838,405 Z",
  // Indonesia archipelago
  "M695,260 L708,255 L720,258 L732,255 L745,258 L755,262 L762,268 L758,275 L748,278 L735,275 L722,278 L710,275 L700,272 L695,268 Z",
  // Greenland
  "M310,28 L328,22 L348,20 L365,25 L375,35 L372,48 L362,55 L348,58 L332,55 L320,48 L312,38 Z",
  // Caribbean islands (small marks)
  "M195,215 L200,212 L205,215 L202,220 L197,220 Z",
  // Sri Lanka
  "M648,225 L652,222 L655,228 L652,235 L648,232 Z",
  // Philippines
  "M728,195 L732,190 L736,195 L735,205 L730,208 L726,202 Z",
  // Taiwan
  "M738,148 L742,145 L745,150 L743,158 L738,155 Z",
];

// Subtle latitude/longitude grid lines
const gridLines = [
  // Equator
  "M50,250 L950,250",
  // Tropics
  "M50,195 L950,195",
  "M50,305 L950,305",
  // Arctic/Antarctic
  "M50,65 L950,65",
  "M50,435 L950,435",
  // Some longitude lines
  "M250,20 L250,470",
  "M500,20 L500,470",
  "M750,20 L750,470",
];

const AnimatedMapBackground = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>(".continent-line");
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style>{`
        @keyframes traceBorder {
          0% { stroke-dashoffset: var(--len); opacity: 0; }
          5% { opacity: 0.4; }
          50% { stroke-dashoffset: 0; opacity: 0.4; }
          95% { opacity: 0.4; }
          100% { stroke-dashoffset: calc(var(--len) * -1); opacity: 0; }
        }
        .continent-line {
          will-change: stroke-dashoffset;
          animation: traceBorder var(--dur) ease-in-out var(--delay) infinite;
        }
      `}</style>
      <svg
        ref={svgRef}
        viewBox="0 0 1000 500"
        className="w-full h-full opacity-[0.07]"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Grid lines — very faint */}
        {gridLines.map((d, i) => (
          <path
            key={`grid-${i}`}
            d={d}
            stroke="hsl(210 100% 52%)"
            strokeWidth="0.2"
            opacity="0.3"
            strokeDasharray="2 6"
          />
        ))}

        {/* Country/continent borders */}
        {continentPaths.map((d, i) => (
          <path
            key={`c-${i}`}
            d={d}
            className="continent-line"
            stroke="hsl(210 100% 60%)"
            strokeWidth="0.6"
            strokeLinejoin="round"
            style={{
              "--len": "3000",
              "--dur": `${18 + (i % 5) * 4}s`,
              "--delay": `${i * 1.2}s`,
            } as React.CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedMapBackground;
