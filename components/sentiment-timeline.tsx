import type { SentimentDot } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = {
  dots: SentimentDot[];
  /** When dimmed the line is light-green (used for non-focused rows) */
  dimmed?: boolean;
};

const TONES: Record<SentimentDot["tone"], string> = {
  purple: "bg-[#25d366]",
  magenta: "bg-[#128c7e]",
  "pink-light": "bg-[#86efac]",
  "purple-soft": "bg-[#34d399]",
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
          dimmed ? "bg-[#d4ead9]" : "bg-[#bce6c8]",
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
