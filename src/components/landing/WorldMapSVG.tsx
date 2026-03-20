const WorldMapSVG = () => (
  <svg
    viewBox="0 0 1200 600"
    className="absolute inset-0 w-full h-full opacity-[0.06]"
    fill="none"
    stroke="hsl(var(--primary))"
    strokeWidth="0.5"
  >
    {/* Simplified world map outlines */}
    {/* North America */}
    <path d="M150,120 L180,100 L220,95 L260,100 L290,110 L310,130 L320,160 L310,190 L280,210 L260,240 L250,270 L230,290 L200,300 L180,280 L160,250 L140,220 L130,190 L135,160 Z" />
    {/* South America */}
    <path d="M230,310 L260,300 L280,320 L290,350 L300,380 L295,420 L280,450 L260,480 L240,500 L220,490 L210,460 L200,420 L205,380 L210,350 Z" />
    {/* Europe */}
    <path d="M480,100 L510,90 L540,95 L570,100 L590,110 L600,130 L590,150 L570,160 L540,165 L510,160 L490,150 L480,130 Z" />
    {/* Africa */}
    <path d="M500,180 L540,170 L570,180 L590,210 L600,250 L595,300 L580,350 L560,390 L530,410 L500,400 L480,370 L470,330 L465,290 L470,250 L480,210 Z" />
    {/* Asia */}
    <path d="M620,80 L680,70 L740,75 L800,80 L860,90 L900,110 L920,140 L910,170 L880,190 L840,200 L790,210 L740,200 L700,190 L660,170 L640,150 L620,120 Z" />
    {/* Russia */}
    <path d="M560,60 L620,50 L700,45 L780,50 L860,55 L940,65 L1000,75 L1020,90 L1000,100 L940,95 L860,90 L780,80 L700,75 L620,80 L580,75 Z" />
    {/* Australia */}
    <path d="M840,350 L880,340 L920,345 L950,360 L960,390 L950,420 L920,440 L880,445 L850,430 L835,400 L830,370 Z" />
    {/* India */}
    <path d="M720,200 L750,190 L770,210 L775,240 L760,270 L740,290 L720,280 L710,250 L715,220 Z" />
    {/* Middle East */}
    <path d="M600,160 L630,150 L660,160 L670,180 L660,200 L630,210 L610,200 L600,180 Z" />
    {/* Japan/Korea */}
    <path d="M920,120 L940,115 L955,125 L960,145 L950,160 L935,165 L920,155 L915,140 Z" />
    {/* Southeast Asia */}
    <path d="M800,220 L840,210 L870,225 L880,250 L870,280 L840,300 L810,290 L795,260 L790,240 Z" />
    {/* Greenland */}
    <path d="M340,50 L380,40 L410,45 L420,65 L410,80 L380,85 L350,75 Z" />
    {/* Additional detail lines */}
    <path d="M100,150 Q200,140 300,170 Q400,200 500,160" strokeDasharray="4 8" opacity="0.5" />
    <path d="M500,300 Q600,280 700,300 Q800,320 900,290" strokeDasharray="4 8" opacity="0.5" />
    <path d="M200,400 Q400,380 600,400 Q800,420 1000,390" strokeDasharray="4 8" opacity="0.3" />
  </svg>
);

export default WorldMapSVG;
