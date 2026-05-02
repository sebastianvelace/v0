"use client";

import { AlertTriangle } from "lucide-react";
import type { Deal } from "@/lib/data";
import { DEALS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AiTooltip } from "./ai-tooltip";
import { SentimentTimeline } from "./sentiment-timeline";

type Props = {
  selectedId: string | null;
  onSelect: (deal: Deal) => void;
  /** When true a deal row appears focused with the AI tooltip overlay */
  focusFirst?: boolean;
};

const TEAM_TONES: Record<Deal["team"][number]["tone"], string> = {
  blue: "bg-[#3b82f6] text-white",
  "blue-dark": "bg-[#2563eb] text-white",
  sky: "bg-[#7dd3fc] text-[#0c4a6e]",
  muted: "bg-[#e2e8f0] text-[#475569]",
};

export function DealsList({ selectedId, onSelect, focusFirst = true }: Props) {
  return (
    <div className="relative px-8 pb-12">
      {/* Header row */}
      <div className="grid grid-cols-[minmax(0,1.4fr)_72px_72px_minmax(0,2fr)_minmax(0,2fr)] items-center gap-6 border-b border-border px-4 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Account</span>
        <span className="text-center">Unread</span>
        <span className="text-center">Risk</span>
        <span>Sentiment timeline</span>
        <span className="text-right">Team</span>
      </div>

      <ul className="divide-y divide-border">
        {DEALS.map((deal, idx) => {
          const isSelected = selectedId === deal.id;
          const isFocused = focusFirst && idx === 0;
          const isDimmed = focusFirst && idx > 0 && !isSelected;
          return (
            <li key={deal.id} className="relative">
              <button
                type="button"
                onClick={() => onSelect(deal)}
                className={cn(
                  "grid w-full grid-cols-[minmax(0,1.4fr)_72px_72px_minmax(0,2fr)_minmax(0,2fr)] items-center gap-6 rounded-2xl px-4 py-5 text-left transition",
                  isFocused &&
                    "relative z-10 ring-2 ring-primary ring-offset-2 ring-offset-background",
                  isSelected &&
                    !isFocused &&
                    "bg-primary-soft/60 ring-1 ring-primary/40",
                  !isSelected && !isFocused && "hover:bg-muted",
                  isDimmed && "opacity-50",
                )}
              >
                {/* Account */}
                <div>
                  <div className="text-base font-semibold text-foreground">
                    {deal.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {deal.subtitle}
                  </div>
                </div>

                {/* Unread badge */}
                <div className="flex justify-center">
                  {deal.unread > 0 ? (
                    <span className="inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded-md bg-accent-soft px-2 text-sm font-semibold text-accent">
                      {deal.unread}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </div>

                {/* Warning badge */}
                <div className="flex justify-center">
                  {deal.warnings > 0 ? (
                    <span className="inline-flex h-7 min-w-[2.5rem] items-center justify-center gap-1 rounded-md bg-[#fef3c7] px-2 text-sm font-semibold text-[#92400e]">
                      <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />
                      {deal.warnings}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </div>

                {/* Sentiment timeline */}
                <SentimentTimeline dots={deal.sentiment} dimmed={isDimmed} />

                {/* Team avatars */}
                <div className="flex justify-end gap-1.5">
                  {deal.team.map((member, i) => (
                    <span
                      key={i}
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold ring-2 ring-background",
                        TEAM_TONES[member.tone],
                        isDimmed && "opacity-50",
                      )}
                      aria-hidden
                    >
                      {member.initial}
                    </span>
                  ))}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* AI tooltip overlay */}
      {focusFirst && DEALS[0]?.aiNote ? (
        <AiTooltip message={DEALS[0].aiNote} />
      ) : null}
    </div>
  );
}
