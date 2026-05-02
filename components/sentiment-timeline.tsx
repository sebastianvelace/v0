"use client";

import { useState } from "react";
import type { SentimentDot } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = {
  dots: SentimentDot[];
  /** When dimmed the line is light-green (used for non-focused rows) */
  dimmed?: boolean;
  /** Disable interactivity (hover tooltips). Useful for read-only contexts. */
  interactive?: boolean;
};

const TONES: Record<SentimentDot["tone"], string> = {
  purple: "bg-[#25d366]",
  magenta: "bg-[#128c7e]",
  "pink-light": "bg-[#86efac]",
  "purple-soft": "bg-[#34d399]",
};

const TONE_LABELS: Record<SentimentDot["tone"], string> = {
  purple: "Positive",
  magenta: "Negative",
  "pink-light": "Neutral",
  "purple-soft": "Slightly positive",
};

export function SentimentTimeline({ dots, dimmed = false, interactive = true }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

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
      {dots.map((dot, i) => {
        const isHovered = hovered === i;
        const dotEl = (
          <span
            className={cn(
              "block rounded-full transition",
              TONES[dot.tone],
              dimmed && "opacity-40",
              isHovered && "scale-125 ring-2 ring-primary ring-offset-2 ring-offset-background",
            )}
            style={{ width: dot.size, height: dot.size }}
            aria-hidden
          />
        );
        return (
          <div
            key={i}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${dot.x * 100}%` }}
          >
            {interactive ? (
              <button
                type="button"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                onClick={(e) => e.stopPropagation()}
                aria-label={`${dot.label} on ${dot.date} \u2014 ${TONE_LABELS[dot.tone]}`}
                className="flex items-center justify-center rounded-full p-1 -m-1 focus:outline-none"
              >
                {dotEl}
              </button>
            ) : (
              dotEl
            )}
            {isHovered ? (
              <div
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-[11px] font-medium text-background shadow-lg"
              >
                <div className="font-semibold">{dot.label}</div>
                <div className="text-[10px] opacity-80">
                  {`${dot.date} \u00b7 ${TONE_LABELS[dot.tone]}`}
                </div>
                <span
                  className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-foreground"
                  aria-hidden
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
