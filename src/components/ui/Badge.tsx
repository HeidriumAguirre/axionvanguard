import type { ReactNode } from "react";

type Tone = "navy" | "gold" | "paper" | "green" | "dark" | "outline";

const tones: Record<Tone, string> = {
  navy: "bg-navy-700 text-white",
  gold: "bg-gold-500 text-navy-900",
  paper: "bg-paper text-navy-800 border border-line",
  green: "bg-emerald-700 text-white",
  dark: "bg-navy-900 text-white",
  outline: "border border-navy-300 text-navy-700",
};

export function Badge({
  children,
  tone = "navy",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
