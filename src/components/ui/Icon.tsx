import type { SVGProps } from "react";

const paths = {
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4.5 4.5",
  map: "M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4zM9 4v13M15 6.5v13",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  heart: "M12 20s-7.5-4.7-7.5-9.6A4.4 4.4 0 0 1 12 7.5a4.4 4.4 0 0 1 7.5 2.9C19.5 15.3 12 20 12 20z",
  bed: "M3 18v-9h11a4 4 0 0 1 4 4v5M3 13h15M6 9V7h4v2M3 18h18",
  bath: "M4 11h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM7 11V6a2 2 0 0 1 4 0M6 21l-1 1M18 21l1 1",
  car: "M4 16v-3l2-5h12l2 5v3M4 16h16M4 16v2h3v-2M17 16v2h3v-2M7 12h10",
  ruler: "M3 15 15 3l6 6L9 21 3 15zM7 11l2 2M10 8l2 2M13 5l2 2",
  phone:
    "M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z",
  whatsapp:
    "M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zm0 2a7 7 0 1 1-3.6 13l-.3-.2-2.5.7.7-2.4-.2-.3A7 7 0 0 1 12 5zm-3 3.2c-.2 0-.4 0-.6.3-.2.3-.7.7-.7 1.7s.8 2 .9 2.1c.1.2 1.5 2.4 3.8 3.2 1.9.7 2.3.6 2.7.5.4-.1 1.3-.5 1.5-1 .2-.5.2-1 .1-1.1l-.6-.3-1.4-.7c-.2-.1-.4-.1-.5.1l-.6.8c-.1.2-.3.2-.5.1-.3-.2-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.5l.4-.5c.1-.1.2-.3.3-.4v-.5z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.5h.01",
  linkedin:
    "M4 9v11M4 5v.01M9 20v-6a3 3 0 0 1 6 0v6M9 9v11M15 20v-7a5 5 0 0 1 5 5v2",
  arrowRight: "M4 12h15M13 6l6 6-6 6",
  arrowLeft: "M20 12H5M11 6l-6 6 6 6",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 6l6 6-6 6",
  chevronLeft: "M15 6l-6 6 6 6",
  check: "M4 12.5l5 5L20 6.5",
  close: "M6 6l12 12M18 6L6 18",
  menu: "M3 6h18M3 12h18M3 18h18",
  sliders: "M4 7h10M18 7h2M4 12h4M12 12h8M4 17h12M20 17h0M16 5v4M8 10v4M16 15v4",
  star: "M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5z",
  home: "M4 10.5 12 4l8 6.5V20H4v-9.5zM10 20v-6h4v6",
  building: "M4 21V6l7-3v18M11 21h9V9l-9-2M14 12h3M14 16h3",
  key: "M14.5 4a5.5 5.5 0 1 0-4.3 8.9L4 19v2h2v-2h2v-2h2l2.2-2.2A5.5 5.5 0 0 0 14.5 4zm1.2 4.3a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z",
  calculator:
    "M6 3h12v18H6zM9 7h6M9 11h1M12 11h1M15 11h1M9 15h1M12 15h1M15 15h1M9 18h1M12 18h4",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  play: "M8 5.5v13l11-6.5L8 5.5z",
  layers: "M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  pen: "M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3",
  calendar: "M4 6h16v15H4zM4 10h16M9 3v4M15 3v4",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
  quote:
    "M9 6C6.5 7.5 5 10 5 13v5h6v-6H8c0-2 .8-3.4 2.5-4.5L9 6zm9 0c-2.5 1.5-4 4-4 7v5h6v-6h-3c0-2 .8-3.4 2.5-4.5L18 6z",
  expand: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-4.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0-3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  folder: "M3 6h6l2 3h10v11H3z",
  download: "M12 4v11M8 11l4 4 4-4M4 20h16",
  eye: "M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6zm10 2.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z",
  camera:
    "M4 8h3l1.5-2h7L17 8h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
  bell: "M12 4a5 5 0 0 1 5 5v4l2 3H5l2-3V9a5 5 0 0 1 5-5zM10 19a2 2 0 0 0 4 0",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6",
  plus: "M12 5v14M5 12h14",
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}

export default Icon;
