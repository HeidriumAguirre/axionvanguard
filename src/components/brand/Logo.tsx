type LogoProps = {
  className?: string;
  /** color de las líneas y tipografía del sello */
  tone?: "navy" | "gold" | "current";
  title?: string;
};

const TONES = {
  navy: "var(--navy-600)",
  gold: "var(--gold-500)",
  current: "currentColor",
} as const;

export function Logo({ className, tone = "navy", title = "Axion Vanguard" }: LogoProps) {
  const ink = TONES[tone];

  return (
    <svg
      viewBox="0 0 360 360"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      <defs>
        <path id="av-arc-top" d="M 48,180 A 132,132 0 0 1 312,180" fill="none" />
        <path id="av-arc-bottom" d="M 308,180 A 128,128 0 0 1 52,180" fill="none" />
      </defs>

      {/* Anillo exterior */}
      <circle cx="180" cy="180" r="174" fill="#ffffff" stroke={ink} strokeWidth="2.5" />
      {/* Anillo interior */}
      <circle cx="180" cy="180" r="131" fill="none" stroke={ink} strokeWidth="1.4" />

      {/* Texto superior */}
      <text
        fill={ink}
        fontFamily="var(--font-inter), sans-serif"
        fontSize="25"
        fontWeight={500}
        letterSpacing="7.5"
      >
        <textPath href="#av-arc-top" startOffset="50%" textAnchor="middle">
          AXION VANGUARD
        </textPath>
      </text>

      {/* Texto inferior */}
      <text
        fill={ink}
        fontFamily="var(--font-inter), sans-serif"
        fontSize="19"
        fontWeight={400}
        letterSpacing="6"
      >
        <textPath href="#av-arc-bottom" startOffset="50%" textAnchor="middle">
          REAL ESTATE
        </textPath>
      </text>

      {/* Estrellas laterales */}
      <g fill={ink}>
        <polygon
          transform="translate(27 180)"
          points="0,-12.5 2.94,-4.04 11.89,-3.87 4.78,1.54 7.35,10.13 0,5 -7.35,10.13 -4.78,1.54 -11.89,-3.87 -2.94,-4.04"
        />
        <polygon
          transform="translate(333 180)"
          points="0,-12.5 2.94,-4.04 11.89,-3.87 4.78,1.54 7.35,10.13 0,5 -7.35,10.13 -4.78,1.54 -11.89,-3.87 -2.94,-4.04"
        />
      </g>

      {/* Monograma AV */}
      <g fill={ink}>
        <text
          x="129"
          y="237"
          textAnchor="middle"
          fontFamily="var(--font-cormorant), Georgia, serif"
          fontSize="146"
          fontStyle="italic"
          fontWeight={500}
        >
          A
        </text>
        <text
          x="212"
          y="228"
          textAnchor="middle"
          fontFamily="var(--font-cormorant), Georgia, serif"
          fontSize="112"
          fontWeight={500}
        >
          V
        </text>
      </g>

      {/* Trazo de la A */}
      <path
        d="M 96 214 C 132 194, 196 180, 252 178"
        fill="none"
        stroke={ink}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Logo;
