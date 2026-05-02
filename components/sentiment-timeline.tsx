import type { SentimentDot } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = {
  dots: SentimentDot[];
  /** When dimmed the line is light-pink (used for non-focused rows) */
  dimmed?: boolean;
};

const TONES: Record<SentimentDot["tone"], string> = {
  purple: "bg-[#a020f0]",
  magenta: "bg-[#e91e9d]",
  "pink-light": "bg-[#f48fb1]",
  "purple-soft": "bg-[#c78bf2]",
};

export function SentimentTimeline({ dots, dimmed = false }: Props) {
  return (
    <div
      className="relative h-7 w-full"
      role="img"
      aria-label="Conversation sentiment timeline"
    >
      {/* baseline */}
      <div
        className={cn(
          "absolute left-0 right-0 top-1/2 h-px -translate-y-1/2",
          dimmed ? "bg-[#f3d6e6]" : "bg-[#e9d5f3]",
        )}
      />
      {dots.map((dot, i) => (
        <span
          key={i}
          className={cn(
            "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
            TONES[dot.tone],
            dimmed && "opacity-40",
          )}
          style={{
            left: `${dot.x * 100}%`,
            width: dot.size,
            height: dot.size,
          }}
        />
      ))}
    </div>
  );
}
