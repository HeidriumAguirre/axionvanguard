import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-700 text-white hover:bg-navy-800 focus-visible:outline-navy-700",
  secondary:
    "border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white focus-visible:outline-navy-700",
  gold: "bg-gold-500 text-navy-900 hover:bg-gold-400 focus-visible:outline-gold-500",
  ghost:
    "text-navy-700 hover:bg-navy-100 focus-visible:outline-navy-700",
  light:
    "bg-white text-navy-800 hover:bg-paper focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-[0.9375rem]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconLeft?: IconName;
  full?: boolean;
  children: ReactNode;
  className?: string;
};

function classes({
  variant = "primary",
  size = "md",
  full,
  className = "",
}: Omit<CommonProps, "children">) {
  return [
    base,
    variants[variant],
    sizes[size],
    full ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant,
  size,
  icon,
  iconLeft,
  full,
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes({ variant, size, icon, iconLeft, full, className })} {...rest}>
      {iconLeft ? <Icon name={iconLeft} size={16} /> : null}
      {children}
      {icon ? <Icon name={icon} size={16} /> : null}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  icon,
  iconLeft,
  full,
  className,
  children,
  href,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      href={href}
      className={classes({ variant, size, icon, iconLeft, full, className })}
      {...rest}
    >
      {iconLeft ? <Icon name={iconLeft} size={16} /> : null}
      {children}
      {icon ? <Icon name={icon} size={16} /> : null}
    </Link>
  );
}

export default Button;
