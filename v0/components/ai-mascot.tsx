import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
  /** When true, the mascot floats with a soft halo behind it */
  haloed?: boolean;
};

/**
 * Friendly AI robot mascot used throughout the product.
 * Pure SVG so it scales crisply at any size.
 */
export function AiMascot({ className, size = 44, haloed = false }: Props) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center",
        haloed &&
          "rounded-full bg-primary-soft p-2 shadow-[0_8px_24px_-6px_rgba(160,32,240,0.45)] ring-1 ring-primary/30",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antenna */}
        <line x1="32" y1="6" x2="32" y2="14" stroke="#a020f0" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="5" r="2.6" fill="#e91e9d" />
        {/* Head */}
        <rect x="10" y="14" width="44" height="36" rx="14" fill="#a020f0" />
        {/* Inner face plate */}
        <rect x="14" y="20" width="36" height="22" rx="9" fill="#3d0f5c" />
        {/* Eyes */}
        <circle cx="24" cy="31" r="3.4" fill="#ffffff" />
        <circle cx="40" cy="31" r="3.4" fill="#ffffff" />
        <circle cx="24" cy="31" r="1.4" fill="#a020f0" />
        <circle cx="40" cy="31" r="1.4" fill="#a020f0" />
        {/* Cheek blush */}
        <circle cx="17" cy="38" r="1.6" fill="#e91e9d" opacity="0.6" />
        <circle cx="47" cy="38" r="1.6" fill="#e91e9d" opacity="0.6" />
        {/* Ear nubs */}
        <rect x="6" y="26" width="5" height="10" rx="2" fill="#a020f0" />
        <rect x="53" y="26" width="5" height="10" rx="2" fill="#a020f0" />
      </svg>
    </span>
  );
}
