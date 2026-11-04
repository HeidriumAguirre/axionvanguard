import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-4 ${
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? (
          <p className="eyebrow mb-3 text-gold-600">{eyebrow}</p>
        ) : null}
        <h2 className="font-display text-3xl leading-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export default SectionHeading;
