import { Workflow } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const iconClass = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const id = `logo-grad-${size}`;

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <Workflow className={iconClass} style={{ stroke: `url(#${id})` }} />
    </>
  );
}
